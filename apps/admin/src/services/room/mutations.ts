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
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/constant';
import { useState } from 'react';

export const usePatchRoomOpenMutation = (chatRoomId: number) => {
  const { handleError } = useApiError();

  const { mutate: chatRoomOpenMutate, ...restMutation } = useMutation({
    mutationFn: () => patchChatRoomOpen(chatRoomId),
    onError: handleError,
  });

  return { chatRoomOpenMutate, ...restMutation };
};

export const usePatchRoomCloseMutation = (chatRoomId: number) => {
  const { handleError } = useApiError();

  const { mutate: chatRoomCloseMutate, ...restMutation } = useMutation({
    mutationFn: () => patchChatRoomClose(chatRoomId),
    onError: handleError,
  });

  return { chatRoomCloseMutate, ...restMutation };
};

export const useCreateRoomWithMembers = (
  roomData: postRoomReq,
  userData: postUserReq
) => {
  const navigate = useNavigate();
  const [createdRoomId, setCreatedRoomId] = useState<number>(0);

  const {
    postChatRoomMutate,
    isPending: roomLoading,
  } = usePostChatRoomMutation();

  const {
    postUserMutate,
    isPending: usersLoading,
    isError: usersError,
  } = usePostUserMutation(userData);

  const createRoomWithMembers = () => {
    postChatRoomMutate(roomData, {
      onSuccess: (createdRoom) => {
        const roomId = createdRoom.id;
        setCreatedRoomId(roomId ?? 0);

        postUserMutate(roomId ?? 0, {
          onSuccess: () => {
            navigate(ROUTES.MANAGE);
          },
        });
      },
    });
  };

  return {
    createRoomWithMembers,
    isLoading: roomLoading || usersLoading,
    isError: usersError,
    roomId: createdRoomId,
  };
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

export const usePostChatRoomMutation = () => {
  const { handleError } = useApiError();

  const { mutate: postChatRoomMutate, ...restMutation } = useMutation({
    mutationFn: (roomData: postRoomReq) => postChatRoom(roomData),
    onError: handleError,
  });

  return { postChatRoomMutate, ...restMutation };
};

export const usePostUserMutation = (userData: postUserReq) => {
  const { mutate: postUserMutate, ...restMutation } = useMutation({
    mutationFn: (chatRoomId: number) => postUser(chatRoomId, userData),
  });

  return { postUserMutate, ...restMutation };
};

export const useDeleteUserMutation = (chatRoomId: number, userId: number[]) => {
  const { handleError } = useApiError();

  const { mutate: deleteUserMutate, ...restMutation } = useMutation({
    mutationFn: () => deleteUser(chatRoomId, userId),
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
