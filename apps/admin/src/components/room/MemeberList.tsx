import React, { useState } from 'react';
import styled from 'styled-components';
import RoundedButton from '../RoundedButton';
import { flex } from '@teka/utils';
import ListHeader from './ListHeader';
import { Column } from '@teka/ui';
import MemberListItem from './MemberListItem';
import { LocalMember } from '@/types/room/client';
import { IconTrash } from '@teka/icon';

interface MemberListProps {
  maxItem: number;
  headerChecked: boolean;
  itemChecked: string[];
  headerChange: () => void;
  itemChange: (id: string) => void;
  members: LocalMember[];
  onMembersChange: (members: LocalMember[]) => void;
}

const MemberList = ({
  maxItem,
  headerChecked,
  itemChecked,
  headerChange,
  itemChange,
  members,
  onMembersChange,
}: MemberListProps) => {
  const handleAddMember = () => {
    if (members.length >= maxItem) {
      alert(`최대 ${maxItem}명까지만 추가 가능합니다.`);
      return;
    }
    const newMember: LocalMember = {
      uid: `${Date.now()}-${members.length}`,
      phoneNumber: '',
      email: '',
      type: 'USER',
    };
    onMembersChange([...members, newMember]);
  };

  const updateMember = (uid: string, field: 'phoneNumber' | 'email', value: string) => {
    onMembersChange(members.map((m) => (m.uid === uid ? { ...m, [field]: value } : m)));
  };

  const changeType = (uid: string, newType: 'USER' | 'OBSERVER') => {
    onMembersChange(members.map((m) => (m.uid === uid ? { ...m, type: newType } : m)));
  };

  console.log(members);

  return (
    <StyledMemberList hasChecked={itemChecked.length > 0}>
      <ButtonWrapper>
        {itemChecked.length === 0 ? (
          <RoundedButton width={101} onClick={handleAddMember}>
            인원 추가
          </RoundedButton>
        ) : (
          <IconButton
            onClick={() => {
              onMembersChange(members.filter((m) => !itemChecked.includes(m.uid)));
              itemChecked.forEach((id) => itemChange(id));
            }}
          >
            <IconTrash width={24} height={24} />
          </IconButton>
        )}
      </ButtonWrapper>
      <Column alignItems="center" width="100%">
        <ListHeader id="all" checked={headerChecked} onChange={headerChange} />
        {members.map((member) => (
          <MemberListItem
            key={member.uid}
            id={member.uid}
            checked={itemChecked.includes(member.uid)}
            onChange={() => itemChange(member.uid)}
            phoneValue={member.phoneNumber}
            phoneChange={(e) => updateMember(member.uid, 'phoneNumber', e.target.value)}
            phonePlaceholder="전화번호 입력"
            mailValue={member.email}
            mailChange={(e) => updateMember(member.uid, 'email', e.target.value)}
            mailPlaceholder="이메일 입력"
            userChecked={member.type === 'USER'}
            userChange={() => {
              changeType(member.uid, 'USER');
            }}
            observerChecked={member.type === 'OBSERVER'}
            observerChange={() => {
              changeType(member.uid, 'OBSERVER');
            }}
          />
        ))}
      </Column>
    </StyledMemberList>
  );
};

export default MemberList;

const StyledMemberList = styled.div<{ hasChecked: boolean }>`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  gap: ${({ hasChecked }) => (hasChecked ? '0px' : '8px')};
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
