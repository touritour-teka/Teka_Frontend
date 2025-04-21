import { color, font } from '@teka/design-system';
import { Text } from '@teka/ui';
import { IconBackward, IconSetting } from '@teka/icon';
import { flex } from '@teka/utils';
import styled from 'styled-components';

const Header = () => {
  return (
    <StyledHeader>
      <IconBackward width={24} height={24} />
      <Text fontType="semibold18">강원 님외 7명</Text>
      <IconSetting width={24} height={24} />
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
