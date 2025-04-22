const fetchAddressFromLatLng = async (
  lat: number,
  lng: number,
  apiKey: string
): Promise<string | null> => {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}&language=ko`
    );
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted_address;
    }
    return null;
  } catch (e) {
    console.error('Geocoding API Error:', e);
    return null;
  }
};

export default fetchAddressFromLatLng;
