export interface PostSignupReq {
  username: string;
  password: string;
}

export type GetValidateReq = Omit<PostSignupReq, 'password'>;
