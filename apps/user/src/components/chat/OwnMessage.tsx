import { color, font } from '@teka/design-system';
import { Row, Text } from '@teka/ui';
import { flex } from '@teka/utils';
import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

export const isGoogleMapsUrl = (text: string) => {
  return /https?:\/\/(www\.)?(google\.com\/maps|maps\.app\.goo\.gl)\/.+/.test(text);
};

export const extractGoogleMapsUrl = (text: string) => {
  const match = text.match(
    /(https?:\/\/(www\.)?(google\.com\/maps|maps\.app\.goo\.gl)\/[^\s]+)/
  );
  return match ? match[1] : null;
};

export const extractLocationInfo = (url: string, content: string) => {
  return {
    locationName: '현재 위치',
    locationAddress: '서울 성동구 왕십리로 83-21 에스엠엔터테인먼트 복사',
  };
};

interface OwnMessageProps {
  name: string;
  content: string;
  timestamp: string;
}

const OwnMessage = ({ name, content, timestamp }: OwnMessageProps) => {
  const [isMapLoading, setIsMapLoading] = useState(false);

  const googleMapsUrl = extractGoogleMapsUrl(content);

  const locationInfo = googleMapsUrl ? extractLocationInfo(googleMapsUrl, content) : null;

  return (
    <StyledOwnMessage>
      <Text fontType="medi14">{name}</Text>
      <Row gap={6} alignItems="flex-end">
        <Timestamp>{timestamp}</Timestamp>
        {googleMapsUrl ? (
          <MapContainer href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
            <MapPreview>
              {isMapLoading && (
                <MapLoadingContainer>
                  <MapLoadingText>지도 로딩 중...</MapLoadingText>
                </MapLoadingContainer>
              )}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.0283369323434!2d127.04456787665628!3d37.5442814264638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca4944a7dbcbd%3A0x839a27510c519aed!2s83-21%20Wangsimni-ro%2C%20Seongdong-gu%2C%20Seoul!5e0!3m2!1sen!2skr!4v1713792005733!5m2!1sen!2skr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setIsMapLoading(false)}
                onError={() => setIsMapLoading(false)}
              ></iframe>
            </MapPreview>
            <LocationInfo>
              <LocationPinIcon />
              <LocationTextContainer>
                <LocationText>저는 현재 여기에 있어요!</LocationText>
                <LocationAddress>
                  서울 성동구 왕십리로 83-21 에스엠엔터테인먼트 복사
                </LocationAddress>
              </LocationTextContainer>
            </LocationInfo>
          </MapContainer>
        ) : (
          <MessageBubble>{content}</MessageBubble>
        )}
      </Row>
    </StyledOwnMessage>
  );
};

export default OwnMessage;

const LocationPinIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
      fill="#FF5353"
    />
  </svg>
);

const StyledOwnMessage = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'flex-end' })};
  margin-bottom: 8px;
  margin-top: 8px;
  gap: 8px;
`;

const MessageBubble = styled.div`
  ${flex({ flexDirection: 'column' })};
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

const MapContainer = styled.a`
  ${flex({ flexDirection: 'column' })};
  background-color: ${color.blue900};
  border-radius: 16px;
  overflow: hidden;
  max-width: 80%;
  text-decoration: none;

  &:hover {
    opacity: 0.95;
  }
`;

const MapPreview = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  overflow: hidden;
`;

const MapLoadingContainer = styled.div`
  ${flex({ justifyContent: 'center', alignItems: 'center' })};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const MapLoadingText = styled.div`
  color: ${color.white2};
  background-color: rgba(0, 0, 0, 0.5);
  padding: 8px 16px;
  border-radius: 16px;
`;

const LocationInfo = styled.div`
  ${flex({ flexDirection: 'row', alignItems: 'flex-start' })};
  padding: 12px;
  gap: 8px;
`;

const LocationTextContainer = styled.div`
  ${flex({ flexDirection: 'column' })};
  flex: 1;
`;

const LocationText = styled.div`
  ${font.medi12}
  color: ${color.white2};
  margin-bottom: 4px;
`;

const LocationAddress = styled.div`
  ${font.regular14}
  color: ${color.white2};
  word-break: break-word;
`;
