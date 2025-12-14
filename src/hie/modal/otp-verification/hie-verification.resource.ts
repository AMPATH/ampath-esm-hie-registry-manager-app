import { openmrsFetch } from '@openmrs/esm-framework';
import {
  type RequestCustomOtpResponse,
  type RequestCustomOtpDto,
  type ValidateHieCustomOtpDto,
  type ValidateHieCustomOtpResponse,
} from '../../../types';
import { getHieBaseUrl } from '../../../shared/utils/get-base-url';

export async function requestCustomOtp(requestCustomOtpDto: RequestCustomOtpDto): Promise<RequestCustomOtpResponse> {
  const hieBaseUrl = await getHieBaseUrl();
  const customOtpUrl = `${hieBaseUrl}/client/send-custom-otp`;
  const resp = await openmrsFetch(customOtpUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...requestCustomOtpDto }),
  });
  const data = await resp.json();
  return data;
}

export async function validateCustomOtp(
  validateHieCustomOtpDto: ValidateHieCustomOtpDto,
): Promise<ValidateHieCustomOtpResponse> {
  const hieBaseUrl = await getHieBaseUrl();
  const validateOtpUrl = `${hieBaseUrl}/client/validate-custom-otp`;
  const resp = await openmrsFetch(validateOtpUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...validateHieCustomOtpDto }),
  });
  const data = await resp.json();
  return data;
}
