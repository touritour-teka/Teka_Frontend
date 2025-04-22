import { PostSignupReq } from '@/types/admin/remote';
import { useMutation } from '@tanstack/react-query';
import { postSignup } from './api';
import useApiError from '@/hooks/useApiError';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/constant';

export const useSignupMutation = ({ username, password }: PostSignupReq) => {
  const { handleError } = useApiError();
  const navigate = useNavigate();

  const { mutate: signupMutate, ...restMutation } = useMutation({
    mutationFn: () => postSignup({ username, password }),
    onSuccess: () => {
      alert('회원가입 성공');
      navigate(ROUTES.LOGIN);
    },
    onError: handleError,
  });

  return { signupMutate, ...restMutation };
};
