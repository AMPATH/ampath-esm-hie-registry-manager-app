import { type FhirBundle } from './types';

/**
 * Comprehensive mock FHIR Bundle for development and testing.
 * Contains realistic SHR data matching the UI design:
 * - 1× Patient, 1× Encounter
 * - 2× Conditions (Hypertension + Diabetes)
 * - 6× Observations (Vitals: BP, HR, RR, SpO2, BMI + Lab: FBS)
 * - 2× MedicationRequests (Amlodipine, Metformin)
 * - 1× ServiceRequest (OBGPY referral)
 */
export const mockShrBundle: FhirBundle = {
    resourceType: 'Bundle',
    id: 'shr-summary-bundle-001',
    meta: {
        lastUpdated: '2026-01-18T08:30:00.000+03:00',
    },
    type: 'searchset',
    timestamp: '2026-01-18T08:30:00.000+03:00',
    entry: [
        // ── Patient ──────────────────────────────────────────────
        {
            fullUrl: 'urn:uuid:patient-001',
            resource: {
                resourceType: 'Patient',
                id: 'patient-001',
                meta: {
                    versionId: '1',
                    lastUpdated: '2026-01-18T08:30:00.000+03:00',
                },
                identifier: [
                    {
                        use: 'official',
                        system: 'urn:oid:2.16.840.1.113883.3.26.1.3',
                        value: 'xxxxxxxxxxx',
                        type: {
                            coding: [{ system: 'http://terminology.hl7.org/CodeSystem/v2-0203', code: 'NUPI', display: 'NUPI' }],
                            text: 'NUPI',
                        },
                    },
                ],
                name: [
                    {
                        text: 'John Doe',
                        family: 'Doe',
                        given: ['John'],
                    },
                ],
                gender: 'male',
                birthDate: '1980-05-15',
            },
            request: { method: 'GET', url: 'Patient/patient-001' },
        },

        // ── Encounter ────────────────────────────────────────────
        {
            fullUrl: 'urn:uuid:encounter-001',
            resource: {
                resourceType: 'Encounter',
                id: 'encounter-001',
                meta: {
                    versionId: '1',
                    lastUpdated: '2026-01-18T08:30:00.000+03:00',
                },
                status: 'finished',
                class: {
                    system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
                    code: 'AMB',
                    display: 'ambulatory',
                },
                type: [
                    {
                        coding: [{ system: 'http://snomed.info/sct', code: '270427003', display: 'Patient-initiated encounter' }],
                        text: 'Patient-initiated encounter',
                    },
                ],
                subject: { reference: 'Patient/patient-001', type: 'Patient' },
                period: {
                    start: '2026-01-18T08:00:00.000+03:00',
                    end: '2026-01-18T09:00:00.000+03:00',
                },
                serviceProvider: {
                    reference: 'Organization/12345',
                    display: 'MTRH',
                },
            },
            request: { method: 'GET', url: 'Encounter/encounter-001' },
        },

        // ── Condition: Essential Hypertension ─────────────────────
        {
            fullUrl: 'urn:uuid:condition-001',
            resource: {
                resourceType: 'Condition',
                id: 'condition-001',
                meta: {
                    versionId: '1',
                    lastUpdated: '2026-01-18T08:30:00.000+03:00',
                },
                clinicalStatus: {
                    coding: [
                        {
                            system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
                            code: 'active',
                            display: 'Active',
                        },
                    ],
                    text: 'Active',
                },
                verificationStatus: {
                    coding: [
                        {
                            system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status',
                            code: 'confirmed',
                            display: 'Confirmed',
                        },
                    ],
                    text: 'Confirmed',
                },
                category: [
                    {
                        coding: [
                            {
                                system: 'http://terminology.hl7.org/CodeSystem/condition-category',
                                code: 'encounter-diagnosis',
                                display: 'Encounter Diagnosis',
                            },
                        ],
                        text: 'primary',
                    },
                ],
                code: {
                    coding: [{ system: 'http://hl7.org/fhir/sid/icd-10', code: 'I10', display: 'Essential Hypertension' }],
                    text: 'I10 – Essential Hypertension',
                },
                subject: { reference: 'Patient/patient-001', type: 'Patient' },
                encounter: { reference: 'Encounter/encounter-001' },
                recordedDate: '2026-01-18T08:30:00.000+03:00',
            },
            request: { method: 'GET', url: 'Condition/condition-001' },
        },

        // ── Condition: Type 2 Diabetes ───────────────────────────
        {
            fullUrl: 'urn:uuid:condition-002',
            resource: {
                resourceType: 'Condition',
                id: 'condition-002',
                meta: {
                    versionId: '1',
                    lastUpdated: '2026-01-18T08:30:00.000+03:00',
                },
                clinicalStatus: {
                    coding: [
                        {
                            system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
                            code: 'active',
                            display: 'Active',
                        },
                    ],
                    text: 'Active',
                },
                verificationStatus: {
                    coding: [
                        {
                            system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status',
                            code: 'confirmed',
                            display: 'Confirmed',
                        },
                    ],
                    text: 'Confirmed',
                },
                category: [
                    {
                        coding: [
                            {
                                system: 'http://terminology.hl7.org/CodeSystem/condition-category',
                                code: 'encounter-diagnosis',
                                display: 'Encounter Diagnosis',
                            },
                        ],
                        text: 'secondary',
                    },
                ],
                code: {
                    coding: [{ system: 'http://hl7.org/fhir/sid/icd-10', code: 'E11', display: 'Type 2 Diabetes Mellitus' }],
                    text: 'E11 – Type 2 Diabetes Mellitus',
                },
                subject: { reference: 'Patient/patient-001', type: 'Patient' },
                encounter: { reference: 'Encounter/encounter-001' },
                recordedDate: '2026-01-18T08:30:00.000+03:00',
            },
            request: { method: 'GET', url: 'Condition/condition-002' },
        },

        // ── Observation: Blood Pressure (Systolic) ──────────────
        {
            fullUrl: 'urn:uuid:obs-bp-systolic',
            resource: {
                resourceType: 'Observation',
                id: 'obs-bp-systolic',
                status: 'final',
                code: {
                    coding: [
                        { system: 'http://loinc.org', code: '8480-6', display: 'Systolic blood pressure' },
                    ],
                    text: 'Systolic BP',
                },
                subject: { reference: 'Patient/patient-001' },
                valueCodeableConcept: {
                    text: '170',
                },
            },
            request: { method: 'GET', url: 'Observation/obs-bp-systolic' },
        },

        // ── Observation: Blood Pressure (Diastolic) ─────────────
        {
            fullUrl: 'urn:uuid:obs-bp-diastolic',
            resource: {
                resourceType: 'Observation',
                id: 'obs-bp-diastolic',
                status: 'final',
                code: {
                    coding: [
                        { system: 'http://loinc.org', code: '8462-4', display: 'Diastolic blood pressure' },
                    ],
                    text: 'Diastolic BP',
                },
                subject: { reference: 'Patient/patient-001' },
                valueCodeableConcept: {
                    text: '90',
                },
            },
            request: { method: 'GET', url: 'Observation/obs-bp-diastolic' },
        },

        // ── Observation: Heart Rate ─────────────────────────────
        {
            fullUrl: 'urn:uuid:obs-hr',
            resource: {
                resourceType: 'Observation',
                id: 'obs-hr',
                status: 'final',
                code: {
                    coding: [{ system: 'http://loinc.org', code: '8867-4', display: 'Heart rate' }],
                    text: 'Heart Rate',
                },
                subject: { reference: 'Patient/patient-001' },
                valueCodeableConcept: {
                    text: '30',
                },
            },
            request: { method: 'GET', url: 'Observation/obs-hr' },
        },

        // ── Observation: Respiratory Rate ───────────────────────
        {
            fullUrl: 'urn:uuid:obs-rr',
            resource: {
                resourceType: 'Observation',
                id: 'obs-rr',
                status: 'final',
                code: {
                    coding: [{ system: 'http://loinc.org', code: '9279-1', display: 'Respiratory rate' }],
                    text: 'Respiratory Rate',
                },
                subject: { reference: 'Patient/patient-001' },
                valueCodeableConcept: {
                    text: '330',
                },
            },
            request: { method: 'GET', url: 'Observation/obs-rr' },
        },

        // ── Observation: SpO2 ───────────────────────────────────
        {
            fullUrl: 'urn:uuid:obs-spo2',
            resource: {
                resourceType: 'Observation',
                id: 'obs-spo2',
                status: 'final',
                code: {
                    coding: [{ system: 'http://loinc.org', code: '2708-6', display: 'Oxygen saturation' }],
                    text: 'SPO2',
                },
                subject: { reference: 'Patient/patient-001' },
                valueCodeableConcept: {
                    text: '50',
                },
            },
            request: { method: 'GET', url: 'Observation/obs-spo2' },
        },

        // ── Observation: BMI ────────────────────────────────────
        {
            fullUrl: 'urn:uuid:obs-bmi',
            resource: {
                resourceType: 'Observation',
                id: 'obs-bmi',
                status: 'final',
                code: {
                    coding: [{ system: 'http://loinc.org', code: '39156-5', display: 'Body mass index' }],
                    text: 'BMI',
                },
                subject: { reference: 'Patient/patient-001' },
                valueCodeableConcept: {
                    text: '77.2',
                },
            },
            request: { method: 'GET', url: 'Observation/obs-bmi' },
        },

        // ── Observation: FBS (Lab) ──────────────────────────────
        {
            fullUrl: 'urn:uuid:obs-fbs',
            resource: {
                resourceType: 'Observation',
                id: 'obs-fbs',
                status: 'final',
                code: {
                    coding: [{ system: 'http://loinc.org', code: '1558-6', display: 'Fasting blood sugar' }],
                    text: 'FBS',
                },
                subject: { reference: 'Patient/patient-001' },
                valueCodeableConcept: {
                    text: '9.2',
                },
            },
            request: { method: 'GET', url: 'Observation/obs-fbs' },
        },

        // ── MedicationRequest: Amlodipine ───────────────────────
        {
            fullUrl: 'urn:uuid:med-001',
            resource: {
                resourceType: 'MedicationRequest',
                id: 'med-001',
                meta: {
                    versionId: '1',
                    lastUpdated: '2026-01-18T08:30:00.000+03:00',
                },
                status: 'active',
                intent: 'order',
                priority: 'routine',
                medicationCodeableConcept: {
                    coding: [{ system: 'http://www.nlm.nih.gov/research/umls/rxnorm', code: '329528', display: 'Amlodipine 5mg' }],
                    text: 'Amlodipine 5mg OD',
                },
                subject: { reference: 'Patient/patient-001', type: 'Patient' },
                encounter: { reference: 'Encounter/encounter-001' },
                authoredOn: '2026-01-18T08:30:00.000+03:00',
                dosageInstruction: [
                    {
                        text: 'Take once daily',
                        timing: {
                            repeat: { duration: 30, durationUnit: 'd' },
                            code: {
                                coding: [{ system: 'http://terminology.hl7.org/CodeSystem/v3-GTSAbbreviation', code: 'QD', display: 'Once daily' }],
                                text: 'Once daily',
                            },
                        },
                        asNeededBoolean: false,
                        route: {
                            coding: [{ system: 'http://snomed.info/sct', code: '26643006', display: 'Oral' }],
                            text: 'Oral',
                        },
                        doseAndRate: [
                            {
                                doseQuantity: { value: 5, unit: 'mg', code: 'mg' },
                            },
                        ],
                    },
                ],
                dispenseRequest: {
                    validityPeriod: { start: '2026-01-18' },
                    numberOfRepeatsAllowed: 0,
                    quantity: { value: 30, unit: 'tablets', code: 'TAB' },
                },
                note: [
                    {
                        text: 'Take after meals',
                    },
                ],
            },
            request: { method: 'GET', url: 'MedicationRequest/med-001' },
        },

        // ── MedicationRequest: Metformin ────────────────────────
        {
            fullUrl: 'urn:uuid:med-002',
            resource: {
                resourceType: 'MedicationRequest',
                id: 'med-002',
                meta: {
                    versionId: '1',
                    lastUpdated: '2026-01-18T08:30:00.000+03:00',
                },
                status: 'active',
                intent: 'order',
                priority: 'routine',
                medicationCodeableConcept: {
                    coding: [{ system: 'http://www.nlm.nih.gov/research/umls/rxnorm', code: '860975', display: 'Metformin 500mg' }],
                    text: 'Metformin 500mg BD',
                },
                subject: { reference: 'Patient/patient-001', type: 'Patient' },
                encounter: { reference: 'Encounter/encounter-001' },
                authoredOn: '2026-01-18T08:30:00.000+03:00',
                dosageInstruction: [
                    {
                        text: 'Take twice daily',
                        timing: {
                            repeat: { duration: 30, durationUnit: 'd' },
                            code: {
                                coding: [{ system: 'http://terminology.hl7.org/CodeSystem/v3-GTSAbbreviation', code: 'BID', display: 'Twice daily' }],
                                text: 'Twice daily',
                            },
                        },
                        asNeededBoolean: false,
                        route: {
                            coding: [{ system: 'http://snomed.info/sct', code: '26643006', display: 'Oral' }],
                            text: 'Oral',
                        },
                        doseAndRate: [
                            {
                                doseQuantity: { value: 500, unit: 'mg', code: 'mg' },
                            },
                        ],
                    },
                ],
                dispenseRequest: {
                    validityPeriod: { start: '2026-01-18' },
                    numberOfRepeatsAllowed: 0,
                    quantity: { value: 60, unit: 'tablets', code: 'TAB' },
                },
                note: [
                    {
                        text: 'Take after meals',
                    },
                ],
            },
            request: { method: 'GET', url: 'MedicationRequest/med-002' },
        },

        // ── ServiceRequest: OBGPY Referral ──────────────────────
        {
            fullUrl: 'urn:uuid:referral-001',
            resource: {
                resourceType: 'ServiceRequest',
                id: 'referral-001',
                meta: {
                    versionId: '1',
                    lastUpdated: '2026-01-18T08:30:00.000+03:00',
                },
                status: 'active',
                intent: 'order',
                category: [
                    {
                        coding: [
                            {
                                system: 'http://snomed.info/sct',
                                code: '3457005',
                                display: 'Patient referral',
                            },
                        ],
                        text: 'Referral',
                    },
                ],
                priority: 'routine',
                subject: { reference: 'Patient/patient-001', type: 'Patient' },
                encounter: { reference: 'Encounter/encounter-001' },
                authoredOn: '2026-01-18T08:30:00.000+03:00',
                requester: {
                    reference: 'Practitioner/prv-001',
                    display: 'PRV-001',
                    type: 'Practitioner',
                },
                performer: [
                    {
                        reference: 'Organization/mtrh',
                        display: 'MTRH',
                        type: 'Organization',
                    },
                ],
                reasonCode: [
                    {
                        coding: [{ system: 'http://snomed.info/sct', code: '386639001', display: 'OBGPY' }],
                        text: 'OBGPY',
                    },
                ],
                note: [
                    {
                        text: 'Referral to OBGPY at MTRH',
                    },
                ],
            },
            request: { method: 'GET', url: 'ServiceRequest/referral-001' },
        },
    ],
};
