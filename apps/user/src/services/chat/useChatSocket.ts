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
        console.log('WebSocket 연결');

        client.subscribe(`/chat/${chatroomUuid}/${user.language}`, (message) => {
          const msg = JSON.parse(message.body);
          console.log('메시지:', msg);
        });
      },
      onDisconnect: () => {
        console.log('해제');
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [chatroomUuid, user]);
};
