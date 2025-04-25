import React, { CSSProperties, useState } from 'react';
import { color, font } from '@teka/design-system';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IconCalendar } from '@teka/icon';
import { flex } from '@teka/utils';

interface DatePickerInputProps {
  width?: CSSProperties['width'];
  label?: string;
  placeholder?: string;
  onDateChange?: (start: Date | null, end: Date | null) => void;
}

const DatePickerInput = ({
  width,
  label,
  placeholder,
  onDateChange,
}: DatePickerInputProps) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <div style={{ width }}>
      {label && <Label>{label}</Label>}
      <div style={{ position: 'relative' }}>
        <StyledDatePickerInput>
          <DatePicker
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={(update: [Date | null, Date | null]) => {
              setDateRange(update);
              onDateChange?.(update[0], update[1]);
            }}
            dateFormat="yyyy.MM.dd"
            placeholderText={placeholder}
            customInput={
              <Input
                value={
                  startDate && endDate
                    ? `${startDate.toISOString().split('T')[0]}-${
                        endDate.toISOString().split('T')[0]
                      }`
                    : ''
                }
                placeholder={placeholder}
                readOnly
                onClick={(e) => e.preventDefault()}
              />
            }
          />
          <IconWrapper>
            <IconCalendar width={24} height={24} />
          </IconWrapper>
        </StyledDatePickerInput>
      </div>
    </div>
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
  ${font.regular14}
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

const Label = styled.p`
  color: ${color.gray500};
  margin-bottom: 8px;
  text-align: left;
  font-size: 14px;
`;
