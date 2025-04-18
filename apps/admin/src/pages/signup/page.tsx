import Button from '@/components/Button';
import { ButtonInput, Column, PreviewInput } from '@teka/ui';
import { flex } from '@teka/utils';
import styled from 'styled-components';

const SignupPage = () => {
  return (
    <StyledSignupPage>
      <SignupPageBox>
        <img src="/logo.svg" alt="logo" />
        <Column gap={122} width="100%" alignItems="center">
          <Column gap={32} width="100%" alignItems="center">
            <ButtonInput
              buttonText="중복 확인"
              onClick={() => {}}
              label="아이디"
              placeholder="아이디를 입력해주세요"
            />
            <PreviewInput label="비밀번호" placeholder="비밀번호를 입력해주세요" />
            <PreviewInput label="비밀번호" placeholder="비밀번호를 입력해주세요" />
          </Column>
          <Button onClick={() => {}}>가입 완료</Button>
        </Column>
      </SignupPageBox>
    </StyledSignupPage>
  );
};

export default SignupPage;

const StyledSignupPage = styled.div`
  ${flex({ justifyContent: 'center', alignItems: 'center' })}
  width: 100%;
  height: 100vh;
`;

const SignupPageBox = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })}
  width: 100%;
  max-width: 400px;
  gap: 49px;
  padding: 111px 16px 140px;
`;
