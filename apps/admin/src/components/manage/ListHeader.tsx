import { color } from '@teka/design-system';
import styled from 'styled-components';
import CheckBox from '../CheckBox';
import { Text } from '@teka/ui';
import { flex } from '@teka/utils';

interface ListHeaderProps {
  checked: boolean;
  onChange: () => void;
  id: string;
}

const ListHeader = ({ checked, onChange, id }: ListHeaderProps) => {
  return (
    <StyledListHeader>
      <Wrapper marginRight="15px">
        <CheckBox id={id} checked={checked} onChange={onChange} />
      </Wrapper>
      <Wrapper marginRight="55px">
        <Text fontType="medi12" color={color.gray500}>
          방제목
        </Text>
      </Wrapper>
      <Wrapper marginRight="90px">
        <Text fontType="medi12" color={color.gray500}>
          기간
        </Text>
      </Wrapper>
      <Wrapper marginRight="34px">
        <Text fontType="medi12" color={color.gray500}>
          최대 인원
        </Text>
      </Wrapper>
      <Wrapper marginRight="19px">
        <Text fontType="medi12" color={color.gray500}>
          상태
        </Text>
      </Wrapper>
    </StyledListHeader>
  );
};

export default ListHeader;

const StyledListHeader = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  max-width: 400px;
  height: 32px;
  background-color: ${color.gray50};
  border-bottom: 1px solid ${color.gray200};
  padding: 8px 16px;
`;

const Wrapper = styled.div<{ marginRight: string }>`
  ${flex({ alignItems: 'center' })}
  margin-right: ${({ marginRight }) => marginRight || '0'};
`;
