import { getConfig } from '@openmrs/esm-framework';
import { moduleName } from '../../constants';

export async function getHieBaseUrl() {
  const { hieBaseUrl } = await getConfig(moduleName);
  return hieBaseUrl ?? null;
}
