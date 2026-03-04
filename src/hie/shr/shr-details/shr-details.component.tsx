import React, { useEffect, useState, useCallback } from 'react';
import ShrRendererComponent from './shr-renderer/shr-renderer.component';
import { mockShrBundle } from './mock-shr-bundle';
import { type FhirBundle } from './types';
import { getPatientCrIdentifier, getPatientShrSummary } from './shr-resource';
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
  const [otpVerified, setOtpVerified] = useState<boolean>(true); // Bypassed for testing
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [crId, setCrId] = useState<string | null>(null);
  const session = useSession();

  const fetchShrSummary = useCallback(
    async (crNo: string) => {
      const userLoggedInLocationUuid = session?.sessionLocation?.uuid;
      if (!userLoggedInLocationUuid) return;
      setIsLoading(true);
      try {
        // BYPASS: Instantly load mock data for styling/testing
        setShrBundle(mockShrBundle);
        /*
        const data = await getPatientShrSummary(crNo, userLoggedInLocationUuid);
        if (data && data.entry && data.entry.length > 0) {
          setShrBundle(data);
        } else {
          setShrBundle(mockShrBundle);
        }
        */
      } catch (e) {
        showSnackbar({
          title: e.error ?? 'Error fetching SHR details',
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
        await fetchShrSummary(crIdentifier.identifier);
      }
    }

    if (patientUuid) {
      fetchCrIdentifier(patientUuid);
    }
  }, [patientUuid, fetchShrSummary]);

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
            subtitle="SHR data."
            lowContrast
            hideCloseButton={false}
            className={styles.consentNotification}
          />
          <div className={styles.consentActions}>
            <HieOtpVerificationModal showModal={showHieModal} onRequestClose={onModalClose} />
            <Button onClick={showOtpVerificationModal} size="md">
              Get Client Consent
            </Button>
            <Button kind="secondary" size="md">
              View Consent History
            </Button>
            <Button
              kind="ghost"
              size="md"
              renderIcon={Renew}
              onClick={handleRefreshFromShr}
              className={styles.refreshButton}
            >
              Refresh from SHR
            </Button>
          </div>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.shrDetailsLayout}>
        <p>Loading SHR data...</p>
      </div>
    );
  }

  if (!shrBundle) {
    return <h4>No SHR Data</h4>;
  }

  return (
    <>
      <div className={styles.shrDetailsLayout}>
        <div className={styles.consentActions}>
          <Button
            kind="ghost"
            size="sm"
            renderIcon={Renew}
            onClick={handleRefreshFromShr}
            className={styles.refreshButton}
          >
            Refresh from SHR
          </Button>
        </div>
        <ShrRendererComponent shrBundle={shrBundle} />
      </div>
    </>
  );
};

export default ShrDetails;
