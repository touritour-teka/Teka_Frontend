import { useMutation } from '@tanstack/react-query';
import { deleteChatRoom, patchChatRoomClose, patchChatRoomOpen } from './api';
import useApiError from '@/hooks/useApiError';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/constant';

export const usePatchRoomOpenMutation = (chatRoomId: number) => {
  const { handleError } = useApiError();

  const { mutate: chatRoomOpenMutate, ...restMutation } = useMutation({
    mutationFn: () => patchChatRoomOpen(chatRoomId),
    onSuccess: () => {},
    onError: handleError,
  });

  return { chatRoomOpenMutate, ...restMutation };
};

export const usePatchRoomCloseMutation = (chatRoomId: number) => {
  const { handleError } = useApiError();

  const { mutate: chatRoomCloseMutate, ...restMutation } = useMutation({
    mutationFn: () => patchChatRoomClose(chatRoomId),
    onSuccess: () => {},
    onError: handleError,
  });

  return { chatRoomCloseMutate, ...restMutation };
};

export const useDeleteChatRoomMutation = () => {
  const { handleError } = useApiError();

  const { mutate: deleteChatRoomMutate, ...restMutation } = useMutation({
    mutationFn: (chatRoomId: number) => deleteChatRoom(chatRoomId),
    onSuccess: () => {},
    onError: handleError,
  });

  return { deleteChatRoomMutate, ...restMutation };
};
