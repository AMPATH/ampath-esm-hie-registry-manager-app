import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@carbon/react';
import React from 'react';
import { type HieFacility } from '../../types';
import styles from './facility-details.scss';
import { formatDate, parseDate } from '@openmrs/esm-framework';

type FacilityProps = {
  facility: HieFacility;
};
const FacilityDetails: React.FC<FacilityProps> = ({ facility }) => {
  if (!facility) {
    return <>No Facility Details</>;
  }
  return (
    <>
      <div className={styles.facilityDetailsLayout}>
        <div className={styles.headerSection}>
          <h3>Facility Details</h3>
        </div>
        <div className={styles.contentSection}>
          <div className={styles.rowData}>
            <Table>
              <TableHead>
                <TableRow></TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <strong> Official Name </strong>
                  </TableCell>
                  <TableCell>{facility.officialName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong> Keph Level </strong>
                  </TableCell>
                  <TableCell>{facility.kephLevel}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong> FID Code </strong>
                  </TableCell>
                  <TableCell>{facility.fidCode}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong> Registration Number </strong>
                  </TableCell>
                  <TableCell>{facility.registrationNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong> Facility Registry Code </strong>
                  </TableCell>
                  <TableCell>{facility.frCode}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong> Facility Ownership </strong>
                  </TableCell>
                  <TableCell>{facility.facilityOwnership}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong> Facility Type </strong>
                  </TableCell>
                  <TableCell>{facility.facilityType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong> PCN Code </strong>
                  </TableCell>
                  <TableCell>{facility.pcnCode}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong> Is Hub </strong>
                  </TableCell>
                  <TableCell>{facility.isHub ? 'YES' : 'NO'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Facility License Status </strong>
                  </TableCell>
                  <TableCell>{facility.facilityLicenseStatus}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>License Number</strong>
                  </TableCell>
                  <TableCell>{facility.licenseNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>License Start Date</strong>
                  </TableCell>
                  <TableCell>{facility.facilityLicenseStartDate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>License End Date</strong>
                  </TableCell>
                  <TableCell>{facility.facilityLicenseEndDate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Regulatory Body</strong>
                  </TableCell>
                  <TableCell>{facility.regulatoryBody}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>SHA Contract Status</strong>
                  </TableCell>
                  <TableCell>{facility.shaContractStatus}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>SHA Contract Start Date</strong>
                  </TableCell>
                  <TableCell>{facility.shaConstractStartDate}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>SHA Contract End Date</strong>
                  </TableCell>
                  <TableCell>{facility.shaConstractEndDate}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className={styles.rowData}>
            <div>
              <h4>Contact Details</h4>
            </div>
            <Table>
              <TableHead>
                <TableRow></TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <strong> Facility Phone Number </strong>
                  </TableCell>
                  <TableCell>{facility.facilityPhoneNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Facility Email</strong>
                  </TableCell>
                  <TableCell>{facility.facilityEmail}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Facility Administrator Name</strong>
                  </TableCell>
                  <TableCell>{facility.facilityAdministratorName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Facility Administrator Email</strong>
                  </TableCell>
                  <TableCell>{facility.facilityAdministratorEmail}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Facility Administrator Phone</strong>
                  </TableCell>
                  <TableCell>{facility.facilityAdministratorPhone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Facility Administrator Identifier</strong>
                  </TableCell>
                  <TableCell>{facility.facilityAdministratorIdentifier}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Facility Agent</strong>
                  </TableCell>
                  <TableCell>{facility.facilityAgent}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {facility.address ? (
            <>
              <div className={styles.rowData}>
                <div>
                  <h4>Address</h4>
                </div>
                <Table>
                  <TableHead>
                    <TableRow></TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <strong> Country </strong>
                      </TableCell>
                      <TableCell>{facility.address.county}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong> County Code </strong>
                      </TableCell>
                      <TableCell>{facility.address.countyCode}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong> County </strong>
                      </TableCell>
                      <TableCell>{facility.address.county}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong> Sub County Code </strong>
                      </TableCell>
                      <TableCell>{facility.address.subCountyCode}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong> Sub County</strong>
                      </TableCell>
                      <TableCell>{facility.address.subCounty}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong> Ward</strong>
                      </TableCell>
                      <TableCell>{facility.address.ward}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Postal Address</strong>
                      </TableCell>
                      <TableCell>{facility.address.postalAddress}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Physical Location</strong>
                      </TableCell>
                      <TableCell>{facility.address.physicalLocation}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Road/Street</strong>
                      </TableCell>
                      <TableCell>{facility.address.roadStreet}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Plot Number</strong>
                      </TableCell>
                      <TableCell>{facility.address.plotNumber}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Prominent Landmark</strong>
                      </TableCell>
                      <TableCell>{facility.address.prominentLandmark}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Town</strong>
                      </TableCell>
                      <TableCell>{facility.address.town}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Constituency</strong>
                      </TableCell>
                      <TableCell>{facility.address.constituency}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Latitude</strong>
                      </TableCell>
                      <TableCell>{facility.address.latitude}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Longitude</strong>
                      </TableCell>
                      <TableCell>{facility.address.longitude}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </>
          ) : (
            <></>
          )}

          {facility.bedOccupancy ? (
            <>
              <div className={styles.rowData}>
                <div>
                  <h4>Bed Occupacy</h4>
                </div>
                <Table aria-label="sample table" size="lg">
                  <TableHead>
                    <TableRow></TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <strong> Total Beds </strong>
                      </TableCell>
                      <TableCell>{facility.bedOccupancy.totalBeds}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong> Normal Beds </strong>
                      </TableCell>
                      <TableCell>{facility.bedOccupancy.normalBeds}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong> ICU Beds </strong>
                      </TableCell>
                      <TableCell>{facility.bedOccupancy.icuBeds}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong> HDU Beds </strong>
                      </TableCell>
                      <TableCell>{facility.bedOccupancy.hduBeds}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong> Dialysis Beds </strong>
                      </TableCell>
                      <TableCell>{facility.bedOccupancy.dialysisBeds}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong> Number Of Cots </strong>
                      </TableCell>
                      <TableCell>{facility.bedOccupancy.numberOfCots}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </>
          ) : (
            <></>
          )}

          {facility.regulatoryOperationalStatus ? (
            <>
              <div className={styles.rowData}>
                <div>
                  <h4>Regulatory Operational Status</h4>
                </div>
                <Table aria-label="sample table" size="lg">
                  <TableHead>
                    <TableRow></TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <strong> Operational Status </strong>
                      </TableCell>
                      <TableCell>{facility.regulatoryOperationalStatus.operationalStatus}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Operational Status Reason </strong>
                      </TableCell>
                      <TableCell>{facility.regulatoryOperationalStatus.operationalStatusReason}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Suspension Reason</strong>
                      </TableCell>
                      <TableCell>{facility.regulatoryOperationalStatus.suspensionReason}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Suspension Date</strong>
                      </TableCell>
                      <TableCell>{facility.regulatoryOperationalStatus.suspensionDate}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Reinstatement Recommendations</strong>
                      </TableCell>
                      <TableCell>{facility.regulatoryOperationalStatus.reinstatementRecommendations}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Earliest Reinstatement Date</strong>
                      </TableCell>
                      <TableCell>{facility.regulatoryOperationalStatus.earliestReinstatementDate}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Reinstatement Date</strong>
                      </TableCell>
                      <TableCell>{facility.regulatoryOperationalStatus.reinstatementDate}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </>
          ) : (
            <></>
          )}

          {facility.SHAOperationStatus ? (
            <>
              <div className={styles.rowData}>
                <div>
                  <h4>SHA Operation Status</h4>
                </div>
                <Table aria-label="sample table" size="lg">
                  <TableHead>
                    <TableRow></TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <strong> Operational Status </strong>
                      </TableCell>
                      <TableCell>{facility.SHAOperationStatus.operationalStatus}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Operational Status Reason </strong>
                      </TableCell>
                      <TableCell>{facility.SHAOperationStatus.operationalStatusReason}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Suspension Reason</strong>
                      </TableCell>
                      <TableCell>{facility.SHAOperationStatus.suspensionReason}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Suspension Date</strong>
                      </TableCell>
                      <TableCell>{facility.SHAOperationStatus.suspensionDate}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Reinstatement Recommendations</strong>
                      </TableCell>
                      <TableCell>{facility.SHAOperationStatus.reinstatementRecommendations}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Earliest Reinstatement Date</strong>
                      </TableCell>
                      <TableCell>{facility.SHAOperationStatus.earliestReinstatementDate}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Reinstatement Date</strong>
                      </TableCell>
                      <TableCell>{facility.SHAOperationStatus.reinstatementDate}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </>
          ) : (
            <></>
          )}

          {facility.approvedServices && facility.approvedServices.length > 0 ? (
            <>
              <div className={styles.rowData}>
                <div>
                  <h4>Approved Services</h4>
                </div>

                 <Table>
                              <TableHead>
                                <TableRow>
                                <TableCell>Code</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Effective Start</TableCell>
                                <TableCell>Effective End</TableCell>
                                </TableRow>
                              </TableHead>
                      <TableBody>
                
                    {facility.approvedServices.map((as) => {
                      return (
                      
                           
                                <TableRow>
                                  <TableCell>{as.serviceCode}</TableCell>
                                  <TableCell>{as.serviceName}</TableCell>
                                  <TableCell>{as.serviceStatus}</TableCell>
                                  <TableCell>{formatDate(parseDate(as.effectiveStart))}</TableCell>
                                  <TableCell>{as.effectiveEnd ? formatDate(parseDate(as.effectiveEnd)) : ''}</TableCell>
                                </TableRow>
                            
                        
                      );
                    })}

                      </TableBody>
                            </Table>
                
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
export default FacilityDetails;
