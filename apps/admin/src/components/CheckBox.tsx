import React from 'react';
import styled, { css } from 'styled-components';
import { color, font } from '@teka/design-system';
import { IconCheck } from '@teka/icon';

type CheckBoxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  id?: string;
};

const CheckBox = ({ checked, onChange, label, disabled = false, id }: CheckBoxProps) => (
  <LabelWrapper htmlFor={id} disabled={disabled}>
    <HiddenCheckbox
      id={id}
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
    />
    <StyledCheckbox $checked={checked} $disabled={disabled}>
      {checked && <IconCheck width={12} height={12} color={color.white2} />}
    </StyledCheckbox>
    {label && <TextLabel>{label}</TextLabel>}
  </LabelWrapper>
);

export default CheckBox;

const LabelWrapper = styled.label<{ disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const HiddenCheckbox = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div<{ $checked: boolean; $disabled: boolean }>`
  width: 16px;
  height: 16px;
  background: ${({ $checked }) => ($checked ? color.blue800 : 'none')};
  border: 1px solid ${({ $checked }) => ($checked ? color.blue800 : color.gray400)};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms;
  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: not-allowed;
    `}
`;

const TextLabel = styled.span`
  ${font.regular14};
  margin-left: 8px;
  color: ${color.gray800};
`;
