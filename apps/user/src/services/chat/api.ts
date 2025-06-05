import authorization from '@/apis/authorization/authorization';
import { teka, tekaWithFile } from '@/apis/instance/instance';
import { ChatType } from '@/types/chat/client';

export const getChat = async (chatroomUuid: string) => {
  const { data } = await teka.get(`/chat/${chatroomUuid}`, authorization());
  return data;
};

export const getChatRooms = async () => {
  const { data } = await teka.get('/chatrooms/my', authorization());
  return data;
};

export const postChatImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await tekaWithFile.post('/chat/image', formData, authorization());
  const location = response.headers['location'];

  return location;
};

export const postChatMessage = async (
  chatroomUuid: string,
  message: string,
  type: ChatType
) => {
  const { data } = await teka.post(
    `/chat/${chatroomUuid}`,
    { message, type },
    authorization()
  );
  return data;
};
