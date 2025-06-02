import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postChatImage, postChatMessage } from './api';
import useApiError from '@/hooks/useApiError';
import { Language } from '@/types/room/client';

export const usePostImageMutation = () => {
  const { handleError } = useApiError();

  const {mutate: postImageMutate, ...restMutation} = useMutation({
    mutationFn: (file: File) => postChatImage(file),
    onError: handleError,
  });

  return { postImageMutate, ...restMutation}
};

export const usePostMessageMutation = (chatroomUuid: string) => {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();

  const { mutate: postMessageMutate, ...restMutation } = useMutation({
    mutationFn: ({
      message,
      targetLanguage,
    }: {
      message: string;
      targetLanguage: Language;
    }) => postChatMessage(chatroomUuid, message, targetLanguage),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['chat', chatroomUuid],
      });
    },
    onError: handleError,
  });

  return {
    postMessageMutate,
    ...restMutation,
  };
};
