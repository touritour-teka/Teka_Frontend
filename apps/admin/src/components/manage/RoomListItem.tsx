import { color } from '@teka/design-system';
import styled from 'styled-components';
import CheckBox from '../CheckBox';
import { flex } from '@teka/utils';
import { Text } from '@teka/ui';
import StatusBox from './StatusBox';
import { Status } from '@/types/room/client';
import { formatDate } from '@/utils/formatDate';

interface RoomListItemProps {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  status: Status;
  checked: boolean;
  onChange: () => void;
}

const RoomListItem = ({
  id,
  name,
  startDate,
  endDate,
  maxParticipants,
  checked,
  status,
  onChange,
}: RoomListItemProps) => {
  return (
    <StyledRoomListItem>
      <Wrapper width="31px">
        <CheckBox id={id} checked={checked} onChange={onChange} />
      </Wrapper>
      <Wrapper width="87px">
        <Text fontType="regular12" color={color.gray900}>
          {name}
        </Text>
      </Wrapper>
      <Wrapper width="122px">
        <Text fontType="regular12" color={color.gray900}>
          {formatDate(startDate)}~<br />
          {formatDate(endDate)}
        </Text>
      </Wrapper>
      <Wrapper width="44px">
        <Text fontType="regular12" color={color.gray900}>
          {maxParticipants}명
        </Text>
      </Wrapper>
      <Wrapper>
        {status === 'OPEN' ? (
          <StatusBox
            background={color.blue100}
            border={color.blue800}
            color={color.blue800}
          >
            운영 중
          </StatusBox>
        ) : (
          <StatusBox background={color.red100} border={color.red900} color={color.red900}>
            클로즈
          </StatusBox>
        )}
      </Wrapper>
    </StyledRoomListItem>
  );
};

export default RoomListItem;

const StyledRoomListItem = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  max-width: 400px;
  height: 56px;
  border-bottom: 1px solid ${color.gray100};
  padding: 11px 16px;
`;

const Wrapper = styled.div<{ width?: string }>`
  ${flex({ alignItems: 'center' })}
  width: ${({ width }) => width};
  white-space: pre-line;
`;
