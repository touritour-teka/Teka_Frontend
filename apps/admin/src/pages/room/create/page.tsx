import Button from '@/components/Button';
import Header from '@/components/common/Header';
import MemberList from '@/components/room/MemeberList';
import { ROUTES } from '@/constants/constant';
import { Column, DatePickerInput, Input, StepperInput } from '@teka/ui';
import { flex } from '@teka/utils';
import styled from 'styled-components';
import { useState } from 'react';

const RoomCreatePage = () => {
  const [peopleCount, setPeopleCount] = useState(1);

  const handlePeopleCountChange = (newCount: number) => {
    setPeopleCount(newCount);
  };

  return (
    <StyledRoomCreatePage>
      <RoomCreatePageContent>
        <Header title="방 개설" routes={ROUTES.MANAGE} />
        <Content>
          <Column gap={32} alignItems="center" width="100%">
            <Input
              label="방 제목"
              placeholder="방 제목을 입력해주세요"
              width="100%"
              onChange={() => {}}
            />
            <DatePickerInput
              label="기간"
              width="100%"
              placeholder="기간을 입력해주세요"
            />
            <StepperInput
              label="인원 수"
              onChange={handlePeopleCountChange}
              width="100%"
              name="people"
              value={peopleCount}
            />
          </Column>
        </Content>
        <Column gap={71}>
          <MemberList />
          <Wrapper>
            <Button onClick={() => {}}>방 개설</Button>
          </Wrapper>
        </Column>
      </RoomCreatePageContent>
    </StyledRoomCreatePage>
  );
};

export default RoomCreatePage;

const StyledRoomCreatePage = styled.div`
  ${flex({ justifyContent: 'center' })}
  width: 100%;
  height: 100vh;
`;

const RoomCreatePageContent = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })}
  width: 100%;
  max-width: 400px;
  gap: 40px;
  padding: 0px 0px 84px;
`;

const Content = styled.div`
  width: 100%;
  padding-top: 112px;
  padding-left: 16px;
  padding-right: 16px;
`;

const Wrapper = styled.div`
  padding: 0px 16px;
  margin-top: 123px;
  margin-bottom: 84px;
`;
