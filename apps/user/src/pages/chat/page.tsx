import { flex } from '@teka/utils';
import styled from 'styled-components';
import Header from '@/components/common/Header';
import ChatList from '@/components/chat/ChatList/ChatList';
import MessageInput from '@/components/chat/MessageInput/MessageInput';
import { color } from '@teka/design-system';
import { useChatSocket } from '@/services/chat/useChatSocket';
import { useAtomValue } from 'jotai';
import { chatroomUuidAtom } from '@/stores/chat';

const ChatPage = () => {
  const chatroomUuid = useAtomValue(chatroomUuidAtom);
  useChatSocket(chatroomUuid!);

  return (
    <StyledChatPage>
      <Header title="강원 외 8명" hasSetting={true} />
      <ChatList />
      <MessageInput />
    </StyledChatPage>
  );
};

export default ChatPage;

const StyledChatPage = styled.div`
  ${flex({ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' })};
  width: 100%;
  height: 100vh;
  background-color: ${color.gray50};
`;
