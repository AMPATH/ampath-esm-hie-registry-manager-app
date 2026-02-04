import { openmrsFetch } from '@openmrs/esm-framework';
import {
  type HieClientEligibility,
  type EligibilityFilterDto,
  type FacilitySearchFilter,
  type HieFacility,
  type PractitionerMessage,
  type PractitionerResponse,
  type PractitionerSearchParams,
  type Provider,
} from '../types';
import { getHieBaseUrl } from '../shared/utils/get-base-url';

/**
 * Search for a practitioner by various identifiers
 * @param params - Search parameters (nationalId, licenseNumber, registrationNumber)
 *  * @param locationUuid - UUID of the location (required)
 * @returns Promise with practitioner details
 */
export async function searchPractitioner(
  params: PractitionerSearchParams,
  locationUuid: string,
): Promise<PractitionerMessage | null> {
  const queryParams = new URLSearchParams();

  if (params.nationalId) {
    queryParams.append('identifierType', 'National ID');
    queryParams.append('identifierValue', params.nationalId);
  } else if (params.licenseNumber) {
    queryParams.append('identifierType', 'id');
    queryParams.append('identifierValue', params.licenseNumber);
  } else if (params.registrationNumber) {
    queryParams.append('identifierType', 'registration_number');
    queryParams.append('identifierValue', params.registrationNumber);
  }

  queryParams.append('locationUuid', locationUuid);

  if (params.refresh) {
    queryParams.append('refresh', String(params.refresh));
  }

  const hieBaseUrl = await getHieBaseUrl();

  const url = `${hieBaseUrl}/practitioner/search?${queryParams.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: PractitionerResponse = await response.json();

    if ('error' in data.message) {
      throw new Error(data.message.error);
    }

    return data.message as PractitionerMessage;
  } catch (error) {
    console.error('Error searching practitioner:', error);
    throw error;
  }
}

/**
 * Get all active providers for a specific location
 * @param locationUuid - UUID of the location
 * @returns Promise with array of providers
 */
export async function getAllProviders(locationUuid: string): Promise<Provider[]> {
  const hieBaseUrl = await getHieBaseUrl();
  const url = `${hieBaseUrl}/amrs/providers/active?locationUuid=${locationUuid}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Provider[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching all providers:', error);
    throw error;
  }
}

/**
 * Get provider details by National ID
 * @param nationalId - National ID of the provider
 * @returns Promise with provider details
 */
export async function getProviderByNationalId(nationalId: string): Promise<Provider[]> {
  const hieBaseUrl = await getHieBaseUrl();
  const url = `${hieBaseUrl}/amrs/provider/national-id?nationalId=${nationalId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Provider[] = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching provider by National ID:', error);
    return [];
  }
}

export async function fetchFacilityDetails(payload: FacilitySearchFilter) {
  const params = new URLSearchParams();
  params.append('filterType', payload.filterType);
  params.append('filterValue', payload.filterValue);
  params.append('locationUuid', payload.locationUuid);

  const hieBaseUrl = await getHieBaseUrl();

  const searchFacilityUrl = `${hieBaseUrl}/facility/search?${params}`;
  const resp = await openmrsFetch(searchFacilityUrl);
  const data: { message: HieFacility } = await resp.json();
  return data;
}

export function getErrorResponseMessage(error) {
  let msg = 'An error ocurred, please try again or contact support';
  if (error.error) {
    if (error.error.details) {
      msg = error.error.details;
    } else if (error.error.error) {
      msg = error.error.error;
    } else {
      msg = error.error;
    }
  } else if (error.details) {
    msg = error.details;
  } else if (error.responseBody) {
    if (error.responseBody.details) {
      msg = error.responseBody.details;
    }
    if (error.responseBody.error) {
      msg = error.responseBody.error;
    }
  } else if (error.message) {
    msg = error.message;
  }
  return msg;
}

/**
 * Format date from YYYY-MM-DD to a more readable format
 */
export function formatDate(dateString: string): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export async function getClientEligibityStatus(
  eligibilityFilterDto: EligibilityFilterDto,
): Promise<HieClientEligibility> {
  const hieBaseUrl = await getHieBaseUrl();
  const url = `${hieBaseUrl}/eligibility`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eligibilityFilterDto),
  });

  const data = response.json();
  return data;
}
