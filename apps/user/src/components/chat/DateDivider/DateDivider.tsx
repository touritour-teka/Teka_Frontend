import { color, font } from '@teka/design-system';
import { flex } from '@teka/utils';
import styled from 'styled-components';

const DateDivider = ({ date }: { date: string }) => {
  return (
    <StyledDateDivider>
      <DatePill>{date}</DatePill>
    </StyledDateDivider>
  );
};

export default DateDivider;

const StyledDateDivider = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'center' })}
  margin: 24px 0;
`;

const DatePill = styled.div`
  ${font.regular14}
  background-color: ${color.gray100};
  color: ${color.white2};
  padding: 8px 20px;
  border-radius: 100px;
`;
