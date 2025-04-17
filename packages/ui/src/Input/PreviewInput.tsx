import React from 'react';
import styled, { css } from 'styled-components';
import { color, font } from '@teka/design-system';
import { useBooleanState } from '@teka/hooks';
import { IconInvisibleEye, IconVisibleEye } from '@teka/icon';
import ConditionalMessage from './ConditionalMessage';
import type { InputProps } from './Input.type';

const PreviewInput = ({
  width = '100%',
  placeholder,
  name,
  label,
  value,
  errorMessage,
  message,
  isError = false,
  onChange,
  onKeyDown,
}: InputProps) => {
  const { value: isPreview, toggle: toggleIsPreview } = useBooleanState();

  return (
    <div style={{ width }}>
      {label && <Label>{label}</Label>}
      <StyledPreviewInput $isError={isError}>
        <Input
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          type={isPreview ? 'text' : 'password'}
          name={name}
          value={value}
        />
        <div onClick={toggleIsPreview} style={{ lineHeight: 0 }}>
          {isPreview ? (
            <IconVisibleEye width={22} height={22} color={color.gray500} />
          ) : (
            <IconInvisibleEye width={22} height={22} color={color.gray500} />
          )}
        </div>
      </StyledPreviewInput>
      <ConditionalMessage
        isError={isError}
        errorMessage={errorMessage}
        message={message}
      />
    </div>
  );
};

export default PreviewInput;

const StyledPreviewInput = styled.div<{ $isError: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 17px 16px;
  background-color: ${color.white2};
  border: 1px solid ${({ $isError }) => ($isError ? color.red900 : color.gray400)};
  border-radius: 12px;

  &:focus-within {
    border-color: ${({ $isError }) => ($isError ? color.red900 : color.blue800)};
  }
`;

const Input = styled.input`
  ${font.regular14};
  color: ${color.gray800};
  background-color: transparent;
  flex: 1;
  border: none;
  outline: none;

  &::placeholder {
    color: ${color.gray200};
  }
`;

const ToggleButton = styled.div`
  cursor: pointer;
`;

const Label = styled.p`
  ${font.medi14};
  color: ${color.gray500};
  margin-bottom: 8px;
  text-align: left;
`;
