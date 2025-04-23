import { color } from '@teka/design-system';
import { Text } from '@teka/ui';
import { IconArrowBackward, IconSetting } from '@teka/icon';
import { flex } from '@teka/utils';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
  hasSetting?: boolean;
}
const Header = ({ title, hasSetting }: HeaderProps) => {
  const navigate = useNavigate();

  const handleClickSetting = () => {
    navigate('/setting');
  };

  return (
    <StyledHeader>
      <IconArrowBackward width={24} height={24} />
      <Text fontType="semibold18">{title}</Text>
      {hasSetting ? (
        <div onClick={handleClickSetting}>
          <IconSetting width={24} height={24} />
        </div>
      ) : (
        <div style={{ width: '24px', height: '24px' }} />
      )}
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  ${flex({ justifyContent: 'space-between', alignItems: 'center' })};
  height: 107px;
  width: 100%;
  padding: 61px 16px 18px 16px;
  background-color: ${color.white2};
  border-radius: 0px 0px 12px 12px;
`;
