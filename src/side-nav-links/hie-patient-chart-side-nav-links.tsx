import React from 'react';
import { ConfigurableLink } from '@openmrs/esm-framework';
import classNames from 'classnames';

interface HiePatientChartSideNavLinks {}

const HiePatientChartSideNavLinks: React.FC<HiePatientChartSideNavLinks> = () => {
  return (
    <>
      <ConfigurableLink to={`./shared-health-records`} className={classNames('cds--side-nav__link', '')}>
        SHR
      </ConfigurableLink>
    </>
  );
};

export default HiePatientChartSideNavLinks;
