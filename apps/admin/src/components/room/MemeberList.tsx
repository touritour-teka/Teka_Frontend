import styled from 'styled-components';
import RoundedButton from '../RoundedButton';
import { flex } from '@teka/utils';
import ListHeader from './ListHeader';
import { Column } from '@teka/ui';
import MemberListItem from './MemberListItem';
import { useState } from 'react';

interface MemberListProps {
  maxItem: number;
}

const MemberList = ({ maxItem }: MemberListProps) => {
  const [members, setMembers] = useState<any[]>([]);

  const handleAddMember = () => {
    if (members.length >= maxItem) {
      alert(`최대 ${maxItem}명까지만 추가 가능합니다.`);
      return;
    }
    setMembers((prev) => [...prev, { id: prev.length + 1 }]);
  };

  return (
    <StyledMemberList>
      <ButtonWrapper>
        <RoundedButton width={101} onClick={handleAddMember}>
          인원 추가
        </RoundedButton>
      </ButtonWrapper>
      <Column alignItems="center" width="100%">
        <ListHeader />
        {members.map((member) => (
          <MemberListItem
            key={member.id}
            phoneChange={() => {}}
            mailChange={() => {}}
            phonePlaceholder="전화번호 입력"
            mailPlaceholder="이메일 입력"
            mailValue=""
            phoneValue=""
          />
        ))}
      </Column>
    </StyledMemberList>
  );
};

export default MemberList;

const StyledMemberList = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  gap: 8px;
`;

const ButtonWrapper = styled.div`
  ${flex({ justifyContent: 'flex-end' })}
  padding-right: 16px;
`;
