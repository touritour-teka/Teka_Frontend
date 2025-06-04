import { useState, useEffect, useRef, useCallback } from 'react';
import { loadGoogleMapScript } from '@/apis/maps/loadGoogleMapScript';

interface Coordinates {
  lat: number;
  lng: number;
}

export const useInitializeMap = ({ lat, lng }: { lat: number; lng: number }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [address, setAddress] = useState<string>('위치를 불러오는 중...');

  const [isOverlayOpen, setIsOverlayOpen] = useState(true);
  const [markerPosition, setMarkerPosition] = useState<Coordinates>({ lat, lng });

  const updateAddress = useCallback(
    (coords: Coordinates) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: coords }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const newAddress = results[0].formatted_address;
          setAddress(newAddress);
        }
      });
    },
    [setAddress]
  );

  const initializeMap = useCallback(
    (center: Coordinates) => {
      if (!mapRef.current || !window.google) return;

      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center,
        zoom: 15,
      });

      const marker = new window.google.maps.Marker({
        position: center,
        map: mapInstance,
        draggable: true,
      });

      marker.addListener('click', () => {
        setIsOverlayOpen(true);
      });

      marker.addListener('dragend', (event: google.maps.MapMouseEvent) => {
        const newCoords = {
          lat: event.latLng?.lat() ?? center.lat,
          lng: event.latLng?.lng() ?? center.lng,
        };
        marker.setPosition(newCoords);
        setMarkerPosition(newCoords);
        updateAddress(newCoords);
      });

      markerRef.current = marker;
      setMap(mapInstance);
      updateAddress(center);
    },
    [updateAddress, setIsOverlayOpen]
  );

  const handleLocationButtonClick = () => {
    if (!map || !markerRef.current) return;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(userPos);
        markerRef.current?.setPosition(userPos);
        setMarkerPosition(userPos);
        updateAddress(userPos);
      });
    }
  };

  useEffect(() => {
    const fallbackLocation = { lat, lng };

    const waitForGoogleMapsReady = (onReady: () => void) => {
      const check = () => {
        if (window.google?.maps) {
          onReady();
        } else {
          setTimeout(check, 50);
        }
      };
      check();
    };

    const waitForMapRef = () => {
      if (!window.google?.maps) {
        loadGoogleMapScript(() => {
          waitForGoogleMapsReady(() => {
            initializeMap(fallbackLocation);
          });
        });
      } else {
        initializeMap(fallbackLocation);
      }
    };

    waitForMapRef();
  }, [lat, lng, initializeMap]);

  return {
    mapRef,
    handleLocationButtonClick,
    isOverlayOpen,
    setIsOverlayOpen,
    address,
    map,
    markerPosition,
  };
};
