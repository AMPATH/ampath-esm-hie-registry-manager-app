import { openmrsFetch, restBaseUrl } from '@openmrs/esm-framework';

export async function getProviderByUuid(providerUuid: string): Promise<any[]> {
  const params = new URLSearchParams();
  params.append('v', 'full');
  const providerUrl = `provider/${providerUuid}?${params}`;
  const resp = await openmrsFetch(`${restBaseUrl}/${providerUrl}`);
  const data = await resp.json();
  return data ?? [];
}
