import { type FhirBundle, type BundleEntry } from './types';

/**
 * Maps a FHIR resource status to a Carbon Tag color.
 * Used to visually distinguish resource states in the UI.
 */
export function getStatusTagColor(
    status: string,
    resourceType?: string,
): 'green' | 'red' | 'blue' | 'gray' | 'purple' | 'cyan' | 'teal' | 'magenta' | 'warm-gray' {
    if (!status) return 'gray';

    const normalized = status.toLowerCase();

    // Severity-based mapping (e.g. AllergyIntolerance)
    if (normalized === 'severe' || normalized === 'high') return 'red';
    if (normalized === 'moderate') return 'magenta';
    if (normalized === 'mild' || normalized === 'low') return 'green';

    // Clinical status mapping
    switch (normalized) {
        case 'active':
        case 'confirmed':
        case 'final':
        case 'completed':
            return 'green';
        case 'inactive':
        case 'resolved':
        case 'cancelled':
        case 'stopped':
            return 'gray';
        case 'recurrence':
        case 'relapse':
            return 'purple';
        case 'entered-in-error':
        case 'refuted':
            return 'red';
        case 'unconfirmed':
        case 'provisional':
        case 'draft':
        case 'on-hold':
            return 'cyan';
        case 'synced':
            return 'green';
        default:
            return 'blue';
    }
}

/**
 * Format an ISO date string to DD-MMM-YYYY (e.g. 18-Jan-2026).
 */
export function formatShrDate(dateString: string | undefined): string {
    if (!dateString) return '—';
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    } catch {
        return dateString;
    }
}

/**
 * Extract all resources of a given FHIR resource type from a bundle.
 */
export function extractResourcesByType<T>(bundle: FhirBundle, resourceType: string): T[] {
    if (!bundle?.entry) return [];
    return bundle.entry
        .filter((entry: BundleEntry) => entry?.resource?.resourceType === resourceType)
        .map((entry: BundleEntry) => entry.resource as T);
}

/**
 * Parameters for the SHR summary API endpoint.
 */
export type ShrApiParams = {
    crId: string;
    locationUuid: string;
    resources?: string;
    sort?: 'asc' | 'desc';
    count?: number;
    offset?: number;
};

/**
 * Build the full SHR API URL from a base URL and query parameters.
 */
export function buildShrApiUrl(baseUrl: string, params: ShrApiParams): string {
    const queryParams = new URLSearchParams();
    queryParams.append('cr_id', params.crId);
    queryParams.append('locationUuid', params.locationUuid);

    if (params.resources) {
        queryParams.append('resources', params.resources);
    }
    if (params.sort) {
        queryParams.append('sort', params.sort);
    }
    if (params.count !== undefined && params.count !== null) {
        queryParams.append('count', String(params.count));
    }
    if (params.offset !== undefined && params.offset !== null) {
        queryParams.append('offset', String(params.offset));
    }

    return `${baseUrl}/v1/shr/summary?${queryParams.toString()}`;
}

/**
 * Get a display-friendly label for a FHIR resource type.
 */
export function getResourceTypeLabel(resourceType: string): string {
    const labels: Record<string, string> = {
        Condition: 'Diagnosis',
        Observation: 'Vitals / Lab',
        MedicationRequest: 'Medication',
        ServiceRequest: 'Referral',
        AllergyIntolerance: 'Allergy',
        Encounter: 'Encounter',
        Patient: 'Patient',
    };
    return labels[resourceType] ?? resourceType;
}

/**
 * Extract the display text from a CodeableConcept, falling back through coding[0].display → text → code.
 */
export function getCodeableConceptDisplay(concept: { coding?: { display?: string; code?: string }[]; text?: string } | undefined): string {
    if (!concept) return '—';
    if (concept.text) return concept.text;
    if (concept.coding?.[0]?.display) return concept.coding[0].display;
    if (concept.coding?.[0]?.code) return concept.coding[0].code;
    return '—';
}

/**
 * Extract the code from a CodeableConcept.
 */
export function getCodeableConceptCode(concept: { coding?: { code?: string }[]; text?: string } | undefined): string {
    if (!concept) return '';
    if (concept.coding?.[0]?.code) return concept.coding[0].code;
    return '';
}
