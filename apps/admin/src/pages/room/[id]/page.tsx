import Button from '@/components/Button';
import Header from '@/components/common/Header';
import RoomDetailList from '@/components/room/detail/RoomDetailList';
import { ROUTES } from '@/constants/constant';
import { useChatDetailQuery } from '@/services/room/queries';
import { color } from '@teka/design-system';
import { flex } from '@teka/utils';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';

const RoomDetailPage = () => {
  const { id } = useParams<'id'>();
  const { data: room } = useChatDetailQuery(Number(id));
  const navigate = useNavigate();
  const saved = localStorage.getItem('selectedMemberIds');
  const initialChecked: string[] = saved ? JSON.parse(saved) : [];

  const [checked, setChecked] = useState<string[]>(initialChecked);

  const handleChange = (id: string) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const handleMovePage = () => {
    if (!room) return;
    localStorage.setItem('chatRoomId', room.chatRoomId.toString());
    const checkedIds = checked.map((id) => Number(id));
    const selectedMembers = room.userList.filter((user) => checkedIds.includes(user.id));
    localStorage.setItem('selectedMembers', JSON.stringify(selectedMembers));
    localStorage.setItem('selectedMemberIds', JSON.stringify(checked));

    navigate(ROUTES.CHANGE_ROOM);
  };

  const handleMoveBack = () => {
    localStorage.removeItem('chatRoomId');
    localStorage.removeItem('selectedMembers');
    localStorage.removeItem('selectedMemberIds');
  };

  return (
    <StyledRoomDetailPage>
      <RoomDetailPageContent>
        <Header title="인원 이동" routes={ROUTES.MANAGE} onBack={handleMoveBack} />
        <Content>
          {room && (
            <RoomDetailList room={room} checked={checked} onChange={handleChange} />
          )}
        </Content>
        <ButtonWrapper>
          <Button onClick={handleMovePage}>{checked.length}명 이동</Button>
        </ButtonWrapper>
      </RoomDetailPageContent>
    </StyledRoomDetailPage>
  );
};

export default RoomDetailPage;

const StyledRoomDetailPage = styled.div`
  ${flex({ justifyContent: 'center' })}
  width: 100%;
  height: 100vh;
`;

const RoomDetailPageContent = styled.div`
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
