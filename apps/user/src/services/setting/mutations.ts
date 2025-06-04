import useApiError from '@/hooks/useApiError';
import { patchLanguage } from './api';
import { useMutation } from '@tanstack/react-query';
import { Language } from '@/types/room/client';

export const usePatchLanguageMutation = () => {
  const { handleError } = useApiError();

  const { mutate: patchLanguageMutate, ...restMutation } = useMutation({
    mutationFn: (language: Language) => patchLanguage(language),
    onSuccess: () => {},
    onError: handleError,
  });

  return { patchLanguageMutate, ...restMutation };
};
