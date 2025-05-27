import { teka } from '@/apis/instance/instance';
import { PostAuthReq } from '@/types/auth/remote';

export const postAuth = async (
  chatroomUuid: string,
  { phoneNumber, username, language }: PostAuthReq
) => {
  const { data } = await teka.post(`/auth/user/${chatroomUuid}`, {
    phoneNumber,
    username,
    language,
  });

  return data;
};
