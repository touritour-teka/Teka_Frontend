import { color, font } from '@teka/design-system';
import { Row, Text } from '@teka/ui';
import { flex } from '@teka/utils';
import styled from 'styled-components';
import {
  isGoogleMapsUrl,
  extractGoogleMapsUrl,
} from '@teka/utils/functions/isGoogleMapsUrl';

interface OwnMessageProps {
  name: string;
  content: string;
  timestamp: string;
}

const OwnMessage = ({ name, content, timestamp }: OwnMessageProps) => {
  const hasGoogleMapsUrl = isGoogleMapsUrl(content);
  const googleMapsUrl = hasGoogleMapsUrl ? extractGoogleMapsUrl(content) : null;

  return (
    <StyledOwnMessage>
      <Text fontType="medi14">{name}</Text>
      <Row gap={6} alignItems="flex-end">
        <Timestamp>{timestamp}</Timestamp>
        <MessageBubble>
          {content}
          {googleMapsUrl && (
            <MapPreviewContainer>
              <iframe
                src={googleMapsUrl}
                width="250"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </MapPreviewContainer>
          )}
        </MessageBubble>
      </Row>
    </StyledOwnMessage>
  );
};

export default OwnMessage;

const StyledOwnMessage = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'flex-end' })};
  margin-bottom: 8px;
  margin-top: 8px;
  gap: 8px;
`;

const MessageBubble = styled.div`
  ${flex({ flexDirection: 'column' })}; // Changed to column to stack map below text
  ${font.regular14chat}
  background-color: ${color.blue800};
  color: ${color.white2};
  padding: 12px;
  border-radius: 16px 0px 16px 16px;
  max-width: 80%;
  word-wrap: break-word;
`;

const Timestamp = styled.div`
  ${font.regular12chat}
  color: ${color.wireframe2};
  margin-top: 4px;
`;

const MapPreviewContainer = styled.div`
  margin-top: 8px;
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;
