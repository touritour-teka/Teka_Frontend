import { KEY } from '@/constants/constant';
import { useQuery } from '@tanstack/react-query';
import { getValidate } from './api';
import { GetValidateReq } from '@/types/admin/remote';

export const useValidateQuery = ({ username }: GetValidateReq) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.VALIDATE, username],
    queryFn: () => getValidate({ username }),
    enabled: false,
  });

  return { data, ...restQuery };
};
