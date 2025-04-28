import React, { CSSProperties, useState } from 'react';
import styled from 'styled-components';
import { color, font } from '@teka/design-system';
import { IconArrowForward } from '@teka/icon';
import { flex } from '@teka/utils';
import LanguageModal from '@/components/common/LanguageModal';

interface LanguageInputProps {
  width?: CSSProperties['width'];
  label?: string;
}

const LanguageInput = ({ width, label }: LanguageInputProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('한국어');

  const toggleModal = () => setModalOpen(!isModalOpen);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    setModalOpen(false);
  };

  return (
    <div style={{ width }}>
      {label && <Label>{label}</Label>}
      <StyledLanguageInput onClick={toggleModal}>
        <Input
          value={selectedLanguage}
          placeholder="언어를 선택하세요"
          readOnly
          $isError={false}
        />
        <IconWrapper>
          <IconArrowForward width={24} height={24} />
        </IconWrapper>
      </StyledLanguageInput>
      {isModalOpen && (
        <LanguageModal
          onSelect={handleLanguageChange}
          onClose={() => setModalOpen(false)}
          selectedLanguage={selectedLanguage}
        />
      )}
    </div>
  );
};

export default LanguageInput;

const StyledLanguageInput = styled.div`
  ${flex({ alignItems: 'center' })}
  position: relative;
  padding: 14px 16px;
  background-color: ${color.white2};
  border: 1px solid ${color.blue800};
  border-radius: 12px;
  cursor: pointer;

  &:focus-within {
    border: 1px solid ${color.blue800};
  }
`;

const Input = styled.input<{ $isError: boolean }>`
  ${font.regular14}
  color: ${color.gray800};
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  &::placeholder {
    color: ${color.gray200};
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

const Label = styled.p`
  ${font.medi14}
  color: ${color.gray500};
  margin-bottom: 8px;
  text-align: left;
`;
