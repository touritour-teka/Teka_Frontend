import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { flex } from '@teka/utils';
import RoundedButton from '@/components/RoundedButton';
import RoomList from '@/components/manage/RoomList';
import { Status } from '@/types/room/client';
import { Row } from '@teka/ui';
import { IconMemberMove, IconShare, IconStatus, IconTrash } from '@teka/icon';
import { useOverlay } from '@toss/use-overlay';
import DeleteModal from '@/components/manage/DeleteModal';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/constant';

const rooms: Array<{
  chatRoomId: number;
  name: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  status: Status;
}> = [
  {
    chatRoomId: 1,
    name: '회의실 A',
    startDate: '2025-04-01',
    endDate: '2025-04-02',
    maxParticipants: 4,
    status: 'OPEN',
  },
  {
    chatRoomId: 2,
    name: '회의실 B',
    startDate: '2025-04-05',
    endDate: '2025-04-06',
    maxParticipants: 2,
    status: 'CLOSED',
  },
  {
    chatRoomId: 3,
    name: '회의실 C',
    startDate: '2025-04-10',
    endDate: '2025-04-12',
    maxParticipants: 6,
    status: 'OPEN',
  },
];

const ManagePage = () => {
  // const { data: rooms = [] } = useChatListQuery();
  const [itemChecked, setItemChecked] = useState<string[]>([]);
  const overlay = useOverlay();
  const navigate = useNavigate();

  const handleMoveRoomCreate = () => {
    navigate(ROUTES.CREATE);
  };

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
                onClick={() => {
                  console.log('shre');
                }}
              />
              <IconStatus
                width={24}
                height={24}
                style={{
                  marginRight: '8px',
                  marginLeft: '8px',
                  marginBottom: '8px',
                  marginTop: '8px',
                }}
                onClick={() => {
                  console.log('status');
                }}
              />
              <IconMemberMove
                width={24}
                height={24}
                style={{
                  marginRight: '4px',
                  marginLeft: '10px',
                  marginBottom: '8px',
                  marginTop: '7px',
                }}
                onClick={() => {
                  console.log('shre');
                }}
              />
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
