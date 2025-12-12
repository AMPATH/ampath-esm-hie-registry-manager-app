import { Button, Modal, Select, SelectItem, TextInput } from '@carbon/react';
import React, { useState } from 'react';
import { requestCustomOtp, validateCustomOtp } from './hie-verification.resource';
import { useSession, showSnackbar } from '@openmrs/esm-framework';
import styles from './hie-oto-verification-modal.scss';
import {
  HieClientVerificationIdentifierType,
  type ValidateHieCustomOtpDto,
  type RequestCustomOtpDto,
} from '../../../types';

type HieOtpVerificationModalProps = {
  showModal: boolean;
  onRequestClose: (closeDto: { otpValidated: boolean }) => void;
};

const HieOtpVerificationModal: React.FC<HieOtpVerificationModalProps> = ({ showModal, onRequestClose }) => {
  const [identificationType, setIdentificationType] = useState();
  const [identificationValue, setIdentificationValue] = useState();
  const [maskedPhoneNo, setMaskedPhoneNo] = useState<string>();
  const [sessionId, setSessionId] = useState<string>();
  const [otpValidated, setOtpValidated] = useState<boolean>();
  const [otp, setOtp] = useState<number>();
  const session = useSession();
  const hieClientVerificationIdentifierTypes = Object.keys(HieClientVerificationIdentifierType).map((key) => {
    return {
      label: HieClientVerificationIdentifierType[key],
      value: HieClientVerificationIdentifierType[key],
    };
  });

  const handleIdentifierTypeChange = (event) => {
    const value = event.target.value;
    setIdentificationType(value);
  };
  const handleIdentificationValueChange = (event) => {
    setIdentificationValue(event.target.value);
  };
  const sendCustomOtp = async () => {
    const otpPayload = generateCustomOtpPayload();
    if (!isValidCustomOtpPayload(otpPayload)) {
      return false;
    }
    const resp = await requestCustomOtp(otpPayload);
    if (resp['error']) {
      showSnackbar({
        title: resp['error'].error ?? 'OTP Sending Failed',
        subtitle: resp['details'] ?? 'An error occurred while sending the OTP, please try again or contact support',
        kind: 'error',
      });
    } else if (resp.maskedPhone) {
      showSnackbar({
        title: 'OTP Successfully sent',
        subtitle: `OTP Sent to the phone number ${resp.maskedPhone}`,
        kind: 'success',
      });
      setMaskedPhoneNo(resp.maskedPhone);
      setSessionId(resp.sessionId);
      setOtpValidated(true);
    }
  };
  function generateCustomOtpPayload(): RequestCustomOtpDto {
    return {
      identificationNumber: identificationValue,
      identificationType: identificationType,
      locationUuid: session.sessionLocation.uuid,
    };
  }
  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };
  const isValidCustomOtpPayload = (customOtpDto: RequestCustomOtpDto): boolean => {
    if (!customOtpDto.identificationNumber) {
      showSnackbar({
        title: 'Missing Identification Number',
        subtitle: 'Please enter an identification number',
        kind: 'error',
      });
      return false;
    }
    if (!customOtpDto.identificationType) {
      showSnackbar({
        title: 'Missing Identification Type',
        subtitle: 'Please select an identification type',
        kind: 'error',
      });
      return false;
    }
    if (!customOtpDto.locationUuid) {
      showSnackbar({
        title: 'Missing User location',
        subtitle: 'Please ensure you have set your facility',
        kind: 'error',
      });
      return false;
    }
    return true;
  };
  const validateOtp = async () => {
    const validateOtpPayload = generateValidateOtpPayload();
    if (!isValidValidateOtpPayload(validateOtpPayload)) {
      return;
    }
    const resp = await validateCustomOtp(validateOtpPayload);
    if (resp.data.status === 'valid') {
      setOtpValidated(resp.data.status === 'valid');
      onRequestClose({ otpValidated: otpValidated });
      showSnackbar({
        title: 'OTP Validation',
        subtitle: 'OTP Succesfully validated!',
        kind: 'success',
      });
    }
  };
  function generateValidateOtpPayload(): ValidateHieCustomOtpDto {
    return {
      sessionId: sessionId,
      otp: otp,
      locationUuid: session.sessionLocation.uuid,
    };
  }
  const isValidValidateOtpPayload = (validateHieCustomOtpDto: ValidateHieCustomOtpDto): boolean => {
    if (!validateHieCustomOtpDto.otp) {
      showSnackbar({
        title: 'Missing OTP Value',
        subtitle: `Please enter an OTP Value number`,
        kind: 'error',
      });
      return false;
    }
    if (!validateHieCustomOtpDto.sessionId) {
      showSnackbar({
        title: 'Missing Session Value',
        subtitle: `Please request the OTP again`,
        kind: 'error',
      });
      return false;
    }
    if (!validateHieCustomOtpDto.locationUuid) {
      showSnackbar({
        title: 'Missing User location',
        subtitle: `Please ensure you have set your facility`,
        kind: 'error',
      });
      return false;
    }
    return true;
  };
  function registerOnAfyaYangu() {
    window.open('https://afyayangu.go.ke/', '_blank');
  }
  return (
    <>
      <Modal
        aria-label="Modal content"
        modalHeading="HIE Client Verification"
        onRequestClose={() =>
          onRequestClose({
            otpValidated: otpValidated,
          })
        }
        onRequestSubmit={registerOnAfyaYangu}
        onSecondarySubmit={() => onRequestClose({ otpValidated: false })}
        open={showModal}
        primaryButtonText="Register on Afya Yangu"
        secondaryButtonText="Cancel"
      >
        <div className={styles.hieVerificationModalLayout}>
          {!otpValidated ? (
            <>
              <Select
                id="identificationType"
                onChange={handleIdentifierTypeChange}
                labelText="Identification Type"
                size="md"
              >
                <SelectItem text="" value="" />
                {hieClientVerificationIdentifierTypes.map((type) => {
                  return <SelectItem text={type.label} value={type.value} />;
                })}
              </Select>
              <TextInput
                className="input-test-class"
                id="identificationNumber"
                labelText="Identification Number"
                onChange={(e) => handleIdentificationValueChange(e)}
                size="md"
                type="text"
              />
              <Button onClick={sendCustomOtp}>Send OTP</Button>
            </>
          ) : (
            <>
              <TextInput
                className="input-test-class"
                id="maskedPhoneNumber"
                labelText="Phone Number"
                value={maskedPhoneNo}
                size="md"
                type="text"
                readOnly={true}
              />
              <TextInput
                className="input-test-class"
                id="otpInput"
                labelText="OTP"
                onChange={(e) => handleOtpChange(e)}
                size="md"
                type="text"
              />
              <div className={styles.hieVerificationActionRow}>
                <Button onClick={validateOtp}>Validate OTP</Button>
                <Button onClick={sendCustomOtp}>Resend OTP</Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default HieOtpVerificationModal;
