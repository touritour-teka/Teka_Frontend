import { ChangeType, RoomDetail, RoomList, User } from './client';

export interface RoomListRes {
  code: string;
  message: string;
  data: RoomList[];
}

export interface getRoomDetailRes {
  data: RoomDetail;
}

export interface postRoomReq {
  name: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
}

export type postUserReq = User[];

export interface patchUserTypeReq {
  data: ChangeType[];
}
