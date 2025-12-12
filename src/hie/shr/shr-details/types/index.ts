export type FhirBundle = {
  resourceType: 'Bundle';
  id?: string;
  meta?: Meta;
  type: string;
  timestamp?: string;
  link?: BundleLink[];
  entry: BundleEntry[];
};

export type Meta = {
  versionId?: string;
  lastUpdated: string;
  source?: string;
  profile?: string[];
};

export type BundleLink = {
  relation: string;
  url: string;
};

export type BundleEntry = {
  fullUrl: string;
  resource: FhirResource;
  request: ShrRequest;
  search?: { mode: string };
};

export type ShrIdentifier = {
  use?: string;
  system?: string;
  value?: string;
  type?: CodeableConcept;
};

export type Reference = {
  reference?: string;
  type?: string;
  identifier?: ShrIdentifier;
  display?: string;
};

export type ShrCoding = {
  system?: string;
  code?: string;
  display?: string;
};

export type CodeableConcept = {
  coding?: ShrCoding[];
  text?: string;
};

export type Period = {
  start?: string;
  end?: string;
};

export type Annotation = {
  authorString?: string;
  time?: string;
  text?: string;
};
export type ShrDoseQuantity = {
  value: number;
  unit: string;
  code: string;
};
export type ShrDoseAndRate = {
  doseQuantity: ShrDoseQuantity;
};
export type ShrDosageTiming = {
  repeat: {
    duration: number;
    durationUnit: string;
  };
  code: CodeableConcept;
};

export type ShrDosageInstruction = {
  text: string;
  timing: ShrDosageTiming;
  asNeededBoolean: boolean;
  route: CodeableConcept;
  doseAndRate: ShrDoseAndRate[];
};

export type ShrDispenseRequest = {
  validityPeriod: {
    start: string;
  };
  numberOfRepeatsAllowed: number;
  quantity: ShrDoseQuantity;
};

export type ShrRequest = {
  method: string;
  url: string;
};

export type ShrBasedOn = {
  type: string;
  identifier: ShrIdentifier;
};

export type FhirResource =
  | ShrPatient
  | ShrEncounter
  | ShrCondition
  | ShrServiceRequest
  | ShrObservation
  | ShrSpecimen
  | ShrMedicationRequest;

export type ShrPatient = {
  resourceType: 'Patient';
  id: string;
  meta: Meta;
  identifier?: ShrIdentifier[];
  name?: {
    text?: string;
    family?: string;
    given?: string[];
  }[];
  gender?: string;
  birthDate?: string;
};

export type ShrEncounter = {
  resourceType: 'Encounter';
  id: string;
  meta: Meta;
  identifier?: ShrIdentifier[];
  status?: string;
  class?: ShrCoding;
  type?: CodeableConcept[];
  priority?: CodeableConcept;
  subject?: Reference;
  participant?: {
    individual?: {
      identifier?: ShrIdentifier;
    };
  }[];
  period?: Period;
  serviceProvider?: Reference;
};

export type ShrCondition = {
  resourceType: 'Condition';
  id: string;
  meta: Meta;
  identifier?: ShrIdentifier[];
  clinicalStatus?: CodeableConcept;
  verificationStatus?: CodeableConcept;
  category?: CodeableConcept[];
  severity?: CodeableConcept;
  code?: CodeableConcept;
  subject?: Reference;
  encounter?: Reference;
  onsetDateTime?: string;
  recordedDate?: string;
  note?: Annotation[];
};

export type ShrServiceRequest = {
  resourceType: 'ServiceRequest';
  id: string;
  meta: Meta;
  contained?: (ShrObservation | ShrSpecimen)[];
  identifier?: ShrIdentifier[];
  basedOn?: ShrBasedOn[];
  status?: string;
  intent?: string;
  category?: CodeableConcept[];
  priority?: string;
  subject?: Reference;
  encounter?: Reference;
  occurrencePeriod?: Period;
  occurrenceDateTime?: string;
  authoredOn?: string;
  requester?: Reference;
  performer?: Reference[];
  reasonCode?: CodeableConcept[];
  supportingInfo?: Reference[];
  note?: Annotation[];
};

export type ShrObservation = {
  resourceType: 'Observation';
  id: string;
  status?: string;
  code?: CodeableConcept;
  subject?: Reference;
  valueCodeableConcept?: CodeableConcept;
};

export type ShrSpecimen = {
  resourceType: 'Specimen';
  id: string;
  identifier?: ShrIdentifier[];
  type?: CodeableConcept;
  subject?: Reference;
  collection?: {
    collectedDateTime?: string;
  };
};

export type ShrMedicationRequest = {
  resourceType: 'MedicationRequest';
  id?: string;
  meta?: Meta;
  identifier?: ShrIdentifier[];
  status?: string;
  intent?: string;
  priority: string;
  medicationCodeableConcept?: CodeableConcept;
  subject?: Reference;
  encounter?: Reference;
  authoredOn?: string;
  requester?: Reference;
  note?: Annotation[];
  dosageInstruction: ShrDosageInstruction[];
  dispenseRequest: ShrDispenseRequest;
};
