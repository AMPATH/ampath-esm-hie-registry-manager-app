import React, { useEffect, useState, useCallback } from 'react';
import ShrRendererComponent from './shr-renderer/shr-renderer.component';
import { mockShrBundle } from './mock-shr-bundle';
import { type FhirBundle } from './types';
import { getPatientCrIdentifier, getPatientShrSummaryWithParams } from './shr-resource';
import { showSnackbar, useSession } from '@openmrs/esm-framework';
import HieOtpVerificationModal from '../../modal/otp-verification/hie-otp-verification-modal';
import { Button, InlineNotification } from '@carbon/react';
import { Renew } from '@carbon/react/icons';
import styles from './shr-details.component.scss';

type ShrDetailsProps = {
  patientUuid: string;
};

const ShrDetails: React.FC<ShrDetailsProps> = ({ patientUuid }) => {
  const [shrBundle, setShrBundle] = useState<FhirBundle | null>(null);
  const [showHieModal, setShowHieModal] = useState<boolean>(false);
  const [otpVerified, setOtpVerified] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [crId, setCrId] = useState<string | null>(null);
  const session = useSession();

  const fetchShrSummary = useCallback(
    async (crNo: string, offset = 0, count = 10) => {
      const userLoggedInLocationUuid = session?.sessionLocation?.uuid;
      if (!userLoggedInLocationUuid) return;
      setIsLoading(true);
      try {
        const data = await getPatientShrSummaryWithParams({
          crId: crNo,
          locationUuid: userLoggedInLocationUuid,
          offset,
          count,
        });
        if (data && data.entry && data.entry.length > 0) {
          setShrBundle(data);
        } else {
          // Use mock data as fallback to populate the UI initially for testing if no real data
          setShrBundle(mockShrBundle); // Ensure mockShrBundle is imported implicitly if we intend to keep this fallback, but given the user prompt: "Mock Data: Use dummy FHIR data for now to demonstrate the "Shared Health Record" view."
        }
      } catch (e) {
        showSnackbar({
          title: e.error ?? 'Error fetching Shared Health Record details',
          subtitle:
            e.details ?? 'An error occurred while fetching the facility details, please try again or contact support',
          kind: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    },
    [session],
  );

  useEffect(() => {
    async function fetchCrIdentifier(uuid: string) {
      const crIdentifier = await getPatientCrIdentifier(uuid);
      if (crIdentifier) {
        setCrId(crIdentifier.identifier);
        // Do NOT fetch summary on mount automatically. Wait for consent.
      }
    }

    if (patientUuid) {
      fetchCrIdentifier(patientUuid);
    }
  }, [patientUuid]);

  // Trigger fetch when OTP is verified
  useEffect(() => {
    if (otpVerified && crId) {
      fetchShrSummary(crId);
    }
  }, [otpVerified, crId, fetchShrSummary]);

  if (!patientUuid) {
    return <>No patient selected</>;
  }

  const onModalClose = (closeDto: { otpValidated: boolean }) => {
    setShowHieModal(false);
    if (closeDto.otpValidated) {
      setOtpVerified(true);
    }
  };

  const showOtpVerificationModal = () => {
    setShowHieModal(true);
  };

  const handleRefreshFromShr = () => {
    if (crId) {
      fetchShrSummary(crId);
    }
  };

  if (!otpVerified) {
    return (
      <>
        <div className={styles.shrDetailsLayout}>
          <InlineNotification
            kind="warning"
            title="Client consent is required to retrieve"
            subtitle="Shared Health Record data."
            lowContrast
            hideCloseButton={false}
            className={styles.consentNotification}
          />
          <div className={styles.consentActions}>
            <HieOtpVerificationModal showModal={showHieModal} onRequestClose={onModalClose} />
            <Button onClick={showOtpVerificationModal} size="md">
              Get Client Consent
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className={styles.shrDetailsLayout}>
      <div className={styles.consentActions}>
        <Button
          kind="ghost"
          size="sm"
          renderIcon={Renew}
          onClick={handleRefreshFromShr}
          className={styles.refreshButton}
          disabled={isLoading}
        >
          Refresh from Shared Health Record
        </Button>
      </div>
      {isLoading && !shrBundle ? (
        <p>Loading Shared Health Record data...</p>
      ) : !shrBundle ? (
        <h4>No Shared Health Record Data</h4>
      ) : (
        <ShrRendererComponent
          shrBundle={shrBundle}
          isLoading={isLoading}
          onFetchPage={(offset, count) => {
            if (crId) {
              fetchShrSummary(crId, offset, count);
            }
          }}
        />
      )}
    </div>
  );
};

export default ShrDetails;
