import { color, font } from '@teka/design-system';
import { Row, Text } from '@teka/ui';
import { flex } from '@teka/utils';
import styled from 'styled-components';
import {
  isGoogleMapsUrl,
  extractGoogleMapsQuery,
  extractLatLngFromMapsUrl,
} from '@/utils/index';
import { useEffect, useState } from 'react';
import { useAddressFromLatLng } from '@/hooks/maps/useAddressFromLatLng';
import getMapEmbedUrl from '@/apis/maps/getMapEmbedUrl';

interface OwnMessageProps {
  name: string;
  content: string;
  timestamp: string;
  prevTimestamp?: string;
}

const OwnMessage: React.FC<OwnMessageProps> = ({
  name,
  content,
  timestamp,
  prevTimestamp,
}) => {
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_API_KEY;

  const [isFirstMessage, setIsFirstMessage] = useState(true);

  const hasGoogleMapsUrl = isGoogleMapsUrl(content);
  const query = hasGoogleMapsUrl ? extractGoogleMapsQuery(content) : null;

  const iframeSrc =
    query && GOOGLE_MAPS_API_KEY ? getMapEmbedUrl(query, GOOGLE_MAPS_API_KEY) : '';

  const coords = extractLatLngFromMapsUrl(content);
  const address = useAddressFromLatLng(coords?.lat, coords?.lng, GOOGLE_MAPS_API_KEY);

  useEffect(() => {
    if (prevTimestamp === timestamp) {
      setIsFirstMessage(false);
    }
  }, [prevTimestamp]);

  const handleClickPaste = () => {
    if (address) {
      navigator.clipboard.writeText(address).then(() => {
        alert('주소가 복사되었습니다.');
      });
    }
  };

  return (
    <StyledOwnMessage>
      <Text fontType="regular14">{isFirstMessage ? name : ''}</Text>
      <Row gap={6} justifyContent="flex-end" alignItems="flex-end">
        <Timestamp>{timestamp}</Timestamp>
        <MessageBubble>
          {iframeSrc ? (
            <MapPreviewContainer>
              <a href={content}>
                <iframe
                  src={iframeSrc}
                  width="250"
                  height="190"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </a>
              <Text fontType="semibold14chat">📍저는 현재 여기에 있어요!</Text>
              {address && (
                <AddressContainer onClick={handleClickPaste}>
                  <Text fontType="regular14chat_underlined" whiteSpace="pre-wrap">
                    <UnderlinedText>{address}</UnderlinedText>
                    <Text fontType="medi14" onClick={handleClickPaste}>
                      복사
                    </Text>
                  </Text>
                </AddressContainer>
              )}
            </MapPreviewContainer>
          ) : (
            <Text fontType="regular14chat" whiteSpace="pre-wrap">
              {content}
            </Text>
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
  gap: 8px;
  width: 100%;
`;

const MessageBubble = styled.div`
  ${flex({ justifyContent: 'flex-end' })};
  ${font.regular14chat}
  background-color: ${color.blue800};
  color: ${color.white2};
  padding: 12px;
  border-radius: 16px 0px 16px 16px;
  width: 80%;
  word-break: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

const Timestamp = styled.div`
  ${font.regular12chat}
  color: ${color.wireframe2};
  margin-top: 4px;
  white-space: nowrap;
`;

const MapPreviewContainer = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'flex-start' })};
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  gap: 16px;
`;

const AddressContainer = styled.div`
  cursor: pointer;
`;

const UnderlinedText = styled.span`
  text-decoration: underline;
`;
