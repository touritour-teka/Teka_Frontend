import { atomWithStorage } from 'jotai/utils';
import { Enter } from '@/types/user/client';

export const enterAtom = atomWithStorage<Enter>('enter', {
  phoneNumber: '',
  username: '',
  language: 'KOREAN',
});
