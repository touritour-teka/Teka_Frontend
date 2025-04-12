import { css } from 'styled-components';

const fontGenerator = (
  weight: number,
  size: number,
  lineHeight: number,
  letterSpacing: number
) => css`
  font-family: 'Pretendard Variable';
  font-weight: ${weight};
  font-size: ${size}px;
  line-height: ${lineHeight}%;
  letter-spacing: ${letterSpacing}%;
`;

const font = {
  medi18: fontGenerator(500, 18, 100, 0),
  semibold18: fontGenerator(600, 18, 100, 0),

  semibold16: fontGenerator(600, 16, 140, 1),

  medi14: fontGenerator(500, 14, 100, 1),
  regular14: fontGenerator(400, 14, 100, 1),
  regular14chat: fontGenerator(400, 14, 140, -1),
  semibold14chat: fontGenerator(600, 14, 100, 1),
  regular14chat_underlined: fontGenerator(400, 14, 160, 1),

  medi12: fontGenerator(500, 12, 100, 1),
  regular12: fontGenerator(400, 12, 140, 1),
  regular12chat: fontGenerator(400, 12, 100, -1),
};

export default font;
