import { color } from '@teka/design-system';
import { IconLocation } from '@teka/icon';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

interface Coordinates {
  lat: number;
  lng: number;
}

const CustomOverlay: React.FC<{
  map: google.maps.Map;
  position: google.maps.LatLngLiteral;
  children: React.ReactNode;
}> = ({ map, position, children }) => {
  const overlayRef = useRef<google.maps.OverlayView | null>(null);
  const container = useRef(document.createElement('div'));
  container.current.style.transform = 'translate(-50%, -100%)';

  useEffect(() => {
    const Overlay = class extends google.maps.OverlayView {
      onAdd() {
        const panes = this.getPanes();
        if (panes) panes.overlayMouseTarget.appendChild(container.current);
      }

      draw() {
        const projection = this.getProjection();
        if (!projection) return;
        const point = projection.fromLatLngToDivPixel(new google.maps.LatLng(position));
        if (point && container.current.style) {
          container.current.style.left = `${point.x}px`;
          container.current.style.top = `${point.y}px`;
        }
      }

      onRemove() {
        container.current.remove();
      }
    };

    overlayRef.current = new Overlay();
    overlayRef.current.setMap(map);

    return () => {
      overlayRef.current?.setMap(null);
    };
  }, [map, position]);

  return createPortal(children, container.current);
};

const MapContent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const overlayRef = useRef<google.maps.InfoWindow | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    } else {
      initializeMap();
    }

    function initializeMap(): void {
      if (!mapRef.current) return;

      const defaultLocation: Coordinates = { lat: 37.5665, lng: 126.978 };

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: defaultLocation,
        zoom: 15,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
      });

      setMap(mapInstance);

      const marker = new window.google.maps.Marker({
        position: defaultLocation,
        map: mapInstance,
        draggable: true,
      });

      markerRef.current = marker;

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px 12px; font-size: 16px; font-weight: bold; cursor: pointer;">
            이 위치 보내기
          </div>
        `,
      });

      overlayRef.current = infoWindow;

      infoWindow.open(mapInstance, marker);

      window.google.maps.event.addListener(infoWindow, 'domready', () => {
        const popup = document.querySelector('.gm-style-iw')?.parentElement;
        popup?.addEventListener('click', () => {
          const pos = marker.getPosition();
          if (pos) {
            alert(`이 위치를 보냅니다: ${pos.lat().toFixed(6)}, ${pos.lng().toFixed(6)}`);
          }
        });
      });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const userPos: Coordinates = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setUserLocation(userPos);
            mapInstance.setCenter(userPos);
            marker.setPosition(userPos);
          },
          (error: GeolocationPositionError) => {
            console.error('Error getting user location:', error);
          }
        );
      }
    }
  }, []);

  const handleLocationButtonClick = (): void => {
    if (!map || !markerRef.current) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const userPos: Coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userPos);

          map.setCenter(userPos);
          markerRef.current!.setPosition(userPos);
          overlayRef.current?.open(map, markerRef.current!);
        },
        (error: GeolocationPositionError) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <StyledMapContent>
      <MapContainer ref={mapRef} />
      <LocationButton onClick={handleLocationButtonClick}>
        <IconLocation width={47} height={37} />
      </LocationButton>
    </StyledMapContent>
  );
};

export default MapContent;

const StyledMapContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const LocationButton = styled.button`
  position: absolute;
  top: 28px;
  left: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
`;

const InfoBox = styled.div`
  position: absolute;
  transform: translate(0%, 0%);
  background: white;
  border-radius: 8px;
  padding: 8px 12px;
  font-weight: bold;
  font-size: 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 100;
`;
