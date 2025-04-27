import Button from '@/components/Button';
import Header from '@/components/common/Header';
import RoomList from '@/components/manage/RoomList';
import { ROUTES } from '@/constants/constant';
import { useDeleteUserMutation, usePostUserMutation } from '@/services/room/mutations';
import { useChatListQuery } from '@/services/room/queries';
import { Status, User } from '@/types/room/client';
import { color } from '@teka/design-system';
import { flex } from '@teka/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const RoomChangePage = () => {
  const [checked, setChecked] = useState<string[]>([]);

  const navigate = useNavigate();
  const roomId = localStorage.getItem('chatRoomId');
  const rawIds = localStorage.getItem('selectedMemberIds') || '[]';
  const currentRoomId = Number(localStorage.getItem('chatRoomId'));
  const deleteIds = (JSON.parse(rawIds) as string[]).map((s) => Number(s));
  const rawUsers = localStorage.getItem('selectedMembers') || '[]';
  const usersToAdd = JSON.parse(rawUsers) as User[];
  const targetRoomId = Number(checked);

  const usersToAddPayload = usersToAdd.map((u) => ({
    email: u.email,
    phoneNumber: u.phoneNumber,
    type: u.type,
  }));

  const { data: rooms = [] } = useChatListQuery('OPEN');
  const { deleteUserMutate, isPending: delLoading } = useDeleteUserMutation(
    currentRoomId,
    deleteIds
  );
  const { postUserMutate, isPending: addLoading } = usePostUserMutation(targetRoomId, {
    data: usersToAddPayload,
  });

  const handleItemChange = (id: string) => {
    if (id === roomId) return;
    setChecked((prev) => (prev[0] === id ? [] : [id]));
  };

  const handleMove = () => {
    deleteUserMutate(undefined, {
      onSuccess: () => {
        postUserMutate(undefined, {
          onSuccess: () => {
            navigate(ROUTES.MANAGE);
          },
        });
      },
    });
  };

  return (
    <StyledRoomChangePage>
      <RoomChangePageContent>
        <Header title="인원 이동" routes={`${ROUTES.ROOM}/${roomId}`} />
        <Content>
          <RoomList
            headerChange={() => {}}
            headerChecked={false}
            rooms={rooms}
            itemChecked={checked}
            disabledItems={roomId ? [roomId] : []}
            itemChange={handleItemChange}
          />
        </Content>
        <ButtonWrapper>
          <Button
            onClick={postUserMutate}
            variant={delLoading || addLoading ? 'disabled' : 'primary'}
          >
            선택한 방으로 이동
          </Button>
        </ButtonWrapper>
      </RoomChangePageContent>
    </StyledRoomChangePage>
  );
};

export default RoomChangePage;

const StyledRoomChangePage = styled.div`
  ${flex({ justifyContent: 'center' })}
  width: 100%;
  height: 100vh;
`;

const RoomChangePageContent = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })}
  width: 100%;
  max-width: 400px;
  gap: 40px;
`;

const Content = styled.div`
  width: 100%;
  padding-top: 112px;
`;

const ButtonWrapper = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'center' })}
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 16px 16px 52px;
  background-color: ${color.white};
`;
