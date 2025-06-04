import { IconLocation } from '@teka/icon';
import { color } from '@teka/design-system';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import MapContainer from './MapContainer';
import LocationButton from './LocationButton';
import { useInitializeMap } from '@/hooks/maps/useInitializeMap';
import OverlayContent from './OverlayContent';
import MapOverlayView from './MapOverview';

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
    max-width: fit-content !important;
  }
  .gm-style-iw-d {
    padding: none;
  }
`;

interface MapContentProps {
  lat: number;
  lng: number;
}

const MapContent = ({ lat, lng }: MapContentProps) => {
  const {
    mapRef,
    handleLocationButtonClick,
    isOverlayOpen,
    address,
    setIsOverlayOpen,
    map,
    markerPosition,
  } = useInitializeMap({ lat, lng });

  return (
    <>
      <GlobalMapStyles />
      <StyledMapContent>
        <MapContainer ref={mapRef} />
        <LocationButton onClick={handleLocationButtonClick}>
          <IconLocation width={47} height={37} color={color.gray900} />
        </LocationButton>
        {isOverlayOpen && (
          <MapOverlayView map={map} position={markerPosition}>
            <OverlayContent
              address={address}
              lat={lat}
              lng={lng}
              onSendComplete={() => setIsOverlayOpen(false)}
            />
          </MapOverlayView>
        )}
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

