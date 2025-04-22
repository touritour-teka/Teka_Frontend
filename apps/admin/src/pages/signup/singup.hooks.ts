import { useSignupMutation } from '@/services/admin/mutations';
import { useValidateQuery } from '@/services/admin/queries';
import { signupAtom } from '@/stores/signup';
import { Signup } from '@/types/admin/client';
import { useAtom } from 'jotai';
import { ChangeEventHandler } from 'react';

export const useInput = () => {
  const [signup, setSignup] = useAtom(signupAtom);

  const handleSignupChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setSignup({ [name]: value });
  };

  return { signup, handleSignupChange };
};

export const useSingupAction = (signupData: Signup) => {
  const { signupMutate } = useSignupMutation(signupData);

  const handleSignup = () => {
    signupMutate();
  };

  return { handleSignup };
};

export const useVerificationAction = (signupData: Signup) => {
  const { refetch, isSuccess, data, isError } = useValidateQuery({
    username: signupData.username,
  });

  const handleValidate = async () => {
    await refetch();
    if (isSuccess && data?.status === 200) {
      alert('사용 가능한 아이디입니다.');
    } else if (isError || data?.status === 400) {
      alert('중복된 아이디입니다.');
    }
  };

  return { handleValidate, isSuccess, isError };
};
