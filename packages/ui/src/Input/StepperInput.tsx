import { IconMinus, IconPlus } from '@teka/icon';
import { styled } from 'styled-components';
import { color, font } from '@teka/design-system';
import Row from '../Flex/Row';
import { flex } from '@teka/utils';
import Text from '../Text/Text';
import React from 'react';

interface StepperInputProps {
  width: string;
  label?: string;
  value: number;
  onChange: (newValue: number) => void;
  name: string;
}

const StepperInput = ({ width, label, value, onChange, name }: StepperInputProps) => {
  const handleDecrease = () => {
    if (value > 1) onChange(value - 1);
  };

  const handleIncrease = () => {
    onChange(value + 1);
  };

  return (
    <Container style={{ width }}>
      {label && <Label>{label}</Label>}
      <InputWrapper>
        <Text fontType="regular14" color={color.gray900}>
          {value}인
        </Text>
        <Row alignItems="center" gap={8}>
          <Button onClick={handleDecrease}>
            <IconMinus width={30} height={30} />
          </Button>
          <Button onClick={handleIncrease}>
            <IconPlus width={30} height={30} />
          </Button>
        </Row>
      </InputWrapper>
      <input type="hidden" name={name} value={value} />
    </Container>
  );
};

export default StepperInput;

const Container = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'flex-start' })}
  width: 100%;
  max-width: 400px;
`;

const Label = styled.p`
  ${font.medi14}
  color: ${color.gray500};
  margin-bottom: 8px;
  text-align: left;
`;

const InputWrapper = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'space-between' })}
  border: 1px solid ${color.gray300};
  border-radius: 12px;
  padding: 17px 16px;
  width: 100%;
  height: 48px;
`;

const Button = styled.button`
  ${flex({ alignItems: 'center', justifyContent: 'center' })}
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;
