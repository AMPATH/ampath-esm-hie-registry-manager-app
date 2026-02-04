export interface PractitionerMembership {
  id: string;
  status: string;
  salutation?: string;
  full_name: string;
  gender?: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  registration_id: string;
  external_reference_id?: string;
  licensing_body: string;
  specialty?: string;
  is_active: number;
  is_withdrawn: number;
  withdrawal_reason?: string;
  withdrawal_date?: string;
  license_expires_in_days?: string;
}

export interface PractitionerLicense {
  id: string;
  external_reference_id: string;
  license_type: string;
  license_start: string;
  license_end: string;
}

export interface PractitionerProfessionalDetails {
  professional_cadre: string;
  practice_type: string;
  specialty?: string;
  subspecialty?: string;
  discipline_name?: string;
  educational_qualifications?: string;
}

export interface PractitionerContacts {
  phone: string;
  email: string;
  postal_address: string;
}

export interface PractitionerIdentifiers {
  identification_type: string;
  identification_number: string;
  client_registry_id?: string;
  student_id?: string;
}

export interface PractitionerMessage {
  membership: PractitionerMembership;
  licenses: PractitionerLicense[];
  professional_details: PractitionerProfessionalDetails;
  contacts: PractitionerContacts;
  identifiers: PractitionerIdentifiers;
}

export interface PractitionerResponse {
  message: PractitionerMessage | { error: string };
}

export interface PractitionerSearchParams {
  nationalId?: string;
  licenseNumber?: string;
  registrationNumber?: string;
  name?: string;
  refresh?: boolean;
}

export interface Provider {
  location_id: number;
  location_name: string;
  provider_id: number;
  provider_names: string | null;
  national_id: string;
}

export interface ProvidersResponse {
  providers: Provider[];
}

export type FacilitySearchFilter = {
  filterType: string;
  filterValue: string;
  locationUuid: string;
};

export type HieFacility = {
  id: string;
  facility_name: string;
  registration_number: string;
  facility_code: string;
  regulator: string;
  facility_level: string;
  facility_category: string;
  facility_owner: string;
  facility_type: string;
  county: string;
  sub_county: string;
  ward: string;
  found: number;
  approved: number;
  operational_status: string;
  current_license_expiry_date: string;
};

export type HieFacilitySearchResponse = {
  message: HieFacility;
};

export enum HieClientVerificationIdentifierType {
  NationalID = 'National ID',
  RefugeeID = 'Refugee ID',
  AlienID = 'Alien ID',
  MandateNumber = 'Mandate Number',
}

export type RequestCustomOtpDto = {
  identificationNumber: string | number;
  identificationType: string;
  locationUuid: string;
};

export type RequestCustomOtpResponse = {
  message: string;
  sessionId: string;
  maskedPhone: string;
};

export type ValidateHieCustomOtpDto = {
  sessionId: string;
  otp: number | string;
  locationUuid: string;
};

export type ValidateHieCustomOtpResponse = {
  data: {
    identification_type: string;
    identification_number: string;
    status: HieOtpValidationStatus;
  };
  source?: string;
};

export type HieOtpValidationStatus = 'valid' | 'invalid';

export type TagType =
  | 'red'
  | 'magenta'
  | 'purple'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'green'
  | 'gray'
  | 'cool-gray'
  | 'warm-gray'
  | 'high-contrast'
  | 'outline';

export type EligibilityFilterDto = {
  requestIdType: string;
  requestIdNumber: string;
  locationUuid: string;
};

export type HieClientEligibility = {
  requestIdType: number;
  requestIdNumber: string;
  memberCrNumber: string;
  fullName: string;
  schemes: Scheme[];
};

export type Scheme = {
  schemeName: string;
  memberType: 'BENEFICIARY' | string;
  coverageType: 'SHIF' | string;
  policy: Policy;
  coverage: Coverage;
  principalContributor: PrincipalContributor;
};

export type Policy = {
  startDate: string;
  endDate: string;
  number: string;
};

export type Coverage = {
  startDate: string;
  endDate: string;
  message: string;
  reason: string;
  possibleSolution: string | null;
  status: string;
};

export type PrincipalContributor = {
  idNumber: string;
  name: string;
  crNumber: string;
  relationship: string;
  employmentType: string;
  employerDetails: EmployerDetails;
};

export type EmployerDetails = {
  name: string;
  jobGroup: string;
};

export enum RequestIdTypes {
  BirthCertificate = 2,
  CrId = 3,
  NationalId = 4,
  Refugee = 5,
  TemporaryId = 6,
  TempDependantId = 7,
  MandateNo = 8,
  Passport = 9,
  BirthCertificate2 = 10,
  HouseholdNumber = 11,
}
