import { teka } from '@/apis/instance/instance';
import { GetValidateReq, PostSignupReq } from '@/types/admin/remote';

export const postSignup = async ({ username, password }: PostSignupReq) => {
  const { data } = await teka.post('/admins', { username, password });

  return data;
};

export const getValidate = async (username: GetValidateReq) => {
  const { data } = await teka.get('/admins/validate', {
    params: username,
  });

  return data;
};
