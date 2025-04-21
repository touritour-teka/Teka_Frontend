import { flex } from '@teka/utils';
import styled from 'styled-components';
import OwnMessage from './OwnMessage';
import OtherPersonMessage from './OtherPersonMessage';
import DateDivider from './DateDivider';
import { color } from '@teka/design-system';

const ChatList = () => {
  const nowDate = new Date();
  const formattedDate = nowDate.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
  });

  return (
    <StyledChatList>
      <DateDivider date={formattedDate} />
      <OwnMessage
        name="강원"
        content="저 여기 잇어요 https://maps.app.goo.gl/SDrqKdjzkVuogo9F9"
        timestamp="오후 12:40"
      />
      <OtherPersonMessage
        name="Nicholas"
        content="안녕하세요 저는 왕이상입니다."
        translatedContent="你好 我是奕翔"
        timestamp="오후 12:40"
        prevTimestamp="오후 6:00"
      />
      <OtherPersonMessage
        name="Nicholas"
        content="삶은 항해와 같아서, 풍랑에 용감하게 맞서야 그 평화로운 바다를 찾을 수 있어."
        translatedContent="人生就像一场航行，你必须勇敢面对风暴才能找到那片平静的大海。"
        timestamp="오후 12:40"
        prevTimestamp="오후 12:40"
      />
      <OwnMessage
        name="강원"
        content="만나서 반갑습니다. 잘 부탁드립니다"
        timestamp="오후 12:40"
      />
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
