import styled from 'styled-components';
import { flex } from '@teka/utils';
import Button from '@/components/enter/Button';
import LanguageInput from '@/components/enter/LanguageInput';
import { Column, Input } from '@teka/ui';
import { useInput, useEnterAction } from './enter.hooks';
import { Language } from '@/types/room/client';
import { useState } from 'react';

const EnterPage = () => {
  const { enter, handleEnterChange } = useInput();
  const chatRoomUuid = '12345-abcde';
  const [language, setLanguage] = useState('한국어');

  const { handleEnter } = useEnterAction(chatRoomUuid, {
    ...enter,
    language: language as Language,
  });

  return (
    <StyledLoginPage>
      <LoginPageBox>
        <img src="/logo.svg" alt="logo" />
        <Column gap={56} width="100%" alignItems="stretch">
          <Column gap={24} width="100%">
            <Input
              label="전화번호"
              placeholder="전화번호를 입력해주세요"
              name="phoneNumber"
              onChange={handleEnterChange}
              value={enter.phoneNumber}
              width="100%"
            />
            <Input
              label="닉네임"
              placeholder="닉네임을 입력해주세요"
              width="100%"
              name="username"
              onChange={handleEnterChange}
              value={enter.username}
            />
            <LanguageInput
              label="사용언어"
              width="100%"
              value={language}
              onChange={setLanguage}
            />
          </Column>
          <Column width="100%">
            <Button onClick={handleEnter}>채팅방 입장</Button>
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
