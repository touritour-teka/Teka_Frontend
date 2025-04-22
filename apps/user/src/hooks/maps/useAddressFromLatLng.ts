import { useState, useEffect } from 'react';
import fetchAddressFromLatLng from '@/apis/maps/fetchAddressFromLatLng';

export const useAddressFromLatLng = (
  lat?: number,
  lng?: number,
  apiKey?: string
): string | null => {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    if (!lat || !lng || !apiKey) return;

    fetchAddressFromLatLng(lat, lng, apiKey).then((res) => {
      if (res) setAddress(res);
    });
  }, [lat, lng, apiKey]);

  return address;
};
