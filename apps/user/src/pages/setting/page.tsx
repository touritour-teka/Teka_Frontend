import SettingHeader from '@/components/setting/SettingHeader';
import SettingLanguage from '@/components/setting/SettingLanguage';
import { flex } from '@teka/utils';
import styled from 'styled-components';

const SettingPage = () => {
  return (
    <StyledSettingPage>
      <SettingHeader />
      <SettingLanguage />
    </StyledSettingPage>
  );
};

export default SettingPage;

const StyledSettingPage = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' })}
  width: 100%;
  height: 100vh;
`;
