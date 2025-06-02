import { useEnterMutation } from '@/services/auth/mutations';
import { PostAuthReq } from '@/types/auth/remote';
import { ChangeEventHandler, useState } from 'react';

export const useEnterAction = (chatRommUuid: string, enterData: PostAuthReq) => {
  const { enterMutate } = useEnterMutation(chatRommUuid, enterData);

  const handleEnter = () => {
    enterMutate();
  };

  return { handleEnter };
};

export const useInput = () => {
  const [enter, setEnter] = useState<PostAuthReq>({
    phoneNumber: '',
    username: '',
    language: 'KOREAN',
  });

  const handleEnterChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setEnter({ ...enter, [name]: value });
  };

  return { enter, handleEnterChange };
};
