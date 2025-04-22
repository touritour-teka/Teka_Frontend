import { PostAuthReq } from '@/types/auth/remote';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { postAuth } from './api';
import { AxiosResponse } from 'axios';
import { Storage } from '@/apis/storage/storage';
import { ROUTES, TOKEN } from '@/constants/constant';

export const useLoginMutate = ({ username, password }: PostAuthReq) => {
  const navigate = useNavigate();

  const { mutate: loginMutate, ...restMutation } = useMutation({
    mutationFn: () => postAuth({ username, password }),
    onSuccess: (res: AxiosResponse) => {
      const { accessToken, refreshToken } = res.data;
      Storage.setItem(TOKEN.ACCESS, accessToken);
      Storage.setItem(TOKEN.REFRESH, refreshToken);
      navigate(ROUTES.MANAGE);
    },
    onError: () => {
      alert('아이디또는 비밀번호가 틀렸습니다.');
      localStorage.clear();
    },
  });

  return { loginMutate, ...restMutation };
};
