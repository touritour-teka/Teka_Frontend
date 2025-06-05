export interface getMessage {
  id: number;
  user: {
    id: number;
    username: string;
  };
  message: string;
  translatedMessage: string;
  createdAt: string;
}
