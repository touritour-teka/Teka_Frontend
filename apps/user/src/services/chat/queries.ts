import { useQuery } from '@tanstack/react-query';
import { getChat } from './api';

export const useChatQuery = (chatroomUuid: string) => {
  return useQuery({
    queryKey: ['chat', chatroomUuid],
    queryFn: () => getChat(chatroomUuid),
    enabled: !!chatroomUuid, 
  });
};
