import { useQuery } from '@tanstack/react-query';
import { getChat, getChatRooms } from './api';

export const useChatQuery = (chatroomUuid: string) => {
  return useQuery({
    queryKey: ['chat', chatroomUuid],
    queryFn: () => getChat(chatroomUuid),
    enabled: !!chatroomUuid, 
  });
};

export const useChatRoomsQuery = () => {
  return useQuery({
    queryKey: ['chatRooms'],
    queryFn: () => getChatRooms(),
  });
}