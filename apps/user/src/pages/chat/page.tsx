import { flex } from '@teka/utils';
import styled from 'styled-components';
import Header from '@/components/common/Header';
import ChatList from '@/components/chat/ChatList';
import MessageInput from '@/components/chat/MessageInput';
import { color } from '@teka/design-system';

const ChatPage = () => {
  return (
    <StyledChatPage>
      <Header />
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
