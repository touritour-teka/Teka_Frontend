import styled from 'styled-components';
import { flex } from '@teka/utils';
import Button from '@/components/enter/Button';
import LanguageInput from '@/components/enter/LanguageInput';
import { Column, Input } from '@teka/ui';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/constant';

const EnterPage = () => {
  const navigate = useNavigate();

  const handleMoveSignup = () => {
    navigate(ROUTES.ENTER);
  };

  return (
    <StyledLoginPage>
      <LoginPageBox>
        <img src="/logo.svg" alt="logo" />
        <Column gap={56} width="100%" alignItems="stretch">
          <Column gap={24} width="100%">
            <Input label="전화번호" placeholder="전화번호를 입력해주세요" width="100%" />
            <Input label="닉네임" placeholder="닉네임을 입력해주세요" width="100%" />
            <LanguageInput label="사용언어" width="100%" />
          </Column>
          <Column width="100%">
            <Button onClick={handleMoveSignup}>채팅방 입장</Button>
          </Column>
        </Column>
      </LoginPageBox>
    </StyledLoginPage>
  );
};

export default EnterPage;

const StyledLoginPage = styled.div`
  ${flex({ justifyContent: 'center', alignItems: 'center' })}
  width: 100%;
  height: 100vh;
`;

const LoginPageBox = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })}
  width: 100%;
  max-width: 400px;
  gap: 42px;
  padding: 131px 16px 315px;
`;
