import { color } from '@teka/design-system';
import styled from 'styled-components';
import CheckBox from '../CheckBox';
import { flex } from '@teka/utils';
import { ChangeEvent } from 'react';

interface RoomListItemProps {
  id: string;
  phoneValue: string;
  phoneChange: (e: ChangeEvent<HTMLInputElement>) => void;
  phonePlaceholder: string;
  mailValue: string;
  mailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  mailPlaceholder: string;
  checked: boolean;
  onChange: () => void;
  userChecked: boolean;
  userChange: () => void;
  observerChecked: boolean;
  observerChange: () => void;
}

const RoomListItem = ({
  id,
  phoneValue,
  phoneChange,
  phonePlaceholder,
  mailValue,
  mailChange,
  mailPlaceholder,
  checked,
  onChange,
  userChecked,
  userChange,
  observerChecked,
  observerChange,
}: RoomListItemProps) => {
  return (
    <StyledRoomListItem id={id}>
      <Wrapper width="31px">
        <CheckBox checked={checked} onChange={onChange} />
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
        <CheckBox id="USER" checked={userChecked} onChange={userChange} />
      </Wrapper>
      <Wrapper>
        <CheckBox id="OBSERVER" checked={observerChecked} onChange={observerChange} />
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
