import { IconLocation } from '@teka/icon';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, opts?: MapOptions);
      setCenter(latLng: LatLngLiteral | LatLng): void;
      setZoom(zoom: number): void;
    }

    class Marker {
      constructor(opts?: MarkerOptions);
    }

    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
    }

    namespace SymbolPath {
      const CIRCLE: number;
    }

    interface MapOptions {
      center?: LatLngLiteral | LatLng;
      zoom?: number;
      mapTypeControl?: boolean;
      fullscreenControl?: boolean;
      streetViewControl?: boolean;
    }

    interface LatLngLiteral {
      lat: number;
      lng: number;
    }

    interface MarkerOptions {
      position: LatLngLiteral | LatLng;
      map?: Map;
      icon?: any;
    }
  }
}
declare global {
  interface Window {
    google: typeof google;
  }
}

interface Coordinates {
  lat: number;
  lng: number;
}

const MapContent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if (!window.google) {
      const loadGoogleMapsScript = (): void => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initializeMap;
        document.head.appendChild(script);
      };

      loadGoogleMapsScript();
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

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const userPos: Coordinates = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setUserLocation(userPos);

            mapInstance.setCenter(userPos);

            new window.google.maps.Marker({
              position: userPos,
              map: mapInstance,
              icon: {
                path: window.google.maps.Marker,
              },
            });
          },
          (error: GeolocationPositionError) => {
            console.error('Error getting user location:', error);
          }
        );
      }
    }
  }, []);

  const handleLocationButtonClick = (): void => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const userPos: Coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          setUserLocation(userPos);

          console.log("User's current location:", userPos);

          if (map) {
            map.setCenter(userPos);
          }
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
