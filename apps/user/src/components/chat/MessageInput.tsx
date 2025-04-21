import { IconFile, IconLocationMark, IconSend } from '@teka/icon';
import { Row } from '@teka/ui';
import { flex } from '@teka/utils';
import React, { useRef } from 'react';
import styled from 'styled-components';

const MessageInput: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileOpen = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('선택된 파일:', file);
    }
  };

  return (
    <ReactMessageInput>
      <IconLocationMark width={36} height={36} />
      <InputContainer>
        <TextInput placeholder="메시지 입력..." />
        <div onClick={handleFileOpen}>
          <IconFile width={28} height={28} onClick={handleFileOpen} />
        </div>
      </InputContainer>
      <IconSend width={36} height={36} />
    </ReactMessageInput>
  );
};

export default MessageInput;

const ReactMessageInput = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'space-between' })};
  width: 100%;
  padding: 12px;
  background-color: #fff;
  border-top: 1px solid #ddd;
  gap: 6px;
`;

const InputContainer = styled.div`
  ${flex({ alignItems: 'center' })};
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 2px 8px;
`;

const TextInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  margin: 0 8px;
  background-color: #f0f0f0;
`;

const SendButton = styled.button`
  background-color: #3b82f6;
  color: white;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const BadgeCounter = styled.div`
  background-color: #e74c3c;
  color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  position: absolute;
  bottom: 6px;
  left: 30px;
`;
