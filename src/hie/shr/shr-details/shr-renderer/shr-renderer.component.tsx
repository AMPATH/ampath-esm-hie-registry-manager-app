import React from 'react';
import { type BundleEntry, type FhirBundle } from '../types';
import { Accordion, AccordionItem } from '@carbon/react';
import ShrPatientComponent from '../shr-patient/shr-patient.component';
import ShrServiceRequestComponent from '../shr-service-request/shr-service-request.component';
import ShrConditionComponent from '../shr-condition/shr-condition.component';
import ShrEncounterComponent from '../shr-encounter/shr-encounter.component';
import ShrMedicationRequestDetailsComponent from '../shr-medication-request/shr-medication-request-details.component';

type ShrRendererProps = {
  shrBundle: FhirBundle;
};

const ShrRendererComponent: React.FC<ShrRendererProps> = ({ shrBundle }) => {
  if (!shrBundle) {
    return (
      <>
        <h4>No SHR Bundle Data</h4>
      </>
    );
  }
  const getEntryTitle = (entry: BundleEntry) => {
    let suffix = '';
    switch (entry.resource.resourceType) {
      case 'Patient':
        suffix = `${entry?.resource?.meta?.lastUpdated}`;
        break;
      case 'ServiceRequest':
        suffix = `${entry?.resource?.authoredOn || entry?.resource?.occurrenceDateTime}`;
        break;
      case 'Condition':
        suffix = `${entry?.resource?.recordedDate}`;
        break;
      case 'Encounter':
        suffix = `${entry?.resource?.period.start}`;
        break;
      case 'MedicationRequest':
        suffix = `${entry?.resource?.authoredOn}`;
        break;
      default:
        suffix = 'N/A';
    }
    const title = `${suffix}  - ${entry.resource.resourceType}`;
    return title;
  };
  const getResourceComponent = (entry: BundleEntry) => {
    let resourceComponent = <></>;
    switch (entry.resource.resourceType) {
      case 'Patient':
        resourceComponent = <ShrPatientComponent shrPatient={entry.resource} />;
        break;
      case 'ServiceRequest':
        resourceComponent = <ShrServiceRequestComponent shrServiceRequest={entry.resource} />;
        break;
      case 'Condition':
        resourceComponent = <ShrConditionComponent shrCondition={entry.resource} />;
        break;
      case 'Encounter':
        resourceComponent = <ShrEncounterComponent shrEncounter={entry.resource} />;
        break;
      case 'MedicationRequest':
        resourceComponent = <ShrMedicationRequestDetailsComponent shrMedicationRequest={entry.resource} />;
        break;
      default:
        resourceComponent = <></>;
    }
    return resourceComponent;
  };
  return (
    <>
      <Accordion>
        {shrBundle.entry.map((entry) => {
          return (
            <>
              <AccordionItem title={getEntryTitle(entry)}>{getResourceComponent(entry)}</AccordionItem>
            </>
          );
        })}
      </Accordion>
    </>
  );
};

export default ShrRendererComponent;
