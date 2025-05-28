import { useMutation } from '@tanstack/react-query';
import { postChatImage } from './api';
import useApiError from '@/hooks/useApiError';

export const useUploadImageMutation = (image: File) => {
  const { handleError } = useApiError();

  const { mutate: chatRoomOpenMutate, ...restMutation } = useMutation({
    mutationFn: () => postChatImage(image),
    onError: handleError,
  });

  return { chatRoomOpenMutate, ...restMutation };
};
