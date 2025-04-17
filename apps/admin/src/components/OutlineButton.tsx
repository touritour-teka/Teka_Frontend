import { ReactNode } from 'react';
import styled from 'styled-components';
import { Text } from '@teka/ui';
import { color } from '@teka/design-system';

interface OutlineButtonProps {
  children: ReactNode;
  onClick: () => void;
}

const OutlineButton = ({ children, onClick }: OutlineButtonProps) => {
  return (
    <StyledOutlineButton onClick={onClick}>
      <Text fontType="semibold16" color={color.gray700}>
        {children}
      </Text>
    </StyledOutlineButton>
  );
};

export default OutlineButton;

const StyledOutlineButton = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 15px 0px;
  background-color: ${color.blue100};
  border-radius: 12px;
  border: 1px solid ${color.blue800};
  display: block;
  text-align: center;
`;
