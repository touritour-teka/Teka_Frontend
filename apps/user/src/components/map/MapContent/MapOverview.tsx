import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface MapOverlayViewProps {
  map: google.maps.Map | null;
  position: google.maps.LatLngLiteral;
  children: React.ReactNode;
}

const MapOverlayView = ({ map, position, children }: MapOverlayViewProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!window.google?.maps) return;
    const overlay = new window.google.maps.OverlayView();

    overlay.onAdd = () => {
      containerRef.current = document.createElement('div');
      containerRef.current.style.position = 'absolute';
      overlay.getPanes()?.floatPane.appendChild(containerRef.current);
      setReady(true);
    };

    overlay.draw = () => {
      if (!containerRef.current) return;
      const projection = overlay.getProjection();
      const pos = projection.fromLatLngToDivPixel(
        new window.google.maps.LatLng(position)
      );
      if (pos) {
        containerRef.current.style.left = `${pos.x}px`;
        containerRef.current.style.top = `${pos.y}px`;
        containerRef.current.style.transform = 'translate(-50%, -100%)';
      }
    };

    overlay.onRemove = () => {
      containerRef.current?.remove();
    };

    overlay.setMap(map);

    return () => {
      overlay.setMap(null);
    };
  }, [map, position.lat, position.lng]);

  if (!ready || !containerRef.current) return null;
  return createPortal(children, containerRef.current);
};

export default MapOverlayView;
