import { IconArrowForward } from '@teka/icon';
import { color } from '@teka/design-system';
import styled from 'styled-components';
import { flex } from '@teka/utils';
import { Column, Text } from '@teka/ui';
import { usePostMessageMutation } from '@/services/chat/mutations';
import { useAtomValue } from 'jotai';
import { chatroomUuidAtom } from '@/stores/chat';

interface OverlayContentProps {
  address: string;
}

const OverlayContent = ({ address }: OverlayContentProps) => {
  const chatroomUuid = useAtomValue(chatroomUuidAtom);
  const { postMessageMutate } = usePostMessageMutation(chatroomUuid!);

  const handleSendLocation = () => {
    postMessageMutate({ message: address, type: 'TEXT' });
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
