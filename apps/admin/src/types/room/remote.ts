import { RoomDetail, RoomList } from './client';

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
