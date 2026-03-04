import { getHieBaseUrl } from '../../../shared/utils/get-base-url';
import { type FhirBundle } from './types';
import { openmrsFetch, type PatientIdentifier, restBaseUrl } from '@openmrs/esm-framework';
import { buildShrApiUrl, type ShrApiParams } from './shr-fhir-utils';

export const getPatientShrSummary = async (crNo: string, locationUuid: string): Promise<FhirBundle> => {
  const hieBaseUrl = await getHieBaseUrl();
  const shrSummaryUrl = `${hieBaseUrl}/v1/shr/summary?cr_id=${crNo}&locationUuid=${locationUuid}`;
  const resp = await openmrsFetch(shrSummaryUrl);
  const data = await resp.json();
  return data;
};

/**
 * Enhanced SHR summary fetch with support for resource filtering, sorting, and pagination.
 * @param params - { crId, locationUuid, resources?, sort?, count?, offset? }
 */
export const getPatientShrSummaryWithParams = async (params: ShrApiParams): Promise<FhirBundle> => {
  const hieBaseUrl = await getHieBaseUrl();
  const url = buildShrApiUrl(hieBaseUrl, params);
  const resp = await openmrsFetch(url);
  const data = await resp.json();
  return data;
};

export async function getPatientCrIdentifier(patientUuid: string): Promise<PatientIdentifier> {
  const url = `${restBaseUrl}/patient/${patientUuid}/identifier`;
  const resp = await openmrsFetch(url);
  const data = await resp.json();
  const identifiers = data.results ?? [];
  const crIdentifier = getCrIdentifierFromIdentifierList(identifiers);
  return crIdentifier;
}

function getCrIdentifierFromIdentifierList(identifiers: PatientIdentifier[]) {
  const crIdentifier = identifiers.find((id) => {
    return id.identifierType.uuid === 'e88dc246-3614-4ee3-8141-1f2a83054e72';
  });
  return crIdentifier;
}
