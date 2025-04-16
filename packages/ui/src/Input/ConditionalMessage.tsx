import { color, font } from '@teka/design-system';
import styled, { css } from 'styled-components';

interface Props {
  message?: string;
  errorMessage?: string;
  isError?: boolean;
}

const ConditionalMessage = ({ message, errorMessage, isError = false }: Props) => {
  return isError ? (
    errorMessage ? (
      <div style={{ position: 'relative' }}>
        <StyledConditionalMessage $isError={true}>
          {errorMessage}
        </StyledConditionalMessage>
      </div>
    ) : null
  ) : message ? (
    <StyledConditionalMessage $isError={false}>{message}</StyledConditionalMessage>
  ) : null;
};

export default ConditionalMessage;

const StyledConditionalMessage = styled.p<{ $isError: boolean }>`
  ${(props) =>
    props.$isError
      ? css`
          position: absolute;
          top: 0;
          left: 0;
          ${font.regular12}
          color: ${color.blue100};
          margin-top: 8px;
        `
      : css`
          ${font.regular12};
          color: ${color.blue100};
          margin-top: 4px;
        `}
`;
