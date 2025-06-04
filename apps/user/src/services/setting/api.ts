import authorization from '@/apis/authorization/authorization';
import { teka } from '@/apis/instance/instance';
import { Language } from '@/types/room/client';

export const patchLanguage = async (language: Language) => {
  const { data } = await teka.patch('/users', { language }, authorization());
  return data;
};
