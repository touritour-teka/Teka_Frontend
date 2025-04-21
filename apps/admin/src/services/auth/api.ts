import { teka } from '@/apis/instance/instance';
import { PostAuthReq } from '@/types/auth/remote';

export const postAuth = async ({ username, password }: PostAuthReq) => {
  const { data } = await teka.post('/auth', { username, password });

  return data;
};
