import { color } from '@teka/design-system';
import styled from 'styled-components';
import CheckBox from '../CheckBox';
import { Text } from '@teka/ui';
import { flex } from '@teka/utils';

const ListHeader = () => {
  return (
    <StyledListHeader>
      <Wrapper marginRight="15px">
        <CheckBox checked={false} onChange={() => {}} />
      </Wrapper>
      <Wrapper marginRight="64px">
        <Text fontType="medi12" color={color.gray500}>
          전화번호
        </Text>
      </Wrapper>
      <Wrapper marginRight="96px">
        <Text fontType="medi12" color={color.gray500}>
          이메일
        </Text>
      </Wrapper>
      <Wrapper marginRight="20px">
        <Text fontType="medi12" color={color.gray500}>
          일반
        </Text>
      </Wrapper>
      <Wrapper marginRight="21px">
        <Text fontType="medi12" color={color.gray500}>
          옵저버
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
