import React, { useEffect, useMemo, useState } from 'react';
import { type Location, showSnackbar, useSession } from '@openmrs/esm-framework';
import { fetchFacilityDetails } from '../../hie-resource';
import {
  type TagType,
  type HieFacility,
  type FacilitySearchFilter,
} from '../../../types';
import styles from './facility-registry-banner.scss';
import { Button, Tag } from '@carbon/react';
import { getTagType } from '../../../shared/utils/get-tag-type';
import { getLocationByUuid } from '../../../shared/location.resource';
import { LocationAtributeTypeUuids } from '../../../shared/constants';
interface facilityRegistryBannerProps {}
const FacilityRegistryBanner: React.FC<facilityRegistryBannerProps> = () => {
  const [facility, setFacility] = useState<HieFacility>();
  const [displayDetailsModal, setDisplayDetailsModal] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);
  const session = useSession();
  const location = session.sessionLocation;


  useEffect(() => {
    getFacilityDetails();
  }, []);

  async function getFacilityDetails() {
    setLoading(true);
    const locationUuid = location?.uuid ?? '';
    const l = await  getLocationByUuid(locationUuid);
    if(!l){
     return;
    }
    const data = getLocationAttributes(l);
    if(!data || !data.facilityRegistryCode){
       return;
    }
    const facilitySearchFilter: FacilitySearchFilter = {
        filterType: 'registrationCode',
        filterValue:  data.facilityRegistryCode ?? '',
        locationUuid: location?.uuid ?? ''
    };
    if (l) {
      try {
        const fc = await fetchFacilityDetails(facilitySearchFilter);
        if(fc){
          setFacility(fc.message);
        }
        
      } catch (error) {
        showSnackbar({
          kind: 'error',
          title: 'Error Fetching Facility Details',
          subtitle:
            error.message ??
            'An error occurred while fetching facility details. Please Try again or contact support',
        });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }
  function getLocationAttributes(location:Location) {
    const attributes = location.attributes;
    if(!attributes){
        return null;
    }
    const facilityLocationAttribute = attributes.find((attr) => {
      return attr.attributeType.uuid.includes(LocationAtributeTypeUuids.FACILITY_REGISTRY_CODE_UUID);
    });
    return {
      facilityRegistryCode: facilityLocationAttribute ?  facilityLocationAttribute['value'] : ''
    };
  }
  function getLicenseStatusType(status: string): TagType {
    if (status === 'LICENSED') {
      return 'green';
    } else {
      return 'red';
    }
  }
 
  if (!location) {
    return <></>;
  }
  return (
    <>
      <div className={styles.fcBannerLayout}>
        <div>
          <Tag size="lg" title="Facility" type="blue">
            {facility?.officialName}
          </Tag>
        </div>
        <div>
          <Tag size="md" title="Expiry" type="blue">
            Keph Level : {facility?.kephLevel}
          </Tag>
        </div>
        <div>
              <Tag
                className="some-class"
                size="md"
                title="Status"
                type={getLicenseStatusType(facility?.facilityLicenseStatus ?? '')}
              >
                Facility License Status {facility?.facilityLicenseStatus ?? ''}
              </Tag>
       </div>
       
      </div>
    </>
  );
};
export default FacilityRegistryBanner;
