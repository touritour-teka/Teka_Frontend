interface Coordinates {
  lat: number;
  lng: number;
}

export const geocodeLatLng = (latlng: Coordinates) => {
  const geocoder = new window.google.maps.Geocoder();

  geocoder.geocode({ location: latlng }, (results, status) => {
    if (status === 'OK' && results && results[0]) {
      const address = results[0].formatted_address;
      console.log(address);
    }
  });
};
