import { type TagType } from '../../types';

export function getTagType(val: number | string | boolean): TagType {
  if (val === 1 || val === '1' || val === true) {
    return 'green';
  } else {
    return 'red';
  }
}
