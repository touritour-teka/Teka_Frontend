import { color } from '@teka/design-system';
import { IconArrowForward, IconLocation } from '@teka/icon';
import { flex } from '@teka/utils';
import { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalMapStyles = createGlobalStyle`
  .gm-style-iw-chr {
    display: none !important;
  }
  .gm-style .gm-style-iw-c {
    padding: 10px 12px !important;
    box-shadow: 0px 40px 11px 0px rgba(135, 135, 135, 0.00), 0px 14px 9px 0px rgba(135, 135, 135, 0.05), 0px 6px 6px 0px rgba(135, 135, 135, 0.09), 0px 2px 3px 0px rgba(135, 135, 135, 0.10) !important;
  }
  .gm-style-iw-d {
    overflow: auto !important;
  }
`;

interface Coordinates {
  lat: number;
  lng: number;
}

interface MapContentProps {
  lat: number;
  lng: number;
}

const MapContent = ({ lat, lng }: MapContentProps) => {
  const [markerPosition, setMarkerPosition] = useState<Coordinates | null>(null);
  const [markerAddress, setMarkerAddress] = useState<string>('');
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const overlayRef = useRef<google.maps.InfoWindow | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if (overlayRef.current) {
      const newContent = document.createElement('div');
      newContent.style.fontSize = '14px';
      newContent.style.fontWeight = '500';
      newContent.style.letterSpacing = '0.14px';
      newContent.style.height = '100%';
      newContent.style.fontFamily = 'Pretendard';
      newContent.style.cursor = 'pointer';
      newContent.style.display = 'flex';
      newContent.style.flexDirection = 'column';

      const rowContainer = document.createElement('div');
      rowContainer.style.display = 'flex';
      rowContainer.style.alignItems = 'center';
      rowContainer.style.justifyContent = 'space-between';
      rowContainer.style.gap = '18px';

      const textContainer = document.createElement('div');
      textContainer.style.display = 'flex';
      textContainer.style.flexDirection = 'column';

      const labelDiv = document.createElement('div');
      labelDiv.innerText = '이 위치 보내기';
      labelDiv.style.fontSize = '14px';
      labelDiv.style.fontWeight = '500';

      const addressDiv = document.createElement('div');
      addressDiv.style.marginTop = '4px';
      addressDiv.style.fontSize = '12px';
      addressDiv.style.fontWeight = '400';
      addressDiv.style.lineHeight = '140%';
      addressDiv.style.letterSpacing = '0.12px';
      addressDiv.innerText = markerAddress;

      textContainer.appendChild(labelDiv);
      textContainer.appendChild(addressDiv);

      const iconContainer = document.createElement('div');
      const root = createRoot(iconContainer);
      root.render(<IconArrowForward width={24} height={24} color={color.gray900} />);
      iconContainer.style.marginLeft = 'auto';

      rowContainer.appendChild(textContainer);
      rowContainer.appendChild(iconContainer);

      newContent.appendChild(rowContainer);

      overlayRef.current.setContent(newContent);
    }
  }, [markerAddress]);

  useEffect(() => {
    const fallbackLocation: Coordinates = { lat, lng };

    const initializeMap = (location: Coordinates): void => {
      if (!mapRef.current) return;

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: location,
        zoom: 15,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
      });

      setMap(mapInstance);

      const marker = new window.google.maps.Marker({
        position: location,
        map: mapInstance,
        draggable: true,
      });

      markerRef.current = marker;
      setMarkerPosition(location);
      geocodeLatLng(location);

      const infoWindow = new window.google.maps.InfoWindow();
      overlayRef.current = infoWindow;
      infoWindow.open(mapInstance, marker);

      window.google.maps.event.addListener(marker, 'dragend', () => {
        const pos = marker.getPosition();
        if (pos) {
          const newCoords = { lat: pos.lat(), lng: pos.lng() };
          setMarkerPosition(newCoords);
          geocodeLatLng(newCoords);
        }
      });

      window.google.maps.event.addListener(infoWindow, 'domready', () => {
        const popup = document.querySelector('.gm-style-iw')?.parentElement;
        popup?.addEventListener('click', () => {
          const pos = markerRef.current?.getPosition();
          if (!pos) return;

          const lat = pos.lat();
          const lng = pos.lng();
          const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

          alert(`이 위치를 보냅니다: ${markerAddress}\n\n${googleMapUrl}`);
          console.log(`이 위치를 보냅니다: ${googleMapUrl}`);
        });
      });
    };

    const loadMapScript = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(() => {
            initializeMap(fallbackLocation);
          });
        } else {
          initializeMap(fallbackLocation);
        }
      };
      document.head.appendChild(script);
    };

    if (!window.google) {
      loadMapScript();
    } else {
      navigator.geolocation.getCurrentPosition(() => {
        initializeMap(fallbackLocation);
      });
    }
  }, []);

  const geocodeLatLng = (latlng: Coordinates, callback?: () => void) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlngObj = new window.google.maps.LatLng(latlng.lat, latlng.lng);

    geocoder.geocode({ location: latlngObj }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        setMarkerAddress(results[0].formatted_address);
        if (callback) callback();
      }
    });
  };

  const handleLocationButtonClick = (): void => {
    if (!map || !markerRef.current) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
        const userPos: Coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(userPos);

        map.setCenter(userPos);
        markerRef.current!.setPosition(userPos);
        overlayRef.current?.open(map, markerRef.current!);

        geocodeLatLng(userPos);
      });
    }
  };

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

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const LocationButton = styled.button`
  ${flex({ justifyContent: 'center', alignItems: 'center' })};
  position: absolute;
  top: 28px;
  left: 16px;
  cursor: pointer;
  z-index: 10;
`;
