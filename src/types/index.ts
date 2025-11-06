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
