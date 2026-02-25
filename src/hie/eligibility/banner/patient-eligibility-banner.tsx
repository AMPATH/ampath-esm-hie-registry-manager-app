import React, { useEffect, useMemo, useState } from 'react';
import styles from './patient-eligibility-banner.scss';
import { Tag } from '@carbon/react';
import { usePatient, useSession } from '@openmrs/esm-framework';
import { type HieClientEligibility, type EligibilityFilterDto } from '../../../types';
import { getClientEligibityStatus } from '../../hie-resource';
import { getTagType } from '../../../shared/utils/get-tag-type';
interface PatientEligibilityBannerProps {}
const PatientEligibilityBanner: React.FC<PatientEligibilityBannerProps> = () => {
  const { isLoading, patient, patientUuid, error } = usePatient();
  const session = useSession();
  const crId = useMemo(() => getPatientIdentifierByName('CR'), [patient]);
  const nationalId = useMemo(() => getPatientIdentifierByName('National'), [patient]);
  const locationUuid = session.sessionLocation.uuid;
  const [clientEligibility, setClientEligibility] = useState<HieClientEligibility>();
  useEffect(() => {
    getPatientEligibilityStatus();
  }, [patient]);
  if (!patient || !locationUuid) {
    return <></>;
  }

  function getPatientIdentifierByName(identifierName: string) {
    if (!patient || !patient.identifier) {
      return null;
    }
    return patient.identifier.find((id) => {
      return id.type.text.trim().toLowerCase().includes(identifierName.trim().toLowerCase());
    });
  }

  function generatePatientEligibilityPayload(): EligibilityFilterDto {
    const payload: EligibilityFilterDto = {
      requestIdNumber: '',
      requestIdType: '',
      locationUuid: locationUuid,
    };
    if (crId) {
      payload.requestIdNumber = crId.value;
      payload.requestIdType = '3';
    } else if (nationalId) {
      payload.requestIdNumber = nationalId.value;
      payload.requestIdType = '2';
    }

    return payload;
  }

  async function getPatientEligibilityStatus() {
    const payload = generatePatientEligibilityPayload();
    if (!isValidEligibilityPayload(payload)) {
      return;
    }
    const resp = await getClientEligibityStatus(payload);
    setClientEligibility(resp);
  }

  function isValidEligibilityPayload(eligibilityFilterDto: EligibilityFilterDto): boolean {
    if (!eligibilityFilterDto.locationUuid) {
      return false;
    }
    if (!eligibilityFilterDto.requestIdNumber) {
      return false;
    }
    if (!eligibilityFilterDto.requestIdType) {
      return false;
    }

    return true;
  }

  return (
    <>
      <div className={styles.eligibilityBannerLayout}>
        {clientEligibility ? (
          <>
            {clientEligibility.schemes && clientEligibility.schemes.length > 0 ? (
              <>
                {clientEligibility.schemes.map((s) => {
                  return (
                    <div>
                      <Tag className="some-class" size="md" title="Status" type={getTagType(s.coverage.status)}>
                        {s.schemeName} : {s.coverage.status === '1' ? 'Active' : 'Not Active'}
                      </Tag>
                    </div>
                  );
                })}
              </>
            ) : (
              <div>
                <Tag className="some-class" size="md" title="Status" type="gray">
                  No Insurance schemes found
                </Tag>
              </div>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default PatientEligibilityBanner;
