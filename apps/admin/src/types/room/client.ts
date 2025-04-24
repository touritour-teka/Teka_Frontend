export type Status = 'OPEN' | 'CLOSED' | null;

export type Language = 'KOREAN' | 'ENGLISH' | 'CHINESE';

export type UserType = 'USER' | 'OBSERVER';

export interface RoomList {
  chatRoomId: number;
  name: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  status: Status;
}

export interface RoomDetail {
  chatRoomId: number;
  name: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  status: Status;
  userList: UserList[];
}

export interface UserList {
  id: number;
  username: string;
  phoneNumber: string;
  email: string;
  language: Language;
  type: UserType;
}
