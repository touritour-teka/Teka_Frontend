import { getLanguageLabel } from '@/constants/LanguageMap';
import { Language } from '@/types/room/client';
import { color, font } from '@teka/design-system';
import { Row } from '@teka/ui';
import styled from 'styled-components';

const LanguageModal = ({
  onSelect,
  onClose,
  selectedLanguage,
}: {
  onSelect: (lang: Language) => void;
  onClose: () => void;
  selectedLanguage: string;
}) => {
  const languageMap: { label: string; value: Language }[] = [
    { label: '한국어', value: 'KOREAN' },
    { label: 'English', value: 'ENGLISH' },
    { label: '中文', value: 'CHINESE' },
  ];

  return (
    <ModalBackdrop onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <RadioGroup>
          {languageMap.map(({ label, value }) => (
            <Row key={value} justifyContent="space-between">
              {label}
              <RadioInput
                type="radio"
                name="language"
                value={value}
                checked={selectedLanguage === getLanguageLabel(value)}
                onChange={() => onSelect(value)}
              />
            </Row>
          ))}
        </RadioGroup>
      </Modal>
    </ModalBackdrop>
  );
};

export default LanguageModal;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: white;
  padding: 27px 22px;
  border-radius: 12px;
  width: 300px;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;

  label {
    ${font.regular14}
    color: ${color.gray900};
    display: flex;
    align-items: center;
    gap: 32px;
  }
`;

const RadioInput = styled.input`
  width: 24px;
  height: 24px;
  border: 1px solid ${color.gray100};
  border-radius: 50%;
  appearance: none;
  background-color: white;
  display: grid;
  place-content: center;

  &:checked::before {
    content: '';
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 10px solid ${color.blue800};
    background-color: ${color.white2};
  }
`;
