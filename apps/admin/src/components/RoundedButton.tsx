import { color, font } from '@teka/design-system';
import { IconAdd } from '@teka/icon';
import { flex } from '@teka/utils';
import { ReactNode } from 'react';
import styled, { CSSProperties } from 'styled-components';

interface RoundedButtonProps {
  children: ReactNode;
  width: CSSProperties['width'];
  onClick: () => void;
}

const RoundedButton = ({ children, width, onClick }: RoundedButtonProps) => {
  return (
    <StyledRoundedButton style={{ width }} onClick={onClick}>
      <IconAdd width={16} height={16} />
      {children}
    </StyledRoundedButton>
  );
};

export default RoundedButton;

const StyledRoundedButton = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' })}
  ${font.medi14}
  color: ${color.white};
  background-color: ${color.blue800};
  width: 100%;
  height: 32px;
  border-radius: 999px;
  gap: 8px;
`;
