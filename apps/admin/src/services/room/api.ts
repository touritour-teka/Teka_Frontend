import authorization from '@/apis/authorization/authorization';
import { teka } from '@/apis/instance/instance';
import { RoomDetail, Status } from '@/types/room/client';
import { RoomListRes } from '@/types/room/remote';

export const getChatRoom = async (status: Status) => {
  const { data } = await teka.get<RoomListRes>('/chatrooms', {
    ...authorization(),
    params: { status },
  });

  return data;
};

export const getChatRoomDetail = async (chatRoomId: number) => {
  const { data } = await teka.get<RoomDetail>(
    `/chatrooms/${chatRoomId}`,
    authorization()
  );

  return data;
};

export const patchChatRoomOpen = async (chatRoomId: number) => {
  const { data } = await teka.patch(`/chatrooms/${chatRoomId}/open`, {}, authorization());

  return data;
};

export const patchChatRoomClose = async (chatRoomId: number) => {
  const { data } = await teka.patch(
    `/chatrooms/${chatRoomId}/close`,
    {},
    authorization()
  );

  return data;
};

export const deleteChatRoom = async (chatRoomId: number) => {
  const { data } = await teka.delete(`/chatrooms/${chatRoomId}`, authorization());

  return data;
};
