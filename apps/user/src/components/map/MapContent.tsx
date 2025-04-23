import { IconLocation } from '@teka/icon';
import { flex } from '@teka/utils';
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
      newContent.style.padding = '10px 12px';
      newContent.style.fontSize = '16px';
      newContent.style.fontWeight = 'bold';
      newContent.style.cursor = 'pointer';

      const addressDiv = document.createElement('div');
      addressDiv.style.marginTop = '8px';
      addressDiv.style.fontSize = '14px';
      addressDiv.innerText = markerAddress;

      newContent.innerText = '이 위치 보내기';
      newContent.appendChild(addressDiv);

      overlayRef.current.setContent(newContent);
    }
  }, [markerAddress]);

  useEffect(() => {
    const fallbackLocation: Coordinates = { lat: 37.5665, lng: 126.978 };

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
          const pos = marker.getPosition();
          if (pos) {
            alert(`이 위치를 보냅니다: ${pos.lat().toFixed(6)}, ${pos.lng().toFixed(6)}`);
          }
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
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userPos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              setUserLocation(userPos);
              initializeMap(userPos);
            },
            () => {
              initializeMap(fallbackLocation);
            }
          );
        } else {
          initializeMap(fallbackLocation);
        }
      };
      document.head.appendChild(script);
    };

    if (!window.google) {
      loadMapScript();
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userPos);
          initializeMap(userPos);
        },
        () => {
          initializeMap(fallbackLocation);
        }
      );
    }
  }, []);

  const geocodeLatLng = (latlng: Coordinates) => {
    const geocoder = new window.google.maps.Geocoder();
    const latlngObj = new window.google.maps.LatLng(latlng.lat, latlng.lng);

    geocoder.geocode({ location: latlngObj }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        setMarkerAddress(results[0].formatted_address);
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
      });
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
