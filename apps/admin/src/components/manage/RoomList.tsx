import styled from 'styled-components';
import ListHeader from './ListHeader';
import RoomListItem from './RoomListItem';
import { flex } from '@teka/utils';
import { Status } from '@/types/room/client';

interface RoomListProps {
  rooms: Array<{
    chatRoomId: number;
    name: string;
    startDate: string;
    endDate: string;
    maxParticipants: number;
    status: Status;
  }>;
  headerChecked: boolean;
  itemChecked: string[];
  headerChange: () => void;
  itemChange: (id: string) => void;
  disabledItems?: string[];
}

const RoomList = ({
  rooms,
  itemChecked,
  headerChecked,
  headerChange,
  itemChange,
  disabledItems,
}: RoomListProps) => {
  return (
    <StyledRoomList>
      <ListHeader id="all" checked={headerChecked} onChange={headerChange} />
      {rooms.map((room) => {
        const id = room.chatRoomId.toString();
        const isDisabled = disabledItems?.includes(id) ?? false;
        return (
          <RoomListItem
            key={id}
            id={id}
            name={room.name}
            startDate={room.startDate}
            endDate={room.endDate}
            maxParticipants={room.maxParticipants}
            status={room.status}
            checked={itemChecked.includes(id)}
            onChange={() => itemChange(id)}
            disabled={isDisabled}
          />
        );
      })}
    </StyledRoomList>
  );
};

export default RoomList;

const StyledRoomList = styled.div`
  ${flex({ flexDirection: 'column' })}
`;
