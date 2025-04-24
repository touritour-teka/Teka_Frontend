import { KEY } from '@/constants/constant';
import { useQuery } from '@tanstack/react-query';
import { getChatRoom, getChatRoomDetail } from './api';

export const useChatListQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.CHAT_LIST],
    queryFn: () => getChatRoom(null),
  });

  return { data: data?.dataList, ...restQuery };
};

export const useChatDetailQuery = (chatRoomId: number) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.CHAT_DETAIL, chatRoomId],
    queryFn: () => getChatRoomDetail(chatRoomId),
  });

  return { data: data, ...restQuery };
};
