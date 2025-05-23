export const ROUTES = {
  LOGIN: '/',
  SIGNUP: '/signup',
  MANAGE: '/manage',
  CREATE: '/room/create',
  ROOM: '/room',
  CHANGE_ROOM: '/room/change',
} as const;

export const TOKEN = {
  ACCESS: 'access-token',
  REFRESH: 'refresh-token',
} as const;

export const KEY = {
  VALIDATE: 'useValidateKey',
  CHAT_LIST: 'useChatListKey',
  CHAT_DETAIL: 'useChatDetailKey',
};
