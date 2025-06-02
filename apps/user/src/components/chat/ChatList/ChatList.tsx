import { useEffect, useRef } from 'react';
import { getMessage } from '@/types/chat/remote';
import { formatToTime } from '@/utils/index';
import OwnMessage from '../Message/OwnMessage';
import OtherPersonMessage from '../Message/OtherPersonMessage';
import DateDivider from '../DateDivider/DateDivider';
import styled from 'styled-components';
import { flex } from '@teka/utils';
import { color } from '@teka/design-system';
import { useChatList } from './ChatList.hooks';
import { useAtomValue } from 'jotai';
import { enterAtom } from '@/stores/enter';

const ChatList = () => {
  const { messages, isLoading } = useChatList();
  const { username: currentUsername } = useAtomValue(enterAtom);

  const nowDate = new Date();
  const formattedDate = nowDate.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [messages]);

  if (isLoading) {
    return (
      <div
        style={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        로딩중...
      </div>
    );
  }

  return (
    <StyledChatList>
      <DateDivider date={formattedDate} />
      {[...messages]
        .reverse()
        .map((msg: getMessage) =>
          msg.sender.username === currentUsername ? (
            <OwnMessage
              key={msg.id}
              name={msg.sender.username}
              content={msg.message}
              timestamp={formatToTime(msg.createdAt)}
            />
          ) : (
            <OtherPersonMessage
              key={msg.id}
              name={msg.sender.username}
              content={msg.message}
              translatedContent={msg.translatedMessage}
              timestamp={formatToTime(msg.createdAt)}
            />
          )
        )}
      <div ref={scrollRef} />
    </StyledChatList>
  );
};

export default ChatList;

const StyledChatList = styled.div`
  ${flex({ flexDirection: 'column' })};
  width: 100%;
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  background: ${color.gray50};
`;
