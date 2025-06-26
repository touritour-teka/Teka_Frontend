import { ROUTES } from '@/constants/constant';
import { RoomDetail } from '@/types/room/client';
import { useNavigate } from 'react-router-dom';

export const useCTAButton = (checked: string[], room?: RoomDetail) => {
  const navigate = useNavigate();

  const handleMoveBack = () => {
    localStorage.removeItem('chatRoomId');
    localStorage.removeItem('selectedMembers');
    localStorage.removeItem('selectedMemberIds');
  };

  const handleMovePage = () => {
    if (!room) return;
    localStorage.setItem('chatRoomId', room.data.chatRoomId.toString());
    const checkedIds = checked.map((id) => Number(id));
    const selectedMembers = room.data.userList.filter((user) => checkedIds.includes(user.id));
    localStorage.setItem('selectedMembers', JSON.stringify(selectedMembers));
    localStorage.setItem('selectedMemberIds', JSON.stringify(checked));

    navigate(ROUTES.CHANGE_ROOM);
  };

  return { handleMoveBack, handleMovePage };
};

export const useCheckedChange = (
  setChecked: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const handleChange = (id: string) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return { handleChange };
};
