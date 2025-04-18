import { color } from '@teka/design-system';
import styled from 'styled-components';
import CheckBox from '../CheckBox';
import { flex } from '@teka/utils';
import { Column, Text } from '@teka/ui';
import StatusBox from './StatusBox';
import { Status } from '@/types/manage/client';

interface RoomListItemProps {
  title: string;
  period: string;
  night: string;
  personnel: number;
  status: Status;
}

const RoomListItem = ({ title, period, night, personnel, status }: RoomListItemProps) => {
  return (
    <StyledRoomListItem>
      <Wrapper width="31px">
        <CheckBox checked={false} onChange={() => {}} />
      </Wrapper>
      <Wrapper width="87px">
        <Text fontType="medi12" color={color.gray500}>
          {title}
        </Text>
      </Wrapper>
      <Wrapper width="122px">
        <Column alignItems="flex-start">
          <Text fontType="medi12" color={color.gray500}>
            {period}
          </Text>
          <Text fontType="medi12" color={color.gray500}>
            {night}
          </Text>
        </Column>
      </Wrapper>
      <Wrapper width="44px">
        <Text fontType="medi12" color={color.gray500}>
          {personnel}명
        </Text>
      </Wrapper>
      <Wrapper>
        <Text fontType="medi12" color={color.gray500}>
          {status === 'opening' ? (
            <StatusBox
              background={color.blue100}
              border={color.blue800}
              color={color.blue800}
            >
              운영 중
            </StatusBox>
          ) : (
            <StatusBox
              background={color.red100}
              border={color.red900}
              color={color.red900}
            >
              클로즈
            </StatusBox>
          )}
        </Text>
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
