import React, { useEffect, useState } from 'react';
import ShrRendererComponent from './shr-renderer/shr-renderer.component';
import { type FhirBundle } from './types';
import { getPatientCrIdentifier, getPatientShrSummary } from './shr-resource';
import { showSnackbar, useLeftNav, useSession } from '@openmrs/esm-framework';
import HieOtpVerificationModal from '../../modal/otp-verification/hie-otp-verification-modal';
import { Button } from '@carbon/react';
import styles from './shr-details.component.scss';

type ShrDetailsProps = {
  patientUuid: string;
};

const ShrDetails: React.FC<ShrDetailsProps> = ({ patientUuid }) => {
  const [shrBundle, setShrBundle] = useState<FhirBundle | null>(null);
  const [showHieModal, setShowHieModal] = useState<boolean>(false);
  const [otpVerified, setOtpVerified] = useState<boolean>(false);
  const session = useSession();

  useEffect(() => {
    async function fetchCrIdentifier(uuid: string) {
      const crId = await getPatientCrIdentifier(uuid);
      if (crId) {
        await fetchShrSummary(crId.identifier);
      }
    }

    async function fetchShrSummary(crNo: string) {
      const userLoggedInLocationUuid = session?.sessionLocation?.uuid;
      if (!userLoggedInLocationUuid) return;
      try {
        const data = await getPatientShrSummary(crNo, userLoggedInLocationUuid);
        if (data) setShrBundle(data);
      } catch (e) {
        showSnackbar({
          title: e.error ?? 'Error fetching SHR details',
          subtitle:
            e.details ?? 'An error occurred while fetching the facility details, please try again or contact support',
          kind: 'error',
        });
      }
    }

    if (patientUuid) {
      fetchCrIdentifier(patientUuid);
    }
  }, [patientUuid, session]);

  if (!patientUuid) {
    return <>No patient selected</>;
  }

  if (!shrBundle) {
    return <h4>No SHR Data</h4>;
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

  if (!otpVerified) {
    return (
      <>
        <div className={styles.shrDetailsLayout}>
          <HieOtpVerificationModal showModal={showHieModal} onRequestClose={onModalClose} />
          <Button onClick={showOtpVerificationModal}>Get Client Consent</Button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.shrDetailsLayout}>
        <ShrRendererComponent shrBundle={shrBundle} />
      </div>
    </>
  );
};

export default ShrDetails;
