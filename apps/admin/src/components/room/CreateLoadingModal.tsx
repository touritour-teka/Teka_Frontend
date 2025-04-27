import { color } from '@teka/design-system';
import { flex } from '@teka/utils';
import styled from 'styled-components';
import Loader from '../common/Loader/Loader';
import { Column, Text } from '@teka/ui';
import { useEffect } from 'react';

interface CreateLoadingModalProps {
  isOpen: boolean;
}

const CreateLoadingModal = ({ isOpen }: CreateLoadingModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <BlurBackground $isOpen={isOpen}>
      <StyledCreateLoadingModal>
        <Loader width={98} height={40} />
        <Column gap={8} alignItems="center">
          <Text fontType="semibold18" color={color.gray900}>
            채팅방 생성 중
          </Text>
          <Column alignItems="center">
            <Text fontType="regular12" color={color.gray600}>
              채팅방 생성 시
            </Text>
            <Text fontType="regular12" color={color.gray600}>
              약 2초 소요됩니다.
            </Text>
          </Column>
        </Column>
      </StyledCreateLoadingModal>
    </BlurBackground>
  );
};

export default CreateLoadingModal;

const BlurBackground = styled.div<{ $isOpen: boolean }>`
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  z-index: 101;
`;

const StyledCreateLoadingModal = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })};
  width: 100%;
  max-width: 280px;
  height: 220px;
  gap: 48px;
  padding: 48px 16px 24px;
  position: relative;
  border-radius: 16px;
  background-color: ${color.white};
`;
