import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useEffect, useRef } from 'react';
import { useAtomValue } from 'jotai';
import { enterAtom } from '@/stores/enter';

export const useChatSocket = (chatroomUuid: string) => {
  const user = useAtomValue(enterAtom);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!user || !user.phoneNumber) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(process.env.REACT_APP_BASE_URL + '/conn'),
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      onConnect: () => {
        client.subscribe(`/chat/${chatroomUuid}/${user.language}`, (message) => {});
      },
      onDisconnect: () => {},
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [chatroomUuid, user]);
};
