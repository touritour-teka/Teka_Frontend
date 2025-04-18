import styled from 'styled-components';
import ListHeader from './ListHeader';
import RoomListItem from './RoomListItem';
import { flex } from '@teka/utils';

const RoomList = () => {
  return (
    <StyledRoomList>
      <ListHeader />
      <RoomListItem
        title="상해&항저우"
        period="2025.03.01~03.10"
        night="(9박 10일)"
        personnel={10}
        status="opening"
      />
      <RoomListItem
        title="일본 후쿠시마"
        period="2025.03.05~03.10"
        night="(4박 5일)"
        personnel={10}
        status="closed"
      />
    </StyledRoomList>
  );
};

export default RoomList;

const StyledRoomList = styled.div`
  ${flex({ flexDirection: 'column' })}
`;
