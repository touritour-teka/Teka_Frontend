import { IconArrowForward } from '@teka/icon';
import { color } from '@teka/design-system';
import styled from 'styled-components';
import { flex } from '@teka/utils';
import { Column, Text } from '@teka/ui';

interface OverlayContentProps {
  address: string;
}

const OverlayContent = ({ address }: OverlayContentProps) => {
  const handleSendLocation = () => {
    const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
  };

  return (
    <StyledOverlayContent>
      <Column gap={8}>
        <Text fontType="medi14">이 위치 보내기</Text>
        <Text fontType="regular12">{address}</Text>
      </Column>
      <div onClick={handleSendLocation}>
        <IconArrowForward width={24} height={24} color={color.gray900} />
      </div>
    </StyledOverlayContent>
  );
};

export default OverlayContent;

const StyledOverlayContent = styled.div`
  ${flex({ justifyContent: 'space-between', alignItems: 'center' })};
  gap: 18px;
`;
