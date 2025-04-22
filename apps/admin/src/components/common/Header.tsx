import { color } from '@teka/design-system';
import styled from 'styled-components';
import { flex } from '@teka/utils';
import { Text } from '@teka/ui';
import { IconArrow } from '@teka/icon';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  routes: string;
}

const Header = ({ title, routes }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <StyledHeader>
      <BackButton onClick={() => navigate(routes)}>
        <IconArrow width={24} height={24} color={color.gray900} />
      </BackButton>
      <TitleWrapper>
        <Text fontType="medi18" color={color.gray900}>
          {title}
        </Text>
      </TitleWrapper>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  ${flex({ alignItems: 'end', justifyContent: 'space-between' })}
  width: 100%;
  max-width: 400px;
  height: 92px;
  padding: 9px 16px;
  background-color: ${color.white2};
  position: fixed;
  z-index: 100;
`;

const BackButton = styled.button`
  ${flex({ alignItems: 'end', justifyContent: 'end' })}
  width: 28px;
  height: 28px;
  padding: 0;
`;

const TitleWrapper = styled.div`
  ${flex({ alignItems: 'end', justifyContent: 'end' })}
  position: absolute;
  left: 50%;
  padding-bottom: 5px;
  transform: translateX(-50%);
`;
