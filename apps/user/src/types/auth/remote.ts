import { Language } from '../room/client';

export interface PostAuthReq {
  phoneNumber: string;
  username: string;
  language: Language;
}
