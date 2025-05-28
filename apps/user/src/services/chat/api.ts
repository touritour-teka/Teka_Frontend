import { teka } from '@/apis/instance/instance';

export const getChat = async (chatroomUuid: string) => {
  const { data } = await teka.get(`/chat/${chatroomUuid}`);
  return data;
};
