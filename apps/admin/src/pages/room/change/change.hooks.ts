import { ROUTES } from '@/constants/constant';
import { useDeleteUserMutation, usePostUserMutation } from '@/services/room/mutations';
import { User } from '@/types/room/client';
import { useNavigate } from 'react-router-dom';

export const useCheckedChange = (
  setChecked: React.Dispatch<React.SetStateAction<string[]>>,
  roomId: string | null
) => {
  const handleItemChange = (id: string) => {
    if (id === roomId) return;
    setChecked((prev) => (prev[0] === id ? [] : [id]));
  };

  return { handleItemChange };
};

export const useMoveMemberAction = (checked: string[]) => {
  const navigate = useNavigate();
  const rawIds = localStorage.getItem('selectedMemberIds') || '[]';
  const currentRoomId = Number(localStorage.getItem('chatRoomId'));
  const deleteIds = (JSON.parse(rawIds) as string[]).map((s) => Number(s));
  const targetRoomId = Number(checked);
  const rawUsers = localStorage.getItem('selectedMembers') || '[]';
  const usersToAdd = JSON.parse(rawUsers) as User[];

  const usersToAddPayload = {
    data: usersToAdd.map((u) => ({
      email: u.email,
      phoneNumber: u.phoneNumber,
      type: u.type,
    })),
  };

  const { deleteUserMutate, isPending: deleteLoading } = useDeleteUserMutation(
    currentRoomId,
    deleteIds
  );

  const { postUserMutate, isPending: addLoading } =
    usePostUserMutation(usersToAddPayload);

  const handleMove = () => {
    deleteUserMutate(undefined, {
      onSuccess: () => {
        postUserMutate(targetRoomId, {
          onSuccess: () => {
            navigate(ROUTES.MANAGE, { state: { moved: true } });
          },
        });
      },
    });
  };

  return { handleMove, deleteLoading, addLoading };
};
