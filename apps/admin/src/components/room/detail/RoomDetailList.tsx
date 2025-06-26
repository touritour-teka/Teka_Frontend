import styled from 'styled-components';
import RoomDetailListItem from './RoomDetailListItem';
import { color } from '@teka/design-system';
import { RoomDetail } from '@/types/room/client';

interface RoomDetailListProps {
  room: RoomDetail;
  checked: string[];
  onChange: (id: string) => void;
}

const RoomDetailList = ({ room, checked, onChange }: RoomDetailListProps) => {
  if (!room.data.userList) return null;

  return (
    <StyledRoomDetailList>
      {room.data.userList.map((prop) => (
        <RoomDetailListItem
          id={prop.id}
          checked={checked.includes(prop.id.toString())}
          onChange={() => onChange(prop.id.toString())}
          name={prop.username}
          phoneNumber={prop.phoneNumber}
        />
      ))}
    </StyledRoomDetailList>
  );
};

export default RoomDetailList;

const StyledRoomDetailList = styled.div`
  width: 100%;
  border-top: 1px solid ${color.gray100};
`;
