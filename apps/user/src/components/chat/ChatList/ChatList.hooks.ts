import { useParams } from 'react-router-dom';
import { useChatQuery } from '@/services/chat/queries';
import { getMessage } from '@/types/chat/remote';

export const useChatList = () => {
  const { chatroomUuid } = useParams();
  const { data, isLoading } = useChatQuery(chatroomUuid!);

  const messages: getMessage[] = data?.data ?? [];

  return {
    messages,
    isLoading,
  };
};
