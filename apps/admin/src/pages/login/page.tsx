import styled from 'styled-components';
import { flex } from '@teka/utils';
import Button from '@/components/Button';
import { Column, Input } from '@teka/ui';
import OutlineButton from '@/components/OutlineButton';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/constant';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleMoveSignup = () => {
    navigate(ROUTES.SIGNUP);
  };

  return (
    <StyledLoginPage>
      <LoginPageBox>
        <img src="/logo.svg" alt="logo" />
        <Column gap={40} width="100%" alignItems="stretch">
          <Column gap={24} width="100%">
            <Input label="아이디" placeholder="아이디를 입력해주세요" width="100%" />
            <Input label="비밀번호" placeholder="비밀번호를 입력해주세요" width="100%" />
          </Column>
          <Column gap={12} width="100%">
            <Button onClick={() => {}}>로그인</Button>
            <OutlineButton onClick={handleMoveSignup}>회원가입</OutlineButton>
          </Column>
        </Column>
      </LoginPageBox>
    </StyledLoginPage>
  );
};

export default LoginPage;

const StyledLoginPage = styled.div`
  ${flex({ justifyContent: 'center', alignItems: 'center' })}
  width: 100%;
  height: 100vh;
`;

const LoginPageBox = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })}
  width: 100%;
  max-width: 400px;
  gap: 194px;
  padding: 142px 16px 92px;
`;
