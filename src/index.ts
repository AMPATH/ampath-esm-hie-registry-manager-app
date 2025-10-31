import {
  defineConfigSchema,
  getAsyncLifecycle,
  getSyncLifecycle,
  registerBreadcrumbs,
  registerExtension,
  attach, // We need to import the attach function
} from '@openmrs/esm-framework';
import { moduleName } from './constants';
import NavLinkMenu from './hie/nav-link-menu';

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

const options = {
  featureName: 'HIE Registry Manager',
  moduleName,
};

export function startupApp() {
  // Optional configuration schema
  // defineConfigSchema(moduleName, hieRegistrySchema);

  // Optional breadcrumbs (for page titles & navigation)
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

  // STEP 1: Register the extension component itself.
  // Added the required `moduleName` and `meta` properties to satisfy the ExtensionRegistration type.
  registerExtension({
    name: 'hie-nav-menu',
    load: getSyncLifecycle(NavLinkMenu, options),
    moduleName, // Required by ExtensionRegistration type
    meta: {}, // Required by ExtensionRegistration type
    order: 40,
    online: true,
    offline: true,
  });

  // STEP 2: Explicitly attach the registered extension to the desired slot.
  // This is the correct programmatic method when declarative slot registration fails.
  attach('nav-app-menu-slot', 'hie-nav-menu');
}

// ✅ Routes
export const facilityRegistryRoot = getAsyncLifecycle(
  () => import('./hie/facility-registry'),
  options,
);

export const healthWorkerRegistryRoot = getAsyncLifecycle(
  () => import('./hie/health-worker-registry'),
  options,
);

// Optional export for testing or reuse
export const hieNavLink = getSyncLifecycle(NavLinkMenu, options);
