import authorization from '@/apis/authorization/authorization';
import { teka } from '@/apis/instance/instance';
import { RoomDetail, Status } from '@/types/room/client';
import {
  patchUserTypeReq,
  postRoomReq,
  postUserReq,
  RoomListRes,
} from '@/types/room/remote';

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

export const postChatRoom = async (roomData: postRoomReq) => {
  const { data } = await teka.post('/chatrooms', roomData, authorization());

  return data;
};

export const postUser = async (chatRoomId: number, userData: postUserReq) => {
  const { data } = await teka.post(
    `/chatrooms/${chatRoomId}/users`,
    userData,
    authorization()
  );

  return data;
};

export const deleteUser = async (chatRoomId: number, userId: number[]) => {
  const { data } = await teka.delete(`/chatrooms/${chatRoomId}/users`, {
    data: { userId },
    ...authorization(),
  });

  return data;
};

export const patchUserType = async (chatRoomId: number, userData: patchUserTypeReq) => {
  const { data } = await teka.patch(
    `/chatrooms/${chatRoomId}/users`,
    userData,
    authorization()
  );

  return data;
};
