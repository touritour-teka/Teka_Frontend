export interface getMessage {
  id: number;
  sender: {
    id: number;
    username: string;
  };
  message: string;
  translatedMessage: string;
  createdAt: string;
}
