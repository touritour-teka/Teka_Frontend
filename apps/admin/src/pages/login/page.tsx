import styled from 'styled-components';
import { flex } from '@teka/utils';
import Button from '@/components/Button';
import { Column, Input, PreviewInput } from '@teka/ui';
import OutlineButton from '@/components/OutlineButton';
import { useCTAButton, useInput, useLoginAction } from './login.hooks';

const LoginPage = () => {
  const { login, handleLoginChange } = useInput();
  const { handleLogin } = useLoginAction(login);
  const { handleMoveSignup } = useCTAButton();

  return (
    <StyledLoginPage>
      <LoginPageBox>
        <img src="/logo.svg" alt="logo" />
        <Column gap={40} width="100%" alignItems="stretch">
          <Column gap={24} width="100%">
            <Input
              label="아이디"
              placeholder="아이디를 입력해주세요"
              width="100%"
              name="username"
              onChange={handleLoginChange}
            />
            <PreviewInput
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요"
              width="100%"
              name="password"
              onChange={handleLoginChange}
            />
          </Column>
          <Column gap={12} width="100%">
            <Button onClick={handleLogin}>로그인</Button>
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
