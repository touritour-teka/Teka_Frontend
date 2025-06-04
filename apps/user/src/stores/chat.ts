import { atomWithStorage } from 'jotai/utils';

export const chatroomUuidAtom = atomWithStorage<string | null>(
  'chatroomUuid',
  null 
);
