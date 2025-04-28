import Button from '@/components/Button';
import Header from '@/components/common/Header';
import RoomList from '@/components/manage/RoomList';
import { ROUTES } from '@/constants/constant';
import { useChatListQuery } from '@/services/room/queries';
import { color } from '@teka/design-system';
import { flex } from '@teka/utils';
import { useState } from 'react';
import styled from 'styled-components';
import { useCheckedChange, useMoveMemberAction } from './change.hooks';

const RoomChangePage = () => {
  const [checked, setChecked] = useState<string[]>([]);
  const roomId = localStorage.getItem('chatRoomId');
  const { data: rooms = [] } = useChatListQuery('OPEN');
  const { handleItemChange } = useCheckedChange(setChecked, roomId);
  const { handleMove, deleteLoading, addLoading } = useMoveMemberAction(checked);

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
            onClick={handleMove}
            variant={deleteLoading || addLoading ? 'disabled' : 'primary'}
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
