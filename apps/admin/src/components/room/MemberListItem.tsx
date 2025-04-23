import { color } from '@teka/design-system';
import styled from 'styled-components';
import CheckBox from '../CheckBox';
import { flex } from '@teka/utils';

interface RoomListItemProps {
  phoneValue: string;
  phoneChange: () => void;
  phonePlaceholder: string;
  mailValue: string;
  mailChange: () => void;
  mailPlaceholder: string;
}

const RoomListItem = ({
  phoneValue,
  phoneChange,
  phonePlaceholder,
  mailValue,
  mailChange,
  mailPlaceholder,
}: RoomListItemProps) => {
  return (
    <StyledRoomListItem>
      <Wrapper width="31px">
        <CheckBox checked={false} onChange={() => {}} />
      </Wrapper>
      <Wrapper width="106px">
        <StyledInput
          value={phoneValue}
          onChange={phoneChange}
          placeholder={phonePlaceholder}
        />
      </Wrapper>
      <Wrapper width="131px">
        <StyledInput
          value={mailValue}
          onChange={mailChange}
          placeholder={mailPlaceholder}
        />
      </Wrapper>
      <Wrapper width="46px">
        <CheckBox checked={false} onChange={() => {}} />
      </Wrapper>
      <Wrapper>
        <CheckBox checked={false} onChange={() => {}} />
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

const StyledInput = styled.input`
  width: 100%;
  font-size: 12px;

  &:focus {
    border-color: ${color.blue800};
    outline: none;
  }
`;
