import { useCreateRoomWithMembers } from '@/services/room/mutations';
import { Room } from '@/types/room/client';
import { postRoomReq, postUserReq } from '@/types/room/remote';
import { ChangeEventHandler, useState } from 'react';

const formatLocalDate = (date: Date | null): string =>
  date
    ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
        date.getDate()
      ).padStart(2, '0')}`
    : '';

export const useInput = () => {
  const [roomData, setRoomData] = useState<Room>({
    name: '',
    startDate: '',
    endDate: '',
    maxParticipants: 1,
  });

  const handleRoomChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  const handleRoomNumberChange = (newCount: number) => {
    setRoomData((prev) => ({ ...prev, maxParticipants: newCount }));
  };

  const handleRoomDateChange = (start: Date | null, end: Date | null) => {
    setRoomData((prev) => ({
      ...prev,
      startDate: formatLocalDate(start),
      endDate: formatLocalDate(end),
    }));
  };

  return { roomData, handleRoomChange, handleRoomNumberChange, handleRoomDateChange };
};

export const useCreateRoomAction = (roomData: postRoomReq, userData: postUserReq) => {
  const { createRoomWithMembers, isLoading, isError, roomId } = useCreateRoomWithMembers(
    roomData,
    userData
  );

  const handleCreateRoom = () => {
    createRoomWithMembers();
  };

  return { handleCreateRoom, isLoading, isError, roomId };
};
