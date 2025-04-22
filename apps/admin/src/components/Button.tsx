import { ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { Text } from '@teka/ui';
import { color } from '@teka/design-system';

type ButtonVariant = 'primary' | 'disabled';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  variant?: ButtonVariant;
}

const Button = ({ children, onClick, variant = 'primary' }: ButtonProps) => {
  return (
    <StyledButton
      onClick={variant === 'disabled' ? undefined : onClick}
      variant={variant}
    >
      <Text fontType="semibold16" color={color.white}>
        {children}
      </Text>
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.div<{ variant: ButtonVariant }>`
  width: 100%;
  max-width: 400px;
  padding: 15px 0px;
  border-radius: 12px;
  display: block;
  text-align: center;
  cursor: pointer;
  user-select: none;

  ${({ variant }) =>
    variant === 'primary'
      ? css`
          background-color: ${color.blue800};
        `
      : css`
          background-color: ${color.gray100};
          pointer-events: none;
          cursor: not-allowed;
        `}
`;
