import { openmrsFetch, restBaseUrl, type Location } from '@openmrs/esm-framework';

export async function getLocationByUuid(locationUuid: string): Promise<Location> {
  const params = new URLSearchParams();
  params.append('v', 'full');
  const locationUrl = `location/${locationUuid}?${params}`;
  const resp = await openmrsFetch(`${restBaseUrl}/${locationUrl}`);
  const data = await resp.json();
  return data ?? null;
}
