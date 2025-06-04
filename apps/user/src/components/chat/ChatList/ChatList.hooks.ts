import { useParams } from 'react-router-dom';
import { useChatQuery } from '@/services/chat/queries';
import { getMessage } from '@/types/chat/remote';
import { useAtomValue } from 'jotai';
import { chatroomUuidAtom } from '@/stores/chat';

export const useChatList = () => {
  const chatroomUuid = useAtomValue(chatroomUuidAtom);
  const { data, isLoading } = useChatQuery(chatroomUuid!);

  const messages: getMessage[] = data?.data ?? [];

  return {
    messages,
    isLoading,
  };
};
