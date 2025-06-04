import { IconArrowForward } from '@teka/icon';
import { color } from '@teka/design-system';
import styled from 'styled-components';
import { flex } from '@teka/utils';
import { Column, Text } from '@teka/ui';
import { usePostMessageMutation } from '@/services/chat/mutations';
import { useAtomValue } from 'jotai';
import { chatroomUuidAtom } from '@/stores/chat';
import { useNavigate } from 'react-router-dom';

interface OverlayContentProps {
  address: string;
  onSendComplete: () => void;
  lat: number;
  lng: number;
}

const OverlayContent = ({ address, onSendComplete, lat, lng }: OverlayContentProps) => {
  const chatroomUuid = useAtomValue(chatroomUuidAtom);
  const { postMessageMutate } = usePostMessageMutation(chatroomUuid!);
  const navigate = useNavigate();
  const mapUrl = `${window.location.origin}/map?lat=${lat}&lng=${lng}`;

  const handleSendLocation = () => {
    postMessageMutate(
      { message: mapUrl, type: 'TEXT' },
      {
        onSuccess: () => {
          onSendComplete?.();
          navigate(`/chat/${chatroomUuid}`);
        },
      }
    );
  };

  return (
    <>
      <StyledOverlayContent>
        <Column gap={8}>
          <Text fontType="medi14">이 위치 보내기</Text>
          <Text fontType="regular12">{address}</Text>
        </Column>
        <div onClick={handleSendLocation}>
          <IconArrowForward width={24} height={24} color={color.gray900} />
        </div>
      </StyledOverlayContent>
      <BubbleTip />
    </>
  );
};

export default OverlayContent;

const StyledOverlayContent = styled.div`
  ${flex({ justifyContent: 'space-between', alignItems: 'center' })};
  position: absolute;
  top: calc(50% - 120px);
  left: calc(50% - 132px);
  gap: 18px;
  background-color: ${color.white2};
  border-radius: 4px;
  padding: 10px 6px 10px 12px;
`;

const BubbleTip = styled.div`
  content: '';
  position: absolute;
  left: 50%;
  top: calc(50% - 68px);
  transform: translateX(-50%);
  border-width: 24px 16px 0 16px;
  border-radius: 14px;
  border-style: solid;
  border-color: ${color.white2} transparent transparent transparent;
`;