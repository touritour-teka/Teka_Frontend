import styled from 'styled-components';
import { flex } from '@teka/utils';
import Button from '@/components/enter/Button';
import LanguageInput from '@/components/enter/LanguageInput';
import { Column, Input } from '@teka/ui';
import { useInput, useEnterAction } from './enter.hooks';
import { Language } from '@/types/room/client';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { enterAtom } from '@/stores/enter';

const EnterPage = () => {
  const { chatroomUuid } = useParams();

  const { enter, handleEnterChange } = useInput();
  const [language, setLanguage] = useState('KOREAN' as Language);

  const { handleEnter } = useEnterAction(chatroomUuid!, {
    ...enter,
    language: language as Language,
  });

  const setEnter = useSetAtom(enterAtom);

  setEnter({
    phoneNumber: enter.phoneNumber,
    username: enter.username,
    language,
  });

  return (
    <StyledEnterPage>
      <EnterPageBox>
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
              value={language as Language}
              onChange={setLanguage}
            />
          </Column>
          <Column width="100%">
            <Button onClick={handleEnter}>채팅방 입장</Button>
          </Column>
        </Column>
      </EnterPageBox>
    </StyledEnterPage>
  );
};

export default EnterPage;

const StyledEnterPage = styled.div`
  ${flex({ justifyContent: 'center', alignItems: 'center' })}
  width: 100%;
  height: 100vh;
`;

const EnterPageBox = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })}
  width: 100%;
  max-width: 400px;
  gap: 42px;
  padding: 131px 16px 315px;
`;
