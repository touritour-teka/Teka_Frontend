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
      {[...messages].reverse().map((msg: getMessage, index, arr) => {
        const prev = arr[index - 1];
        const isSameUser = prev?.user.username === msg.user.username;
        const isSameTime = formatToTime(prev?.createdAt) === formatToTime(msg.createdAt);
        const hideMeta = isSameUser && isSameTime;

        return (
          <MessageWrapper key={msg.id} $hideMeta={hideMeta}>
            {msg.user.username === currentUsername ? (
              <OwnMessage
                name={msg.user.username}
                content={msg.message}
                timestamp={formatToTime(msg.createdAt)}
                hideMeta={hideMeta}
              />
            ) : (
              <OtherPersonMessage
                name={msg.user.username}
                content={msg.message}
                translatedContent={msg.translatedMessage}
                timestamp={formatToTime(msg.createdAt)}
                hideMeta={hideMeta}
              />
            )}
          </MessageWrapper>
        );
      })}
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

const MessageWrapper = styled.div<{ $hideMeta: boolean }>`
  margin-top: ${({ $hideMeta }) => ($hideMeta ? '4px' : '16px')};
`;
