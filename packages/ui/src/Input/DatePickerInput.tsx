import { useState } from 'react';
import { color } from '@teka/design-system';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IconCalender } from '@teka/icon';
import { flex } from '@teka/utils';
import React from 'react';
import { formatDateRange } from '@teka/utils';

const DatePickerInput = ({ width = 309, placeholder = '날짜를 선택하세요' }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const dateInfo = formatDateRange(startDate, endDate);
  const displayText =
    startDate && endDate
      ? `${dateInfo.startDateStr} - ${dateInfo.endDateStr} (${dateInfo.diffDays}일)`
      : '';

  return (
    <StyledDatePickerInput style={{ width }}>
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update: any) => {
          setDateRange(update);
        }}
        dateFormat="yyyy.MM.dd"
        placeholderText={placeholder}
        customInput={
          <Input value={displayText || ''} placeholder={placeholder} readOnly />
        }
      />
      <IconWrapper>
        <IconCalender width={24} height={24} />
      </IconWrapper>
    </StyledDatePickerInput>
  );
};

export default DatePickerInput;

const StyledDatePickerInput = styled.div`
  ${flex({ alignItems: 'center' })}
  position: relative;
  padding: 14px 16px;
  background-color: ${color.white2};
  border: 1px solid ${color.gray400};
  border-radius: 12px;

  &:focus-within {
    border: 1px solid ${color.blue800};
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker-popper {
    z-index: 10;
  }
`;

const Input = styled.input`
  color: ${color.gray800};
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  &::placeholder {
    color: ${color.gray200};
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 12px;
  display: flex;
  align-items: center;
  pointer-events: none;
`;
