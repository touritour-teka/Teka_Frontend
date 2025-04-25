import { useMutation } from '@tanstack/react-query';
import {
  deleteChatRoom,
  deleteUser,
  patchChatRoomClose,
  patchChatRoomOpen,
  patchUserType,
  postChatRoom,
  postUser,
} from './api';
import useApiError from '@/hooks/useApiError';
import { patchUserTypeReq, postRoomReq, postUserReq } from '@/types/room/remote';

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

export const usePostChatRoomMutation = (roomData: postRoomReq) => {
  const { handleError } = useApiError();

  const { mutate: postChatRoomMutate, ...restMutation } = useMutation({
    mutationFn: () => postChatRoom(roomData),
    onSuccess: () => {},
    onError: handleError,
  });

  return { postChatRoomMutate, ...restMutation };
};

export const usePostUserMutation = (chatRoomId: number, userData: postUserReq) => {
  const { handleError } = useApiError();

  const { mutate: postUserMutate, ...restMutation } = useMutation({
    mutationFn: () => postUser(chatRoomId, userData),
    onSuccess: () => {},
    onError: handleError,
  });

  return { postUserMutate, ...restMutation };
};

export const useDeleteUserMutation = (chatRoomId: number, userId: number[]) => {
  const { handleError } = useApiError();

  const { mutate: deleteUserMutate, ...restMutation } = useMutation({
    mutationFn: () => deleteUser(chatRoomId, userId),
    onSuccess: () => {},
    onError: handleError,
  });

  return { deleteUserMutate, ...restMutation };
};

export const usePatchUserTypeMutation = (
  chatRoomId: number,
  userData: patchUserTypeReq
) => {
  const { handleError } = useApiError();

  const { mutate: patchUserTypeMutate, ...restMutation } = useMutation({
    mutationFn: () => patchUserType(chatRoomId, userData),
    onSuccess: () => {},
    onError: handleError,
  });

  return { patchUserTypeMutate, ...restMutation };
};
