import React, { useState, useMemo, useCallback } from 'react';
import {
  DataTable,
  DataTableSkeleton,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Tag,
  Tile,
  OverflowMenu,
  OverflowMenuItem,
  Pagination,
} from '@carbon/react';
import { ChevronDown, Hospital, Checkmark, Launch } from '@carbon/react/icons';
import { type FhirBundle, type ShrCondition, type ShrObservation, type ShrMedicationRequest, type ShrServiceRequest } from '../types';
import {
  extractResourcesByType,
  formatShrDate,
  getStatusTagColor,
  getCodeableConceptDisplay,
  getCodeableConceptCode,
} from '../shr-fhir-utils';
import styles from './shr-summary.component.scss';

type ShrRendererProps = {
  shrBundle: FhirBundle;
};

type InvestigationTab = 'All' | 'Lab' | 'Radiology' | 'Procedures';

const INVESTIGATION_TABS: InvestigationTab[] = ['All', 'Lab', 'Radiology', 'Procedures'];
const VITALS_LOINC_CODES = ['8480-6', '8462-4', '8867-4', '9279-1', '2708-6', '39156-5'];

/* ────────────────────────────────────────────────────────── */
/*  Collapsible Section                                       */
/* ────────────────────────────────────────────────────────── */
interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  headerExtra?: React.ReactNode;
  onViewFhirJson?: () => void;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  children,
  defaultOpen = true,
  headerExtra,
  onViewFhirJson,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={styles.sectionPanel}>
      <div
        className={styles.sectionHeader}
        onClick={() => setIsOpen((prev) => !prev)}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
        }}
      >
        <ChevronDown
          size={16}
          className={`${styles.sectionChevron} ${isOpen ? styles.sectionChevronOpen : styles.sectionChevronClosed}`}
        />
        <span className={styles.sectionTitle}>{title}</span>
        {headerExtra}
        {onViewFhirJson && (
          <div
            className={styles.sectionOverflow}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            role="presentation"
          >
            <OverflowMenu size="sm" flipped>
              <OverflowMenuItem itemText="View Full FHIR JSON" onClick={onViewFhirJson} />
            </OverflowMenu>
          </div>
        )}
      </div>
      {isOpen && <div className={styles.sectionContent}>{children}</div>}
    </div>
  );
};

/* ────────────────────────────────────────────────────────── */
/*  Main SHR Summary Component                                */
/* ────────────────────────────────────────────────────────── */
const ShrRendererComponent: React.FC<ShrRendererProps> = ({ shrBundle }) => {
  const [activeInvestigationTab, setActiveInvestigationTab] = useState<InvestigationTab>('All');
  const [investigationPage, setInvestigationPage] = useState(1);
  const [investigationPageSize, setInvestigationPageSize] = useState(5);

  /* ── Extract resources from bundle ──────────────────── */
  const conditions = useMemo(() => extractResourcesByType<ShrCondition>(shrBundle, 'Condition'), [shrBundle]);
  const observations = useMemo(() => extractResourcesByType<ShrObservation>(shrBundle, 'Observation'), [shrBundle]);
  const medications = useMemo(() => extractResourcesByType<ShrMedicationRequest>(shrBundle, 'MedicationRequest'), [shrBundle]);
  const serviceRequests = useMemo(() => extractResourcesByType<ShrServiceRequest>(shrBundle, 'ServiceRequest'), [shrBundle]);

  /* ── Derive vitals vs lab observations ──────────────── */
  const vitals = useMemo(
    () => observations.filter((obs) => obs.code?.coding?.some((c) => VITALS_LOINC_CODES.includes(c.code ?? ''))),
    [observations],
  );

  const labResults = useMemo(
    () => observations.filter((obs) => !obs.code?.coding?.some((c) => VITALS_LOINC_CODES.includes(c.code ?? ''))),
    [observations],
  );

  /* ── Derive diagnosis categories ────────────────────── */
  const primaryDiagnosis = useMemo(
    () => conditions.find((c) => c.category?.some((cat) => cat.text?.toLowerCase() === 'primary')),
    [conditions],
  );

  const secondaryDiagnoses = useMemo(
    () => conditions.filter((c) => c.category?.some((cat) => cat.text?.toLowerCase() === 'secondary')),
    [conditions],
  );

  /* ── Derive encounter date for header ───────────────── */
  const encounterDate = useMemo(() => {
    if (!shrBundle?.entry) return undefined;
    const enc = shrBundle.entry.find((e) => e.resource.resourceType === 'Encounter');
    if (enc?.resource?.resourceType === 'Encounter') {
      return (enc.resource as any)?.period?.start;
    }
    return shrBundle.timestamp;
  }, [shrBundle]);

  /* ── Patient NUPI identifier ────────────────────────── */
  const patientEntry = useMemo(() => {
    if (!shrBundle?.entry) return undefined;
    return shrBundle.entry.find((e) => e.resource.resourceType === 'Patient');
  }, [shrBundle]);

  const nupi = useMemo(() => {
    if (!patientEntry || patientEntry.resource.resourceType !== 'Patient') return 'N/A';
    const patient = patientEntry.resource as any;
    const nupiId = patient.identifier?.find((id: any) =>
      id.type?.coding?.some((c: any) => c.code === 'NUPI'),
    );
    return nupiId?.value ?? 'N/A';
  }, [patientEntry]);

  /* ── Helper: get vitals display ─────────────────────── */
  const getVitalValue = useCallback(
    (loincCode: string): string => {
      const obs = vitals.find((o) => o.code?.coding?.some((c) => c.code === loincCode));
      return obs?.valueCodeableConcept?.text ?? '—';
    },
    [vitals],
  );

  /* ── Investigations data ────────────────────────────── */
  const investigationRows = useMemo(() => {
    let results: { id: string; type: string; testName: string; result: string; date: string }[] = [];

    // Lab results from observations
    labResults.forEach((obs) => {
      results.push({
        id: obs.id,
        type: 'Lab',
        testName: getCodeableConceptDisplay(obs.code),
        result: obs.valueCodeableConcept?.text ?? '—',
        date: formatShrDate(encounterDate),
      });
    });

    // Filter by tab
    if (activeInvestigationTab !== 'All') {
      results = results.filter((r) => r.type === activeInvestigationTab);
    }

    return results;
  }, [labResults, activeInvestigationTab, encounterDate]);

  // Paginated investigation rows
  const paginatedInvestigations = useMemo(() => {
    const start = (investigationPage - 1) * investigationPageSize;
    return investigationRows.slice(start, start + investigationPageSize);
  }, [investigationRows, investigationPage, investigationPageSize]);

  /* ── Empty bundle guard ─────────────────────────────── */
  if (!shrBundle || !shrBundle.entry?.length) {
    return (
      <Tile className={styles.emptyState}>
        <Hospital size={48} />
        <p className={styles.emptyStateText}>No SHR records found for this patient.</p>
      </Tile>
    );
  }

  const handleViewFhirJson = () => {
    const jsonStr = JSON.stringify(shrBundle, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  const bpSystolic = getVitalValue('8480-6');
  const bpDiastolic = getVitalValue('8462-4');
  const heartRate = getVitalValue('8867-4');
  const respiratoryRate = getVitalValue('9279-1');
  const spo2 = getVitalValue('2708-6');
  const bmi = getVitalValue('39156-5');

  return (
    <div className={styles.shrSummaryContainer}>
      {/* ── Header Card ───────────────────────────────────── */}
      <div className={styles.headerCard}>
        <div className={styles.headerTitle}>
          <h3 className={styles.headerTitleText}>SHR (Super Highway Record)</h3>
          <span className={styles.statusBadge}>
            Status: <Tag type={getStatusTagColor('synced')} size="sm">Synced</Tag>
            <Checkmark size={16} className={styles.statusIcon} />
          </span>
        </div>
        <div className={styles.headerMeta}>
          <div className={styles.headerMetaItem}>
            <span className={styles.headerMetaLabel}>Date Pulled:</span>
            <span className={styles.headerMetaValue}>{formatShrDate(encounterDate)}</span>
          </div>
          <div className={styles.headerMetaItem}>
            <span className={styles.headerMetaLabel}>NUPI:</span>
            <span className={styles.headerMetaValue}>{nupi}</span>
          </div>
          <div className={styles.headerMetaItem}>
            <span className={styles.headerMetaLabel}>Facility MFL Code:</span>
            <span className={styles.headerMetaValue}>12345</span>
          </div>
          <div className={styles.headerMetaItem}>
            <span className={styles.headerMetaLabel}>Provider ID:</span>
            <span className={styles.headerMetaValue}>PRV-001</span>
          </div>
          <div className={styles.headerMetaItem}>
            <span className={styles.headerMetaLabel}>Status:</span>
            <span className={styles.statusLink}>
              Synced <Launch size={12} />
            </span>
          </div>
        </div>
      </div>

      {/* ── Diagnosis Section ─────────────────────────────── */}
      <CollapsibleSection title="Diagnosis" onViewFhirJson={handleViewFhirJson}>
        {conditions.length === 0 ? (
          <p className={styles.emptyStateText}>No diagnoses found.</p>
        ) : (
          <>
            <div className={styles.diagnosisGrid}>
              <div className={styles.diagnosisColumn}>
                <span className={styles.diagnosisLabel}>Primary Diagnosis:</span>
                <span className={styles.diagnosisValue}>
                  {primaryDiagnosis
                    ? `${getCodeableConceptCode(primaryDiagnosis.code)} – ${getCodeableConceptDisplay(primaryDiagnosis.code)}`
                    : '—'}
                </span>
              </div>
              <div className={styles.diagnosisColumn}>
                <span className={styles.diagnosisLabel}>Secondary Diagnosis:</span>
                {secondaryDiagnoses.length > 0 ? (
                  secondaryDiagnoses.map((dx) => (
                    <span key={dx.id} className={styles.diagnosisValue}>
                      - {getCodeableConceptCode(dx.code)} – {getCodeableConceptDisplay(dx.code)}
                    </span>
                  ))
                ) : (
                  <span className={styles.diagnosisValue}>—</span>
                )}
              </div>
            </div>
            <div className={styles.diagnosisDate}>
              <strong>Diagnosis Date: </strong>
              {formatShrDate(primaryDiagnosis?.recordedDate ?? conditions[0]?.recordedDate)}
            </div>
          </>
        )}
      </CollapsibleSection>

      {/* ── Vitals Section ────────────────────────────────── */}
      <CollapsibleSection title="Vitals" onViewFhirJson={handleViewFhirJson}>
        {vitals.length === 0 ? (
          <p className={styles.emptyStateText}>No vitals recorded.</p>
        ) : (
          <>
            <div className={styles.vitalsGrid}>
              <div className={styles.vitalItem}>
                <span className={styles.vitalLabel}>BP</span>
                <span className={styles.vitalValue}>
                  {bpSystolic} / {bpDiastolic} mmHg
                </span>
              </div>
              <span className={styles.vitalSeparator} />
              <div className={styles.vitalItem}>
                <span className={styles.vitalValue}>{heartRate}</span>
                <span className={styles.vitalUnit}>rate/min</span>
              </div>
              <span className={styles.vitalSeparator} />
              <div className={styles.vitalItem}>
                <span className={styles.vitalValue}>{respiratoryRate}</span>
                <span className={styles.vitalUnit}>Breaths per minute</span>
              </div>
              <div className={styles.vitalItem}>
                <span className={styles.vitalLabel}>
                  SPO<sub>2</sub>
                </span>
                <span className={styles.vitalValue}>{spo2} %</span>
              </div>
              <span className={styles.vitalSeparator} />
              <div className={styles.vitalItem}>
                <span className={styles.vitalValue}>{bmi}</span>
                <span className={styles.vitalUnit}>
                  kg / m<sup>2</sup>
                </span>
              </div>
            </div>
            <div className={styles.vitalsDate}>
              <strong>Date Recorded: </strong> {formatShrDate(encounterDate)}
            </div>
          </>
        )}
      </CollapsibleSection>

      {/* ── Two-Column Row: Investigations + Care Plan ────── */}
      <div className={styles.twoColumnRow}>
        {/* Investigations Done */}
        <CollapsibleSection
          title="Investigations Done"
          headerExtra={
            <div className={styles.investigationTabs} onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()} role="presentation">
              {INVESTIGATION_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`${styles.investigationTab} ${activeInvestigationTab === tab ? styles.investigationTabActive : ''}`}
                  onClick={() => {
                    setActiveInvestigationTab(tab);
                    setInvestigationPage(1);
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          }
          onViewFhirJson={handleViewFhirJson}
        >
          {investigationRows.length === 0 ? (
            <p className={styles.emptyStateText}>No investigation results found.</p>
          ) : (
            <div className={styles.shrDataTable}>
              <DataTable
                rows={paginatedInvestigations}
                headers={[
                  { key: 'type', header: 'Type' },
                  { key: 'testName', header: 'Test Name' },
                  { key: 'result', header: 'Result' },
                  { key: 'date', header: 'Date' },
                ]}
              >
                {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
                  <Table {...getTableProps()} size="sm">
                    <TableHead>
                      <TableRow>
                        {headers.map((header) => (
                          <TableHeader key={header.key} {...getHeaderProps({ header })}>
                            {header.header}
                          </TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.id} {...getRowProps({ row })}>
                          {row.cells.map((cell) => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </DataTable>
              {investigationRows.length > investigationPageSize && (
                <Pagination
                  totalItems={investigationRows.length}
                  pageSize={investigationPageSize}
                  pageSizes={[5, 10, 20]}
                  page={investigationPage}
                  onChange={({ page, pageSize }: { page: number; pageSize: number }) => {
                    setInvestigationPage(page);
                    setInvestigationPageSize(pageSize);
                  }}
                  size="sm"
                />
              )}
            </div>
          )}
        </CollapsibleSection>

        {/* Care Plan */}
        <CollapsibleSection title="Care Plan" onViewFhirJson={handleViewFhirJson}>
          {medications.length === 0 ? (
            <p className={styles.emptyStateText}>No care plan information found.</p>
          ) : (
            <div className={styles.carePlanContent}>
              <div className={styles.carePlanItem}>
                <strong>Medications:</strong>
                <ul className={styles.medicationList}>
                  {medications.map((med) => (
                    <li key={med.id}>
                      {getCodeableConceptDisplay(med.medicationCodeableConcept)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.carePlanItem}>
                <strong>Duration: </strong>
                {medications[0]?.dosageInstruction?.[0]?.timing?.repeat?.duration ?? '—'}{' '}
                {medications[0]?.dosageInstruction?.[0]?.timing?.repeat?.durationUnit === 'd' ? 'Days' : medications[0]?.dosageInstruction?.[0]?.timing?.repeat?.durationUnit ?? ''}
              </div>
              <div className={styles.carePlanItem}>
                <strong>Instructions: </strong>
                {medications[0]?.note?.[0]?.text ?? '—'}
              </div>
            </div>
          )}
        </CollapsibleSection>
      </div>

      {/* ── Referrals Section ─────────────────────────────── */}
      <CollapsibleSection title="Referrals" onViewFhirJson={handleViewFhirJson}>
        {serviceRequests.length === 0 ? (
          <p className={styles.emptyStateText}>No referrals found.</p>
        ) : (
          <div className={styles.shrDataTable}>
            <DataTable
              rows={serviceRequests.map((sr) => ({
                id: sr.id,
                icon: '',
                specialty: sr.reasonCode?.[0]?.text ?? getCodeableConceptDisplay(sr.reasonCode?.[0]),
                facility: sr.performer?.[0]?.display ?? '—',
                date: formatShrDate(sr.authoredOn),
              }))}
              headers={[
                { key: 'icon', header: '' },
                { key: 'specialty', header: '' },
                { key: 'facility', header: 'Facility' },
                { key: 'date', header: 'Date' },
              ]}
            >
              {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
                <Table {...getTableProps()} size="sm">
                  <TableHead>
                    <TableRow>
                      {headers.map((header) => (
                        <TableHeader key={header.key} {...getHeaderProps({ header })}>
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id} {...getRowProps({ row })}>
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>
                            {cell.info.header === 'icon' ? (
                              <span className={styles.referralIcon}>
                                <Hospital size={16} />
                              </span>
                            ) : (
                              cell.value
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </DataTable>
          </div>
        )}
      </CollapsibleSection>

      {/* ── Return to Clinic Section ──────────────────────── */}
      <CollapsibleSection title="Return to Clinic" defaultOpen={false} onViewFhirJson={handleViewFhirJson}>
        <p className={styles.emptyStateText}>No return to clinic information available.</p>
      </CollapsibleSection>
    </div>
  );
};

export default ShrRendererComponent;
