import { useMutation } from '@tanstack/react-query';
import { postChatImage, postChatMessage } from './api';
import useApiError from '@/hooks/useApiError';

export const useUploadImageMutation = () => {
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: (file: File) => postChatImage(file),
    onError: handleError,
  });
};

export const useSendMessageMutation = (chatroomUuid: string) => {
  const { handleError } = useApiError();

  return useMutation({
    mutationFn: ({
      message,
      targetLanguage,
    }: {
      message: string;
      targetLanguage: string;
    }) => postChatMessage(chatroomUuid, message, targetLanguage),
    onError: handleError,
  });
};
