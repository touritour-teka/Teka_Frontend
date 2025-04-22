const extractLatLngFromMapsUrl = (url: string): { lat: number; lng: number } | null => {
  const atPattern = url.match(/@([\d.]+),([\d.]+)/);
  if (atPattern) {
    return { lat: parseFloat(atPattern[1]), lng: parseFloat(atPattern[2]) };
  }

  const bangPattern = url.match(/!3d([\d.]+)!4d([\d.]+)/);
  if (bangPattern) {
    return { lat: parseFloat(bangPattern[1]), lng: parseFloat(bangPattern[2]) };
  }

  try {
    const parsedUrl = new URL(url);
    const qParam = parsedUrl.searchParams.get('q');
    if (qParam) {
      const [latStr, lngStr] = qParam.split(',');
      const lat = parseFloat(latStr);
      const lng = parseFloat(lngStr);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
    }
  } catch (e) {
  }

  return null;
};

export default extractLatLngFromMapsUrl;
