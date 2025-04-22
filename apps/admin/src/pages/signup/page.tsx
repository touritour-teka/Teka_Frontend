import Button from '@/components/Button';
import { ButtonInput, Column, PreviewInput, Text } from '@teka/ui';
import { flex } from '@teka/utils';
import styled from 'styled-components';
import { useInput, useSingupAction, useVerificationAction } from './singup.hooks';
import { color } from '@teka/design-system';
import Validate from '@/components/common/Validate/Validate';

const SignupPage = () => {
  const { signup, handleSignupChange } = useInput();
  const { handleSignup } = useSingupAction(signup);
  const { handleValidate, isSuccess, isError } = useVerificationAction(signup);

  const isFormValid = signup.username && signup.password && signup.password_confirm;
  const isPasswordMatching = signup.password === signup.password_confirm;

  return (
    <StyledSignupPage>
      <SignupPageBox>
        <img src="/logo.svg" alt="logo" />
        <Column gap={122} width="100%" alignItems="center">
          <Column gap={32} width="100%" alignItems="center">
            <Column gap={4} width="100%" alignItems="flex-start">
              <ButtonInput
                buttonText="중복 확인"
                name="username"
                onClick={handleValidate}
                label="아이디"
                width="100%"
                placeholder="아이디를 입력해주세요"
                onChange={handleSignupChange}
                value={signup.username}
                enabled={!!signup.username}
              />
              {isError && (
                <Text fontType="regular12" color={color.red900}>
                  중복된 아이디입니다
                </Text>
              )}
              {isSuccess && (
                <Text fontType="regular12" color={color.blue800}>
                  사용 가능한 아이디입니다
                </Text>
              )}
            </Column>
            <Column gap={8} width="100%" alignItems="flex-start">
              <PreviewInput
                label="비밀번호"
                placeholder="비밀번호를 입력해주세요"
                width="100%"
                name="password"
                onChange={handleSignupChange}
              />
              {Validate(signup.password)}
            </Column>
            <PreviewInput
              width="100%"
              label="비밀번호 재입력"
              placeholder="비밀번호를 다시 입력해주세요"
              name="password_confirm"
              onChange={handleSignupChange}
              isError={signup.password !== signup.password_confirm}
              errorMessage="비밀번호가 일치하지 않습니다."
            />
          </Column>
          <Button
            onClick={handleSignup}
            variant={
              isFormValid && isPasswordMatching && isSuccess ? 'primary' : 'disabled'
            }
          >
            가입 완료
          </Button>
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
