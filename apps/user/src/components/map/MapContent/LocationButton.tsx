import styled from 'styled-components';
import { flex } from '@teka/utils';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface LocationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const LocationButton = ({ children, ...props }: LocationButtonProps) => {
  return <Button {...props}>{children}</Button>;
};

export default LocationButton;

const Button = styled.button`
  ${flex({ justifyContent: 'center', alignItems: 'center' })};
  position: absolute;
  top: 28px;
  left: 16px;
  cursor: pointer;
  z-index: 10;
`;
