import { PostAuthReq } from '@/types/auth/remote';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { postAuth } from './api';
import { AxiosResponse } from 'axios';
import { Storage } from '@/apis/storage/storage';
import { ROUTES, TOKEN } from '@/constants/constant';

export const useEnterMutation = (
  chatRommUuid: string,
  { phoneNumber, username, language }: PostAuthReq
) => {
  const navigate = useNavigate();

  const { mutate: enterMutate, ...restMutation } = useMutation({
    mutationFn: () => postAuth(chatRommUuid, { phoneNumber, username, language }),
    onSuccess: (res: AxiosResponse) => {
      const { accessToken, refreshToken } = res.data;
      Storage.setItem(TOKEN.ACCESS, accessToken);
      Storage.setItem(TOKEN.REFRESH, refreshToken);
      navigate(`${ROUTES.CHAT}/${chatRommUuid}`);
    },
    onError: () => {
      alert('전화번호가 틀렸습니다.');
      localStorage.clear();
    },
  });

  return { enterMutate, ...restMutation };
};
