import { teka } from '@/apis/instance/instance';

export const getChat = async (chatroomUuid: string) => {
  const { data } = await teka.get(`/chat/${chatroomUuid}`);
  return data;
};

export const postChatMessage = async (
  chatroomUuid: string,
  message: string,
  targetLanguage: string
) => {
  await teka.post(`/chat/${chatroomUuid}`, { message, targetLanguage });
};
