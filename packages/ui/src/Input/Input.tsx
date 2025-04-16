import React from 'react';
import { color, font } from '@teka/design-system';
import styled, { css } from 'styled-components';
import ConditionalMessage from './ConditionalMessage';
import type { InputProps } from './Input.type';

const Input = ({
  width = 343,
  label,
  placeholder,
  type = 'text',
  name,
  value,
  onChange,
  errorMessage,
  message,
  readOnly,
  textAlign,
  isError = false,
}: InputProps) => {
  return (
    <div style={{ width }}>
      {label && <Label>{label}</Label>}
      <div style={{ position: 'relative' }}>
        <StyledInput
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          readOnly={readOnly}
          style={{ textAlign }}
          $isError={isError}
        />
      </div>
      <ConditionalMessage
        isError={isError}
        errorMessage={errorMessage}
        message={message}
      />
    </div>
  );
};

export default Input;

const StyledInput = styled.input<{ $isError: boolean }>`
  ${font.regular14}
  color: ${color.gray800};
  height: 12px;
  width: 312px;
  padding: 17px 16px;
  background-color: ${color.white};
  border: 1px solid ${color.gray400};
  border-radius: 12px;
  outline: none;

  &::placeholder {
    color: ${color.gray200};
  }
  &:focus {
    border: 1px solid ${color.blue800};
  }

  ${(props) =>
    props.$isError &&
    css`
      border: 1px solid ${color.red900};

      &:focus {
        border: 1px solid ${color.red900};
      }
    `}
`;

const Label = styled.p`
  ${font.medi14}
  color: ${color.gray500};
  margin-bottom: 8px;
  text-align: left;
`;
