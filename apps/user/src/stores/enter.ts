import { Enter } from '@/types/user/client';
import { atom } from 'jotai';

const baseEnterAtom = atom<Enter>({
  phoneNumber: '',
  username: '',
  language: 'KOREAN',
});

export const enterAtom = atom(
  (get) => get(baseEnterAtom),
  (get, set, newSignup: Partial<Enter>) => {
    const prev = get(baseEnterAtom);
    set(baseEnterAtom, {
      ...prev,
      ...newSignup,
    });
  }
);
