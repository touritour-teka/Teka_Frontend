import { color as systemColor } from '@teka/design-system';
import { Text } from '@teka/ui';
import { flex } from '@teka/utils';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface StatusBoxProps {
  children: ReactNode;
  color: string;
  background: string;
  border: string;
}

const StatusBox = ({
  children,
  color = systemColor.blue800,
  background = systemColor.blue100,
  border = systemColor.blue800,
}: StatusBoxProps) => {
  return (
    <StyledStatusBox $background={background} $border={border}>
      <Text fontType="medi12" color={color}>
        {children}
      </Text>
    </StyledStatusBox>
  );
};

export default StatusBox;

const StyledStatusBox = styled.div<{ $background: string; $border: string }>`
  ${flex({ alignItems: 'center', justifyContent: 'center' })}
  width: 59px;
  height: 24px;
  background-color: ${({ $background }) => $background};
  border: 1px solid ${({ $border }) => $border};
  border-radius: 999px;
`;
