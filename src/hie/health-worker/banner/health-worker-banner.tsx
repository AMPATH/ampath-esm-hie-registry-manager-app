import React, { useEffect, useState } from 'react';
import { useSession } from '@openmrs/esm-framework';
import { getProviderByUuid } from '../../../shared/provider.resource';
import { searchPractitioner } from '../../hie-resource';
import { type TagType, type PractitionerMessage, type PractitionerSearchParams } from '../../../types';
import styles from './health-worker-banner.scss';
import { Button, Tag } from '@carbon/react';
import HealthWorkerModal from '../modal/health-worker-details.modal';
import { getTagType } from '../../../shared/utils/get-tag-type';
interface HealthWorkerBannerProps {}
const HealthWorkerBanner: React.FC<HealthWorkerBannerProps> = () => {
  const [practitioner, setPractitioner] = useState<PractitionerMessage>();
  const [displayDetailsModal, setDisplayDetailsModal] = useState<boolean>();
  const session = useSession();
  const locationUuid = session.sessionLocation.uuid;

  useEffect(() => {
    getProviderDetails();
  }, []);

  async function getProviderDetails() {
    const providerUuid = session.currentProvider.uuid;
    const provider = await getProviderByUuid(providerUuid);
    const { nationalId, licenseNo } = getProviderAttributes(provider);
    const searchParams: PractitionerSearchParams = {};
    if (nationalId) {
      searchParams['nationalId'] = nationalId.value;
    } else if (licenseNo) {
      searchParams['licenseNumber'] = licenseNo.value;
    }
    if (nationalId || licenseNo) {
      const practitioner = await searchPractitioner(searchParams, locationUuid);
      setPractitioner(practitioner);
    }
  }
  function getProviderAttributes(provider) {
    const attributes = provider.attributes;
    const nationalId = attributes.find((attr) => {
      return attr.attributeType.display.trim().toLowerCase().includes('National Id'.toLowerCase().trim());
    });
    const licenseNo = attributes.find((attr) => {
      return attr.attributeType.display.trim().toLowerCase().includes('Licence Number'.toLowerCase().trim());
    });
    return {
      nationalId: nationalId,
      licenseNo: licenseNo,
    };
  }
  function getPractionerStatusType(status: string): TagType {
    if (status === 'Licensed') {
      return 'green';
    } else {
      return 'red';
    }
  }
  function onModalClose() {
    setDisplayDetailsModal(false);
  }
  function showDetailsModal() {
    setDisplayDetailsModal(true);
  }
  if (!practitioner) {
    return <></>;
  }
  return (
    <>
      <div className={styles.hwBannerLayout}>
        <div>
          <Tag className="some-class" size="md" title="Expiry" type="blue">
            Registration ID: {practitioner.membership.registration_id}
          </Tag>
        </div>
        <div>
          <Tag
            className="some-class"
            size="md"
            title="Status"
            type={getPractionerStatusType(practitioner.membership.status)}
          >
            {practitioner.membership.status}
          </Tag>
        </div>
        <div>
          <Tag className="some-class" size="md" title="Active" type={getTagType(practitioner.membership.is_active)}>
            {practitioner.membership.is_active ? 'Active' : 'Not Active'}
          </Tag>
        </div>
        <div>
          <Tag className="some-class" size="md" title="Expiry" type="gray">
            License Expiry in {practitioner.membership.license_expires_in_days} days
          </Tag>
        </div>
        <div>
          <Button size="sm" kind="tertiary" onClick={showDetailsModal}>
            View
          </Button>
        </div>
        {practitioner && displayDetailsModal ? (
          <>
            <HealthWorkerModal
              isModalOpen={displayDetailsModal}
              onRequestClose={onModalClose}
              selectedPractitioner={practitioner}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default HealthWorkerBanner;
