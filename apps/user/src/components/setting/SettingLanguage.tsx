import { color } from '@teka/design-system';
import { flex } from '@teka/utils';
import { Column, Text } from '@teka/ui';
import styled from 'styled-components';
import { useState } from 'react';
import LanguageModal from '../common/LanguageModal';
import { usePatchLanguageMutation } from '@/services/setting/mutations';
import { enterAtom } from '@/stores/enter';
import { useAtomValue, useSetAtom } from 'jotai';
import { getLanguageLabel } from '@/constants/LanguageMap';
import { Language } from '@/types/room/client';

const SettingLanguage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { language: selectedLanguage } = useAtomValue(enterAtom);
  const setEnterAtom = useSetAtom(enterAtom);
  const { patchLanguageMutate } = usePatchLanguageMutation();

  const toggleModal = () => setModalOpen(!isModalOpen);

  const handleLanguageChange = (lang: string) => {
    patchLanguageMutate(lang as Language);
    setEnterAtom((prev) => ({ ...prev, language: lang as Language }));
    setModalOpen(false);
  };

  return (
    <StyledSettingLanguage>
      <SettingContent onClick={toggleModal}>
        <Column gap={4}>
          <Text fontType="semibold16">번역 언어 변경</Text>
          <Text fontType="regular14" color={color.gray200}>
            원문에서 번역되는 언어가 변경됩니다.
          </Text>
        </Column>
        <Text fontType="regular14" color={color.blue900}>
          언어 변경
        </Text>
      </SettingContent>
      {isModalOpen && (
        <LanguageModal
          onSelect={handleLanguageChange}
          onClose={() => setModalOpen(false)}
          selectedLanguage={getLanguageLabel(selectedLanguage)}
        />
      )}
    </StyledSettingLanguage>
  );
};

export default SettingLanguage;

const StyledSettingLanguage = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' })}
  width: 100%;
  height: 100%;
`;

const SettingContent = styled.div`
  ${flex({ justifyContent: 'space-between', alignItems: 'center' })}
  width: 100%;
  padding: 16px;
`;
