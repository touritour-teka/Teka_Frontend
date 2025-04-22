import { ReactNode } from 'react';
import styled from 'styled-components';
import { Text } from '@teka/ui';
import { color } from '@teka/design-system';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <StyledButton onClick={onClick}>
      <Text fontType="semibold16" color={color.white}>
        {children}
      </Text>
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 15px 0px;
  background-color: ${color.blue800};
  border-radius: 12px;
  display: block;
  text-align: center;

  &:active {
    background-color: ${color.blue900};
  }
`;
