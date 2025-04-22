const extractGoogleMapsQuery = (text: string): string | null => {
  const match = text.match(/(https:\/\/www\.google\.(com|co\.\w{2})\/maps[^\s]*)/);
  if (!match) return null;

  try {
    const url = new URL(match[1]);

    if (url.pathname.includes('/place/')) {
      const placeName = url.pathname.split('/place/')[1]?.split('/')[0];
      return decodeURIComponent(placeName || '');
    }

    if (url.searchParams.has('q')) {
      return url.searchParams.get('q');
    }
  } catch (e) {
    return null;
  }

  return null;
};

export default extractGoogleMapsQuery;
