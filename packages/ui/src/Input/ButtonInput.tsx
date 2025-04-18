import React from 'react';
import styled from 'styled-components';
import { color, font } from '@teka/design-system';
import Input from './Input';
import type { InputProps } from './Input.type';
import { flex } from '@teka/utils';

interface ButtonInputProps extends InputProps {
  width?: string;
  buttonText: string;
  enabled?: boolean;
  onClick: () => void;
}

const ButtonInput = ({
  width = '100%',
  label,
  name,
  value,
  placeholder,
  type = 'text',
  onChange,
  onKeyDown,
  buttonText,
  onClick,
  enabled = false,
  readOnly,
  isError = false,
  errorMessage,
}: ButtonInputProps) => (
  <div style={{ width }}>
    {label && <Label>{label}</Label>}
    <StyledButtonInput>
      <Input
        width={width}
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        readOnly={readOnly}
        isError={isError}
        errorMessage={errorMessage}
      />
      <Button disabled={!enabled} onClick={onClick}>
        {buttonText}
      </Button>
    </StyledButtonInput>
  </div>
);

export default ButtonInput;

const StyledButtonInput = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 7px;
`;

const Button = styled.button<{ disabled: boolean }>`
  ${flex({ alignItems: 'center', justifyContent: 'center' })}
  ${font.medi14};
  color: ${color.white2};
  background-color: ${({ disabled }) => (disabled ? color.gray400 : color.blue800)};
  border-radius: 12px;
  height: 48px;
  padding: 0 16px;
  flex-shrink: 0;
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;

const Label = styled.p`
  ${font.medi14};
  color: ${color.gray700};
  margin-bottom: 8px;
`;
