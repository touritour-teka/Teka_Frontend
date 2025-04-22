import { Signup } from '@/types/admin/client';
import { atom } from 'jotai';

const baseSignupAtom = atom<Signup>({
  username: '',
  password: '',
  password_confirm: '',
});

export const signupAtom = atom(
  (get) => get(baseSignupAtom),
  (get, set, newSignup: Partial<Signup>) => {
    const prev = get(baseSignupAtom);
    set(baseSignupAtom, {
      ...prev,
      ...newSignup,
    });
  }
);
