import { Language } from "../room/client";

export interface PostEnterReq {
  phoneNumber: string;
  username: string;
  language: Language
}
