export const loadGoogleMapScript = (onLoadCallback: () => void) => {
  const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_API_KEY;

  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
  script.async = true;
  script.defer = true;
  script.onload = onLoadCallback;
  document.head.appendChild(script);
};
