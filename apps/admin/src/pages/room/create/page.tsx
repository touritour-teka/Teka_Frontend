import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Button from '@/components/Button';
import Header from '@/components/common/Header';
import MemberList from '@/components/room/MemeberList';
import { ROUTES } from '@/constants/constant';
import { Column, DatePickerInput, Input, StepperInput } from '@teka/ui';
import { flex } from '@teka/utils';
import styled from 'styled-components';
import { useCreateRoomAction, useInput } from './create.hooks';
import { LocalMember, User } from '@/types/room/client';
import { postUserReq } from '@/types/room/remote';
import CreateLoadingModal from '@/components/room/CreateLoadingModal';
import { useOverlay } from '@toss/use-overlay';
import DeleteModal from '@/components/room/DeleteModal';

const RoomCreatePage = () => {
  const [itemChecked, setItemChecked] = useState<string[]>([]);
  const [members, setMembers] = useState<LocalMember[]>([]);

  const membersToAdd: User[] = members.map(({ phoneNumber, email, type }) => ({
    phoneNumber,
    email,
    type,
  }));

  const userDataPayload: postUserReq = {
    data: membersToAdd,
  };

  const overlay = useOverlay();

  const { roomData, handleRoomChange, handleRoomNumberChange, handleRoomDateChange } =
    useInput();
  const { handleCreateRoom, isLoading, isError, roomId } = useCreateRoomAction(
    roomData,
    userDataPayload
  );

  useEffect(() => {
    if (isError) {
      overlay.open(({ isOpen, close }) => (
        <DeleteModal isOpen={isOpen} onClose={close} onConfirm={close} id={roomId} />
      ));
    }
  }, [isError]);

  const headerChecked = useMemo(
    () => itemChecked.length > 0 && itemChecked.length === members.length,
    [itemChecked, members.length]
  );

  const handleHeaderChange = useCallback(() => {
    if (headerChecked) {
      setItemChecked([]);
    } else {
      setItemChecked(members.map((member) => member.uid));
    }
  }, [headerChecked, members]);

  const handleItemChange = useCallback((id: string) => {
    setItemChecked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

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
              name="name"
              onChange={handleRoomChange}
            />
            <DatePickerInput
              label="기간"
              width="100%"
              placeholder="기간을 입력해주세요"
              onDateChange={handleRoomDateChange}
            />
            <StepperInput
              label="인원 수"
              onChange={handleRoomNumberChange}
              width="100%"
              name="maxParticipants"
              value={roomData.maxParticipants}
            />
          </Column>
        </Content>
        <Column gap={71}>
          <MemberList
            maxItem={roomData.maxParticipants}
            headerChecked={headerChecked}
            itemChecked={itemChecked}
            headerChange={handleHeaderChange}
            itemChange={handleItemChange}
            members={members}
            onMembersChange={setMembers}
          />
          <Wrapper>
            <Button onClick={handleCreateRoom}>방 개설</Button>
          </Wrapper>
        </Column>
      </RoomCreatePageContent>
      <CreateLoadingModal isOpen={isLoading} />
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
