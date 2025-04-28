import { ChangeType, RoomDetail, RoomList, User } from './client';

export interface RoomListRes {
  dataList: RoomList[];
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

export interface postUserReq {
  data: User[];
}

export interface patchUserTypeReq {
  data: ChangeType[];
}
