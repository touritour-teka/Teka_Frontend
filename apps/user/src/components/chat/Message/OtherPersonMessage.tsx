import { color, font } from '@teka/design-system';
import { Column, Row, Text } from '@teka/ui';
import { flex } from '@teka/utils';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IconTranslate } from '@teka/icon';

interface OtherPersonMessageProps {
  name: string;
  content: string;
  timestamp: string;
  translatedContent: string;
  prevTimestamp?: string;
}

const OtherPersonMessage: React.FC<OtherPersonMessageProps> = ({
  name,
  content,
  timestamp,
  translatedContent,
  prevTimestamp,
}) => {
  const [isTranslate, setIsTranslate] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);

  useEffect(() => {
    if (prevTimestamp === timestamp) {
      setIsFirstMessage(false);
    }
  }, [prevTimestamp, timestamp]);

  const handleClickTranslateButton = () => {
    setIsTranslate(true);
  };

  return (
    <StyledOtherMessageContainer>
      <Column gap={6}>
        <Text fontType="regular14">{isFirstMessage ? name : ''}</Text>
        <Row gap={6} alignItems="flex-end">
          <MessageContainer>
            <StyledText>{content}</StyledText>
            {isTranslate && <TranslatedLine />}
            {isTranslate ? (
              <StyledText color={color.blue800}>{translatedContent}</StyledText>
            ) : null}
          </MessageContainer>
          <Column>
            {!isTranslate ? (
              <>
                <IconWrapper onClick={handleClickTranslateButton}>
                  <IconTranslate width={24} height={24} />
                </IconWrapper>
                <Text fontType="regular12chat" color={color.wireframe2}>
                  {timestamp}
                </Text>
              </>
            ) : (
              <Text fontType="regular12chat" color={color.wireframe2}>
                {timestamp}
              </Text>
            )}
          </Column>
        </Row>
      </Column>
    </StyledOtherMessageContainer>
  );
};

export default OtherPersonMessage;

const StyledOtherMessageContainer = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'flex-start' })}
  margin-bottom: 8px;
`;

const MessageContainer = styled.div`
  background: ${color.white2};
  border-radius: 0 12px 12px 12px;
`;

const StyledText = styled.div<{ color?: string }>`
  ${font.regular14chat};
  color: ${(props) => props.color || color.gray900};
  padding: 12px;
`;

const TranslatedLine = styled.div`
  border: 1px dashed ${color.gray100};
`;

const IconWrapper = styled.div``;
