import { IconBackward } from '@teka/icon';
import { flex } from '@teka/utils';
import { Text } from '@teka/ui';
import styled from 'styled-components';
import { color } from '@teka/design-system';

const SettingHeader = () => {
  const handleClickBack = () => {
    window.history.back();
  };

  return (
    <StyledSettingHeader>
      <div onClick={handleClickBack}>
        <IconBackward width={28} height={28} />
      </div>
      <Text fontType="medi18">방 설정</Text>
      <Wrapper />
    </StyledSettingHeader>
  );
};

export default SettingHeader;

const StyledSettingHeader = styled.div`
  ${flex({ justifyContent: 'space-between', alignItems: 'center' })};
  height: 107px;
  width: 100%;
  padding: 61px 16px 18px 16px;
  background-color: ${color.white2};
`;

const Wrapper = styled.div`
  width: 28px;
  height: 28px;
`;
