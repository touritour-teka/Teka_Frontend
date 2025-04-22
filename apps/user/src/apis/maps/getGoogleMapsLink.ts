const getGoogleMapsLink = (lat: number, lng: number) => {
  return `https://www.google.com/maps?q=${lat},${lng}`;
};

export default getGoogleMapsLink;
