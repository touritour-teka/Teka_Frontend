import CheckBox from '@/components/CheckBox';
import formatPhoneNumber from '@/utils/formatPhonenumber';
import { color } from '@teka/design-system';
import { Column, Text } from '@teka/ui';
import { flex } from '@teka/utils';
import styled from 'styled-components';

interface RoomDetailListItemProps {
  name: string;
  phoneNumber: string;
  id: number;
  checked: boolean;
  onChange: () => void;
}

const RoomDetailListItem = ({
  name,
  phoneNumber,
  id,
  checked,
  onChange,
}: RoomDetailListItemProps) => {
  return (
    <StyledRoomDetailListItem>
      <CheckBox id={id.toString()} checked={checked} onChange={onChange} />
      <Column gap={4}>
        <Text fontType="medi14" color={color.gray900}>
          {name}
        </Text>
        <Text fontType="regular12" color={color.gray400}>
          {formatPhoneNumber(phoneNumber)}
        </Text>
      </Column>
    </StyledRoomDetailListItem>
  );
};

export default RoomDetailListItem;

const StyledRoomDetailListItem = styled.div`
  ${flex({ alignItems: 'center', flexDirection: 'row' })}
  width: 100%;
  max-width: 400px;
  height: 56px;
  gap: 14px;
  border-bottom: 1px solid ${color.gray100};
  padding: 14px 16px;
`;
