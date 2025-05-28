import { IconCamera, IconFile, IconImage, IconLocationMark, IconSend } from '@teka/icon';
import { Text } from '@teka/ui';
import styled from 'styled-components';
import { flex } from '@teka/utils';
import { color } from '@teka/design-system';
import { useMessageInput } from './MessageInput.hooks';

const MessageInput = () => {
  const {
    showOptionsPanel,
    fileInputRef,
    handleFileOpen,
    handleFileChange,
    handleSendLocation,
    handleTakePhoto,
    handleSelectPhoto,
  } = useMessageInput();

  return (
    <>
      {showOptionsPanel && (
        <OptionsPanel>
          <OptionItem onClick={handleTakePhoto}>
            <IconCamera width={46} height={46} />
            <Text fontType="regular12">촬영</Text>
          </OptionItem>
          <OptionItem onClick={handleSelectPhoto}>
            <IconImage width={46} height={46} />
            <Text fontType="regular12">사진 첨부</Text>
          </OptionItem>
        </OptionsPanel>
      )}
      <StyledMessageInput>
        <div onClick={handleSendLocation}>
          <IconLocationMark width={36} height={36} />
        </div>
        <InputContainer>
          <TextInput placeholder="메시지 입력..." />
          <div onClick={handleFileOpen}>
            <IconFile width={28} height={28} />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </InputContainer>
        <IconSend width={36} height={36} />
      </StyledMessageInput>
    </>
  );
};

export default MessageInput;

const StyledMessageInput = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'space-between' })};
  background: ${color.white2};
  width: 100%;
  padding: 12px 12px 34px 12px;
  gap: 6px;
`;

const InputContainer = styled.div`
  ${flex({ alignItems: 'center' })};
  background: ${color.gray50};
  width: 100%;
  border-radius: 20px;
  padding: 2px 8px;
`;

const TextInput = styled.input`
  background: ${color.gray50};
  flex: 1;
  border: none;
  outline: none;
  margin: 0 8px;
`;

const OptionsPanel = styled.div`
  ${flex({ justifyContent: 'flex-start' })};
  position: absolute;
  background: ${color.white2};
  padding: 16px 17px;
  bottom: 80px;
  left: 0;
  right: 0;
  z-index: 100;
  gap: 20px;
`;

const OptionItem = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })};
  gap: 4px;
`;