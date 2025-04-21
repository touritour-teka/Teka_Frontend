import React, { useState } from 'react';
import { color, font } from '@teka/design-system';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { IconCalendar } from '@teka/icon';
import { flex } from '@teka/utils';
import { formatDateRange } from '@teka/utils';
import ConditionalMessage from './ConditionalMessage';
import { InputProps } from './Input.type';

const DatePickerInput = ({
  width,
  label,
  placeholder,
  type = 'text',
  name,
  onChange,
  readOnly,
  textAlign,
  isError = false,
  errorMessage,
  message,
}: InputProps) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const dateInfo = formatDateRange(startDate, endDate);
  const displayText =
    startDate && endDate
      ? `${dateInfo.startDateStr} - ${dateInfo.endDateStr} (${dateInfo.diffDays}일)`
      : '';

  return (
    <div style={{ width }}>
      {label && <Label>{label}</Label>}
      <div style={{ position: 'relative' }}>
        <StyledDatePickerInput>
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
              <Input
                value={displayText || ''}
                placeholder={placeholder}
                type={type}
                name={name}
                readOnly={readOnly}
                onChange={onChange}
                onClick={(e) => e.preventDefault()}
                style={{ textAlign }}
              />
            }
          />
          <IconWrapper>
            <IconCalendar width={24} height={24} />
          </IconWrapper>
        </StyledDatePickerInput>
      </div>
      <ConditionalMessage
        isError={isError}
        errorMessage={errorMessage}
        message={message}
      />
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
