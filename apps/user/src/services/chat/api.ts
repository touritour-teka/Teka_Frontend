import authorization from '@/apis/authorization/authorization';
import { teka } from '@/apis/instance/instance';

export const getChat = async (chatroomUuid: string) => {
  const { data } = await teka.get(`/chat/${chatroomUuid}`, authorization());
  return data;
};

export const postChatImage = async (image: File) => {
  const formData = new FormData();
  formData.append('file', image);

  const { data } = await teka.post('/chat/image', formData);
  return data;
};

export const postChatMessage = async (
  chatroomUuid: string,
  message: string,
  targetLanguage: string
) => {
  await teka.post(`/chat/${chatroomUuid}`, { message, targetLanguage }, authorization());
};
