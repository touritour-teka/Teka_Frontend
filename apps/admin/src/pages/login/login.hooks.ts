import { ROUTES } from '@/constants/constant';
import { useLoginMutate } from '@/services/auth/mutations';
import { PostAuthReq } from '@/types/auth/remote';
import { ChangeEventHandler, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLoginAction = (loginData: PostAuthReq) => {
  const { loginMutate } = useLoginMutate(loginData);

  const handleLogin = () => {
    loginMutate();
  };

  return { handleLogin };
};

export const useInput = () => {
  const [login, setLogin] = useState<PostAuthReq>({
    username: '',
    password: '',
  });

  const handleLoginChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  return { login, handleLoginChange };
};

export const useCTAButton = () => {
  const navigate = useNavigate();

  const handleMoveSignup = () => {
    navigate(ROUTES.SIGNUP);
  };

  return { handleMoveSignup };
};
