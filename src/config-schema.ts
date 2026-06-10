import { Type } from '@openmrs/esm-framework';
export const configSchema = {
  hieBaseUrl: {
    _type: Type.String,
    _description: 'HIE Endpoint',
    _default: '',
  },
  etlBaseUrl: {
    _type: Type.String,
    _description: 'ETL Endpoint',
    _default: '',
  },
  facilityRegistrationCodeUuid: {
     _type: Type.String,
    _description: 'HIE Facility registration code',
    _default: '',
  }
};

export type Config = {
  hieBaseUrl: string;
  facilityRegistrationCodeUuid: string;
  etlBaseUrl: string;
};
