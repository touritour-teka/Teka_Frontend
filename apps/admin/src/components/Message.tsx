import { color } from '@teka/design-system';
import { Text } from '@teka/ui';
import styled, { CSSProperties } from 'styled-components';
import { flex } from '@teka/utils';
import { ReactNode, useEffect, useState } from 'react';

interface MessageProps {
  children: ReactNode;
  width: CSSProperties['width'];
}

const Message = ({ children, width }: MessageProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    console.log('Message component mounted');
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <StyledMessage style={{ width }}>
      <Text fontType="medi14" color={color.white}>
        {children}
      </Text>
    </StyledMessage>
  );
};

export default Message;

const StyledMessage = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'center' })}
  position: fixed;
  bottom: 66px;
  left: 50%;
  transform: translateX(-50%);
  height: 46px;
  border-radius: 6px;
  background-color: ${color.gray200};
  padding: 0 16px;
  z-index: 1000;
  opacity: 0;
  animation: fadeInOut 3s ease forwards;

  @keyframes fadeInOut {
    0% {
      opacity: 0;
      transform: translate(-50%, 20px);
    }
    10% {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    90% {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, 20px);
    }
  }
`;
