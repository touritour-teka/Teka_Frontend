import RoomList from '@/components/manage/RoomList';
import RoundedButton from '@/components/RoundedButton';
import { ROUTES } from '@/constants/constant';
import { flex } from '@teka/utils';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const ManagePage = () => {
  const navigate = useNavigate();

  const handleMoveRoomCreate = () => {
    navigate(ROUTES.CREATE);
  };

  return (
    <StyledManagePage>
      <ManagePageBox>
        <ButtonWrapper>
          <RoundedButton width={89} onClick={handleMoveRoomCreate}>
            방 개설
          </RoundedButton>
        </ButtonWrapper>
        <RoomList />
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
