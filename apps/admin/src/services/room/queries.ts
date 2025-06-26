import { KEY } from '@/constants/constant';
import { useQuery } from '@tanstack/react-query';
import { getChatRoom, getChatRoomDetail } from './api';
import { Status } from '@/types/room/client';

export const useChatListQuery = (status: Status) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.CHAT_LIST],
    queryFn: () => getChatRoom(status),
  });

  return { data: data?.data, ...restQuery };
};

export const useChatDetailQuery = (chatRoomId: number | undefined, options = {}) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.CHAT_DETAIL, chatRoomId],
    queryFn: () => {
      if (chatRoomId === undefined) return undefined;
      return getChatRoomDetail(chatRoomId);
    },
    enabled: chatRoomId !== undefined,
    ...options,
  });

  return { data: data, ...restQuery };
};
