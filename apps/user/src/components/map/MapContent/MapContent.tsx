import { IconLocation } from '@teka/icon';
import { color } from '@teka/design-system';
import { flex } from '@teka/utils';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import MapContainer from './MapContainer';
import LocationButton from './LocationButton';
import OverlayContent from './OverlayContent';
import { useInitializeMap } from '@/hooks/maps/useInitializeMap';

const GlobalMapStyles = createGlobalStyle`
  .gm-style-iw-chr {
    display: none !important;
  }
  .gm-style .gm-style-iw-c {
    padding: 10px 12px !important;
    box-shadow: 0px 40px 11px 0px rgba(135, 135, 135, 0.00), 
                0px 14px 9px 0px rgba(135, 135, 135, 0.05), 
                0px 6px 6px 0px rgba(135, 135, 135, 0.09), 
                0px 2px 3px 0px rgba(135, 135, 135, 0.10) !important;
  }
  .gm-style-iw-d {
    overflow: auto !important;
  }
`;

interface MapContentProps {
  lat: number;
  lng: number;
}

const MapContent = ({ lat, lng }: MapContentProps) => {
  const { mapRef, handleLocationButtonClick } = useInitializeMap({ lat, lng });

  return (
    <>
      <GlobalMapStyles />
      <StyledMapContent>
        <MapContainer ref={mapRef} />
        <LocationButton onClick={handleLocationButtonClick}>
          <IconLocation width={47} height={37} color={color.gray900} />
        </LocationButton>
      </StyledMapContent>
    </>
  );
};

export default MapContent;

const StyledMapContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
