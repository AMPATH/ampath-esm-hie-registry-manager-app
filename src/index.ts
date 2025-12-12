import {
  defineConfigSchema,
  getAsyncLifecycle,
  getSyncLifecycle,
  registerBreadcrumbs,
  registerExtension,
  attach,
} from '@openmrs/esm-framework';
import { moduleName } from './constants';
import NavLinkMenu from './hie/nav-link-menu';
import { createDashboardLink } from '@openmrs/esm-patient-common-lib';
import { patientChartShrdMetaData } from './dashboard.meta';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const options = {
  featureName: 'HIE Registry Manager',
  moduleName,
};

export function startupApp() {
  registerBreadcrumbs([
    {
      path: `${window.spaBase}/hie/facilities`,
      title: () =>
        Promise.resolve(
          window.i18next.t('hie.facilities', {
            defaultValue: 'Facility Registry',
            ns: moduleName,
          }),
        ),
      parent: `${window.spaBase}/home`,
    },
    {
      path: `${window.spaBase}/hie/health-workers`,
      title: () =>
        Promise.resolve(
          window.i18next.t('hie.healthWorkers', {
            defaultValue: 'Health Worker Registry',
            ns: moduleName,
          }),
        ),
      parent: `${window.spaBase}/home`,
    },
  ]);

  registerExtension({
    name: 'hie-nav-menu',
    load: getSyncLifecycle(NavLinkMenu, options),
    moduleName,
    meta: {},
    order: 40,
    online: true,
    offline: true,
  });

  attach('nav-app-menu-slot', 'hie-nav-menu');
}

export const facilityRegistryRoot = getAsyncLifecycle(() => import('./hie/facility-registry'), options);

export const healthWorkerRegistryRoot = getAsyncLifecycle(() => import('./hie/health-worker-registry'), options);

export const hieNavLink = getSyncLifecycle(NavLinkMenu, options);
export const shrDetails = getAsyncLifecycle(() => import('./hie/shr/shr-details/shr-details.component'), options);

export const patientChartLinks = getAsyncLifecycle(() => import('./side-nav-links/hie-patient-chart-side-nav-links'), {
  featureName: 'hie-patient-chart-side-nav-links',
  moduleName,
});

export const shrDashboardLink =
  getSyncLifecycle(
    createDashboardLink({
      ...patientChartShrdMetaData,
    }),
    { featureName: 'shr', moduleName },
  );
