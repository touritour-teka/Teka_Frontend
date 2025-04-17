import React from 'react';
import { color, font } from '@teka/design-system';
import styled, { css } from 'styled-components';
import type { InputProps } from './Input.type';

const Input = ({
  width,
  label,
  placeholder,
  type = 'text',
  name,
  value,
  onChange,
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
    </div>
  );
};

export default Input;

const StyledInput = styled.input<{ $isError: boolean }>`
  display: flex;
  ${font.regular14}
  color: ${color.gray800};
  height: 48px;
  width: 100%;
  max-width: 400px;
  padding: 17px 16px;
  background-color: ${color.white2};
  border: 1px solid ${color.gray400};
  border-radius: 12px;

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
