import { color, font } from '@teka/design-system';
import { Column, Row, Text } from '@teka/ui';
import { flex } from '@teka/utils';
import React, { useState } from 'react';
import styled from 'styled-components';
import { IconTranslate } from '@teka/icon';
import {
  isGoogleMapsUrl,
  extractGoogleMapsQuery,
  extractLatLngFromMapsUrl,
} from '@/utils/index';
import { useNavigate } from 'react-router-dom';
import getMapEmbedUrl from '@/apis/maps/getMapEmbedUrl';
import { useAddressFromLatLng } from '@/hooks/maps/useAddressFromLatLng';

interface OtherPersonMessageProps {
  name: string;
  content: string;
  timestamp: string;
  translatedContent: string;
  hideMeta?: boolean;
}

const OtherPersonMessage: React.FC<OtherPersonMessageProps> = ({
  name,
  content,
  timestamp,
  translatedContent,
  hideMeta,
}) => {
  const [isTranslate, setIsTranslate] = useState(false);
  const handleClickTranslateButton = () => setIsTranslate(true);

  const isImageUrl = (url: string) => /\.(png|jpg|jpeg|gif|webp)$/i.test(url);
  const isMapUrl = isGoogleMapsUrl(content);
  const query = isMapUrl ? extractGoogleMapsQuery(content) : null;
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_API_KEY;
  const iframeSrc =
    query && GOOGLE_MAPS_API_KEY ? getMapEmbedUrl(query, GOOGLE_MAPS_API_KEY) : '';
  const coords = extractLatLngFromMapsUrl(content);
  const address = useAddressFromLatLng(coords?.lat, coords?.lng, GOOGLE_MAPS_API_KEY);
  const navigate = useNavigate();

  const handleGoToMap = () => {
    if (coords?.lat && coords?.lng) {
      navigate(`/map?lat=${coords.lat}&lng=${coords.lng}`);
    }
  };

  const handleClickPaste = () => {
    if (address) {
      navigator.clipboard.writeText(address).then(() => {
        alert('주소가 복사되었습니다.');
      });
    }
  };

  return (
    <StyledOtherMessageContainer>
      <Column gap={6}>
        <Text fontType="regular14">{!hideMeta ? name : ''}</Text>
        <Row gap={6} alignItems="flex-end">
          <MessageContainer iframeSrc={iframeSrc}>
            {iframeSrc ? (
              <MapPreviewContainer onClick={handleGoToMap}>
                <div>
                  <iframe
                    title="지도 미리보기"
                    src={iframeSrc}
                    width="250"
                    height="190"
                    style={{ border: 0, pointerEvents: 'none' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
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
            ) : isImageUrl(content) ? (
              <StyledImage src={content} alt="image" />
            ) : (
              <StyledText>{content}</StyledText>
            )}
            {isTranslate && <TranslatedLine />}
            {isTranslate && (
              <StyledText color={color.blue800}>{translatedContent}</StyledText>
            )}
          </MessageContainer>
          <Column>
            {!isTranslate && (
              <>
                <div onClick={handleClickTranslateButton}>
                  <IconTranslate width={24} height={24} />
                </div>
                {!hideMeta && (
                  <Text fontType="regular12chat" color={color.wireframe2}>
                    {timestamp}
                  </Text>
                )}
              </>
            )}
            {isTranslate && !hideMeta && (
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
  ${flex({ flexDirection: 'column', alignItems: 'flex-start' })};
`;

const MessageContainer = styled.div<{ iframeSrc: string }>`
  background: ${color.white2};
  border-radius: 0 12px 12px 12px;
  padding: ${({ iframeSrc }) => (iframeSrc ? '8px 12px' : '0px')};
`;

const StyledText = styled.div<{ color?: string }>`
  ${font.regular14chat};
  color: ${(props) => props.color || color.gray900};
  padding: 12px;
`;

const TranslatedLine = styled.div`
  border: 1px dashed ${color.gray100};
`;

const StyledImage = styled.img`
  max-width: 250px;
  border-radius: 12px;
  display: block;
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
