import { ROUTES } from '@/constants/constant';
import { RoomList } from '@/types/room/client';
import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useCTAButton = (selectedId: number) => {
  const navigate = useNavigate();

  const handleMoveRoomDetail = () => {
    navigate(`${ROUTES.ROOM}/${selectedId}`);
  };

  const handleMoveRoomCreate = () => {
    navigate(ROUTES.CREATE);
  };

  return { handleMoveRoomDetail, handleMoveRoomCreate };
};

export const useCheckedChange = (rooms: RoomList[]) => {
  const [itemChecked, setItemChecked] = useState<string[]>([]);

  const headerChecked = useMemo(
    () => rooms.length > 0 && itemChecked.length === rooms.length,
    [rooms, itemChecked]
  );

  const handleItemChange = useCallback((id: string) => {
    setItemChecked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const handleHeaderChange = useCallback(() => {
    if (headerChecked) {
      setItemChecked([]);
    } else {
      setItemChecked(rooms.map((r) => r.chatRoomId.toString()));
    }
  }, [headerChecked, rooms]);

  return { handleItemChange, handleHeaderChange, itemChecked, headerChecked };
};
