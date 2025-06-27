import React from 'react';
import styled from 'styled-components';
import { flex } from '@teka/utils';
import RoundedButton from '@/components/RoundedButton';
import RoomList from '@/components/manage/RoomList';
import { Row } from '@teka/ui';
import { IconMemberMove, IconShare, IconStatus, IconTrash } from '@teka/icon';
import { useOverlay } from '@toss/use-overlay';
import DeleteModal from '@/components/manage/DeleteModal';
import SelectBottomSheet from '@/components/common/SelectBottomSheet/SelectBottomSheet';
import { useChatDetailQuery, useChatListQuery } from '@/services/room/queries';
import { useCheckedChange, useCTAButton } from './manage.hooks';
import {
  useDeleteChatRoomMutation,
  usePatchRoomCloseMutation,
  usePatchRoomOpenMutation,
  usePostMailMutation,
} from '@/services/room/mutations';
import Message from '@/components/Message';
import { useLocation } from 'react-router-dom';

const ManagePage = () => {
  const overlay = useOverlay();
  const location = useLocation();
  const moved = location.state?.moved;

  const { data: rooms = [] } = useChatListQuery(null);

  const { handleItemChange, handleHeaderChange, itemChecked, headerChecked } =
    useCheckedChange(rooms);

  const selectedId = Number(itemChecked[0]);
  const isValidId = typeof selectedId === 'number' && !Number.isNaN(selectedId);
  const selectedRoom = rooms.find((r) => r.chatRoomId === selectedId);
  const selectedStatus = selectedRoom?.status ?? 'OPEN';

  const room = useChatDetailQuery(isValidId ? selectedId : undefined)?.data;

  const userIds = room?.data.userList?.map((user: { id: number }) => user.id) ?? [];
  const { postMailMutate } = usePostMailMutation(selectedId);

  const { handleMoveRoomDetail, handleMoveRoomCreate } = useCTAButton(selectedId);
  const { isSuccess: openSuccess } = usePatchRoomOpenMutation(selectedId);
  const { isSuccess: closeSuccess } = usePatchRoomCloseMutation(selectedId);
  const { isSuccess: deleteSuccess } = useDeleteChatRoomMutation();

  const openChangeRoomStatus = () => {
    overlay.open(({ isOpen, close }) => (
      <SelectBottomSheet
        isOpen={isOpen}
        onClose={close}
        selectedId={selectedId}
        status={selectedStatus}
      />
    ));
  };

  const openDeleteChatRoomModal = () => {
    overlay.open(({ isOpen, close }) => (
      <DeleteModal
        isOpen={isOpen}
        onClose={close}
        onConfirm={close}
        count={itemChecked.length}
        selectedIds={itemChecked.map((id) => Number(id))}
      />
    ));
  };

  const handleChatRoomShare = () => {
    if (itemChecked.length === 0) {
      alert('선택된 채팅방이 없습니다!');
      return;
    }

    itemChecked.forEach((roomIdStr) => {
      const roomId = Number(roomIdStr);
      if (Number.isNaN(roomId)) return;

      const roomDetail = rooms.find((r) => r.chatRoomId === roomId);
      const userIds = room?.data.userList?.map((u) => u.id) ?? [];

      if (userIds.length === 0) {
        console.warn(`${roomId}번 방에 보낼 유저가 없습니다.`);
        return;
      }
      
      postMailMutate(userIds);
    });
  };

  const successMessages = [
    moved && '인원 이동이 완료되었습니다',
    (openSuccess || closeSuccess) && '상태가 변경되었습니다',
    deleteSuccess && '삭제가 완료되었습니다',
  ].filter(Boolean);

  return (
    <StyledManagePage>
      <ManagePageBox>
        <ButtonWrapper>
          {itemChecked.length === 0 ? (
            <RoundedButton width={89} onClick={handleMoveRoomCreate}>
              방 개설
            </RoundedButton>
          ) : itemChecked.length === 1 ? (
            <Row alignItems="center">
              <IconShare
                width={24}
                height={24}
                style={{ marginRight: '8px', marginBottom: '8px', marginTop: '8px' }}
                onClick={handleChatRoomShare}
              />
              <IconButton onClick={openChangeRoomStatus}>
                <IconStatus width={24} height={24} />
              </IconButton>
              <IconButton onClick={handleMoveRoomDetail}>
                <IconMemberMove width={24} height={24} />
              </IconButton>
              <IconButton onClick={openDeleteChatRoomModal}>
                <IconTrash width={24} height={24} />
              </IconButton>
            </Row>
          ) : (
            <IconButton onClick={openDeleteChatRoomModal}>
              <IconTrash width={24} height={24} />
            </IconButton>
          )}
        </ButtonWrapper>
        <RoomList
          rooms={rooms}
          headerChecked={headerChecked}
          itemChecked={itemChecked}
          headerChange={handleHeaderChange}
          itemChange={handleItemChange}
        />
      </ManagePageBox>
      {successMessages.map((message, idx) => (
        <Message key={idx} width={190}>
          {message}
        </Message>
      ))}
    </StyledManagePage>
  );
};

export default ManagePage;

const StyledManagePage = styled.div`
  ${flex({ justifyContent: 'center' })}
  width: 100%;
  height: 100vh;
`;

const ManagePageBox = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  max-width: 400px;
  padding-top: 87px;
  gap: 12px;
`;

const ButtonWrapper = styled.div`
  ${flex({ justifyContent: 'flex-end' })}
  padding-right: 16px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  display: inline-flex;
`;
