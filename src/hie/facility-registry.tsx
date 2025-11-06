import React, { useEffect, useState } from 'react';
import { openmrsFetch, restBaseUrl, showSnackbar, useSession } from '@openmrs/esm-framework';
import styles from './facility-registry.css';
import { Button, InlineLoading, Select, SelectItem, TextInput } from '@carbon/react';
import { type Location } from '@openmrs/esm-framework/src';
import FacilityDetails from './facility-details/facility-details';
import { type FacilitySearchFilter, type HieFacility } from '../types';
import { fetchFacilityDetails, getErrorResponseMessage } from './hie-resource';

const FacilityRegistry: React.FC = () => {
  const [locations, setLocations] = useState([]);
  const [selectedValue, setSelectedValue] = useState<string>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>(null);
  const [currentFacility, setCurrentFacility] = useState<HieFacility>(null);
  const locationOptions: { value: string; label: string }[] = generateLocationOptions(locations);
  const [loading, setLoading] = useState<boolean>(false);
  const session = useSession();

  useEffect(() => {
    getAmrsLocations();
  }, []);

  const getAmrsLocations = async () => {
    const url = `${restBaseUrl}/location?v=full`;
    const resp = await openmrsFetch(url);
    const data = await resp.json();
    setLocations(data?.results ?? []);
  };

  function generateLocationOptions(locations: Location[]): { value: string; label: string }[] {
    if (!locations || locations.length === 0) return [];

    const l = locations.map((l) => {
      return {
        value: getMflCode(l),
        label: l?.display ?? '',
      };
    });
    return l;
  }

  const getFilterType = (selectedFilter: string) => {
    let filterType = 'facilityCode';
    if (['location', 'facility_code'].includes(selectedFilter)) {
      filterType = 'facilityCode';
    }
    if (selectedFilter === 'registration_number') {
      filterType = 'registrationNumber';
    }

    return filterType;
  };

  function getMflCode(location: Location) {
    const attributes = location.attributes ?? [];
    let mflCodeAttribute;
    if (attributes.length > 0) {
      mflCodeAttribute = attributes.find((a) => {
        return a.attributeType.uuid === 'fe45d489-087c-4b13-b2ec-3b294d7aee32';
      });
    }
    if (mflCodeAttribute) {
      return mflCodeAttribute.value;
    }

    return '';
  }

  const handleFacilityChange = ($event) => {
    setSelectedValue($event.target.value);
  };

  const handleFilterChange = ($event) => {
    setSelectedFilter($event.target.value);
  };

  const handleFacilitySearch = async () => {
    setCurrentFacility(null);
    const payload = generatePayload({
      filterType: selectedFilter,
      value: selectedValue,
    });
    if (!isValidPayload(payload)) {
      return;
    }
    setLoading(true);
    try {
      const data = await fetchFacilityDetails(payload);
      if (data.message) {
        setCurrentFacility(data.message);
      }
    } catch (e) {
      const errMsg = getErrorResponseMessage(e);
      showSnackbar({
        title: 'Error fetching facility',
        subtitle:
          errMsg ?? 'An error occurred while fetching the facility details, please try again or contact support',
        kind: 'error',
      });
    }
    setLoading(false);
  };

  const generatePayload = (data: { filterType: string; value: string }): FacilitySearchFilter => {
    const payload: FacilitySearchFilter = {
      filterType: getFilterType(data.filterType),
      filterValue: data.value,
      locationUuid: session?.sessionLocation?.uuid,
    };

    return payload;
  };

  const isValidPayload = (payload: FacilitySearchFilter): boolean => {
    if (!payload.filterType) {
      showSnackbar({
        title: 'Missing Filter Type',
        subtitle: 'Please select a filter type',
        kind: 'error',
      });
      return false;
    }
    if (!payload.filterValue) {
      showSnackbar({
        title: 'Missing Filter Value',
        subtitle: 'Please select a filter value',
        kind: 'error',
      });
      return false;
    }
    if (!payload.locationUuid) {
      showSnackbar({
        title: 'Missing User Loaction',
        subtitle: 'Please make sure you have set your default facility location',
        kind: 'error',
      });
      return false;
    }
    return true;
  };

  const handleValueChange = ($event) => {
    setSelectedValue($event.target.value);
  };

  return (
    <>
      <div className={styles.facilityRegistryLayout}>
        <h3>Facility Registry</h3>
        <hr className=""></hr>
        <div className={styles.facilityFiltersLayout}>
          <div className={styles.filterItem}>
            <Select id="filter" labelText="Select a Filter" size="md" onChange={handleFilterChange}>
              <SelectItem text="Select Filter" value="" />;
              <SelectItem text="Location" value="location" />
              <SelectItem text="Facility/MFL Code" value="facility_code" />
              <SelectItem text="Registration Number" value="registration_number" />
            </Select>
          </div>

          {selectedFilter === 'location' ? (
            <div className={styles.filterItem}>
              <Select id="facility" labelText="Select a Facility" size="md" onChange={handleFacilityChange}>
                <SelectItem text="Select Facility" value="" />;
                {locationOptions.map((l) => {
                  return <SelectItem text={l.label} value={l.value} />;
                })}
              </Select>
            </div>
          ) : (
            <div className={styles.filterItem}>
              <TextInput id="filter-value" labelText="Value" onChange={handleValueChange} size="md" type="text" />
            </div>
          )}
          <div className={styles.filterItem}>
            <div className={styles.searchBtnContainer}>
              {loading ? (
                <Button onClick={handleFacilitySearch} disabled={true}>
                  <InlineLoading description="Fetching..." />
                </Button>
              ) : (
                <>
                  <Button onClick={handleFacilitySearch}>Search</Button>
                </>
              )}
            </div>
          </div>
        </div>
        <div></div>
        <div className={styles.facilityDetails}>
          <FacilityDetails facility={currentFacility} />
        </div>
      </div>
    </>
  );
};

export default FacilityRegistry;
