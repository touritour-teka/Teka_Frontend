import { color } from '@teka/design-system';
import { IconSignUpCheckFalse, IconSignUpCheckTrue } from '@teka/icon';
import { Row, Text } from '@teka/ui';

interface ValidateItem {
  condition: boolean;
  text: string;
}

const ValidateItem = ({ condition, text }: ValidateItem) => {
  return (
    <Row alignItems="center">
      {condition ? <IconSignUpCheckTrue /> : <IconSignUpCheckFalse />}
      <Text fontType="regular12" color={condition ? color.blue800 : color.gray200}>
        {text}
      </Text>
    </Row>
  );
};

export default ValidateItem;
