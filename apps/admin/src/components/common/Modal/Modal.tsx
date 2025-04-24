import { color } from '@teka/design-system';
import { Column, Row, Text } from '@teka/ui';
import { flex } from '@teka/utils';
import type { CSSProperties, ReactNode } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

interface ModalProps {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  style?: CSSProperties;
  height?: CSSProperties['height'];
  width?: CSSProperties['width'];
}

const Modal = ({
  title,
  children,
  isOpen,
  onClose,
  onConfirm,
  style,
  height,
  width,
}: ModalProps) => {
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
      <StyledModal style={{ width, height, ...style }}>
        <Row
          style={{ marginBottom: 14 }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontType="semibold18" color={color.gray900}>
            {title}
          </Text>
        </Row>
        <Column style={{ width: '100%', height: '100%' }}>{children}</Column>
        <Row alignItems="center" justifyContent="end" gap={14}>
          <Button onClick={onClose}>
            <Text fontType="medi12" color={color.gray300}>
              취소
            </Text>
          </Button>
          <Button onClick={onConfirm}>
            <Text fontType="medi12" color={color.blue800}>
              삭제
            </Text>
          </Button>
        </Row>
      </StyledModal>
    </BlurBackground>
  );
};

export default Modal;

const BlurBackground = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const StyledModal = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  width: 280px;
  height: 150px;
  padding: 24px 16px;
  border-radius: 16px;
  background-color: ${color.white};
`;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
`;
