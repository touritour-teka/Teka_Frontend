import { PostAuthReq } from '@/types/auth/remote';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { postAuth } from './api';
import { AxiosResponse } from 'axios';
import { Storage } from '@/apis/storage/storage';
import { ROUTES, TOKEN } from '@/constants/constant';
import useApiError from '@/hooks/useApiError';

export const useEnterMutation = (
  chatRommUuid: string,
  { phoneNumber, username, language }: PostAuthReq
) => {
  const navigate = useNavigate();
  const { handleError } = useApiError();

  const { mutate: enterMutate, ...restMutation } = useMutation({
    mutationFn: () => postAuth(chatRommUuid, { phoneNumber, username, language }),
    onSuccess: (res: AxiosResponse) => {
      const { accessToken, refreshToken } = res.data;
      Storage.setItem(TOKEN.ACCESS, accessToken);
      Storage.setItem(TOKEN.REFRESH, refreshToken);
      navigate(`${ROUTES.CHAT}/${chatRommUuid}`);
    },
    onError: handleError,
  });

  return { enterMutate, ...restMutation };
};
