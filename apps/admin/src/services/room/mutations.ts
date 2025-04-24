import { useMutation } from '@tanstack/react-query';
import { deleteChatRoom, patchChatRoomClose, patchChatRoomOpen } from './api';
import useApiError from '@/hooks/useApiError';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/constant';

export const usePatchRoomOpenMutation = (chatRoomId: number) => {
  const { handleError } = useApiError();
  const navigate = useNavigate();

  const { mutate: chatRoomOpenMutate, ...restMutation } = useMutation({
    mutationFn: () => patchChatRoomOpen(chatRoomId),
    onSuccess: () => {
      navigate(ROUTES.MANAGE);
    },
    onError: handleError,
  });

  return { chatRoomOpenMutate, ...restMutation };
};

export const usePatchRoomCloseMutation = (chatRoomId: number) => {
  const { handleError } = useApiError();
  const navigate = useNavigate();

  const { mutate: chatRoomCloseMutate, ...restMutation } = useMutation({
    mutationFn: () => patchChatRoomClose(chatRoomId),
    onSuccess: () => {
      navigate(ROUTES.MANAGE);
    },
    onError: handleError,
  });

  return { chatRoomCloseMutate, ...restMutation };
};

export const useDeleteChatRoomMutation = (chatRoomId: number) => {
  const { handleError } = useApiError();
  const navigate = useNavigate();

  const { mutate: deleteChatRoomMutate, ...restMutation } = useMutation({
    mutationFn: () => deleteChatRoom(chatRoomId),
    onSuccess: () => {
      navigate(ROUTES.MANAGE);
    },
    onError: handleError,
  });

  return { deleteChatRoom, ...restMutation };
};
