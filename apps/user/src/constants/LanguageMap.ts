import { Language } from '@/types/room/client';

export const languageMap: { label: string; value: Language }[] = [
  { label: '한국어', value: 'KOREAN' },
  { label: 'English', value: 'ENGLISH' },
  { label: '中文', value: 'CHINESE' },
];

export const getLanguageLabel = (value: Language) =>
  languageMap.find((l) => l.value === value)?.label ?? '';
