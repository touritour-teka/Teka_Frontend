import { useMutation } from '@tanstack/react-query';
import {
  deleteChatRoom,
  deleteUser,
  patchChatRoomClose,
  patchChatRoomOpen,
  patchUserType,
  postChatRoom,
  postUser,
  postMail,
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

  const { postChatRoomMutate, isPending: roomLoading } = usePostChatRoomMutation();
  const {
    postUserMutate,
    isPending: usersLoading,
    isError: usersError,
  } = usePostUserMutation();

  const createRoomWithMembers = () => {
    postChatRoomMutate(roomData, {
      onSuccess: (createdRoom) => {
        const roomId = createdRoom.id;
        setCreatedRoomId(roomId ?? 0);

        postUserMutate(
          { chatRoomId: roomId ?? 0, userData },
          {
            onSuccess: () => {
              navigate(ROUTES.MANAGE);
            },
            onError: () => {
              deleteChatRoom(roomId ?? 0);
            },
          }
        );
      },
      onError: () => {},
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
    onSuccess: () => {
      window.location.reload();
    },
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

export const usePostUserMutation = () => {
  const navigate = useNavigate();

  const { mutate: postUserMutate, ...restMutation } = useMutation({
    mutationFn: ({
      chatRoomId,
      userData,
    }: {
      chatRoomId: number;
      userData: postUserReq;
    }) => postUser(chatRoomId, userData),
    onSuccess: () => {
      navigate(ROUTES.MANAGE);
    },
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

export const usePostMailMutation = (chatRoomId: number) => {
  const { handleError } = useApiError();

  const { mutate: postMailMutate, ...restMutation } = useMutation({
    mutationFn: (userId: number[]) => postMail(chatRoomId, userId),
    onSuccess: () => {
      alert('채팅방 링크가 전송되었습니다.');
    },
    onError: handleError,
  });

  return { postMailMutate, ...restMutation };
};
