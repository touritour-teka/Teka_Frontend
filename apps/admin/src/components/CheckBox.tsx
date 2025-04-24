import React, { InputHTMLAttributes } from 'react';
import styled from 'styled-components';
import { color } from '@teka/design-system';
import { IconCheck } from '@teka/icon';

const CheckBox = ({
  name,
  value,
  onChange,
  checked = false,
}: InputHTMLAttributes<HTMLInputElement>) => (
  <LabelWrapper>
    <HiddenCheckbox
      name={name}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      value={value}
    />
    <StyledCheckbox $checked={checked}>
      {checked && <IconCheck width={12} height={12} color={color.white2} />}
    </StyledCheckbox>
  </LabelWrapper>
);

export default CheckBox;

const LabelWrapper = styled.label`
  display: inline-flex;
  align-items: center;
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

const StyledCheckbox = styled.div<{ $checked: boolean }>`
  width: 16px;
  height: 16px;
  background: ${({ $checked }) => ($checked ? color.blue800 : 'none')};
  border: 1px solid ${({ $checked }) => ($checked ? color.blue800 : color.gray400)};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms;
`;
