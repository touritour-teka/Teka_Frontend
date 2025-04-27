import { useState, useEffect, useRef } from 'react';
import { loadGoogleMapScript } from '@/apis/maps/loadGoogleMapScript';
import { createRoot } from 'react-dom/client';
import OverlayContent from '@/components/map/MapContent/OverlayContent';
import { geocodeLatLng } from '@/utils/functions/geocodeLatLng';

interface Coordinates {
  lat: number;
  lng: number;
}

export const useInitializeMap = ({ lat, lng }: { lat: number; lng: number }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const overlayRef = useRef<google.maps.InfoWindow | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const initializeMap = (center: Coordinates) => {
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

    const infoWindow = new window.google.maps.InfoWindow({
      content: '',
    });

    marker.addListener('dragend', (event: google.maps.MapMouseEvent) => {
      const newCoords = {
        lat: event.latLng?.lat() ?? center.lat,
        lng: event.latLng?.lng() ?? center.lng,
      };
      marker.setPosition(newCoords);
      geocodeLatLng(newCoords);
    });

    marker.addListener('click', () => {
      infoWindow.open(mapInstance, marker);
    });

    markerRef.current = marker;
    overlayRef.current = infoWindow;
    setMap(mapInstance);

    if (infoWindow) {
      const container = document.createElement('div');
      createRoot(container).render(<OverlayContent address="위치를 불러오는 중..." />);
      infoWindow.setContent(container);
    }
  };

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
        overlayRef.current?.open(map, markerRef.current);
        geocodeLatLng(userPos);
      });
    }
  };

  useEffect(() => {
    const fallbackLocation = { lat, lng };

    if (!window.google) {
      loadGoogleMapScript(() => initializeMap(fallbackLocation));
    } else {
      initializeMap(fallbackLocation);
    }
  }, [lat, lng]);

  return { mapRef, handleLocationButtonClick };
};
