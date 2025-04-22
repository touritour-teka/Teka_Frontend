const getMapEmbedUrl = (query: string, apiKey: string): string => {
  if (!query || !apiKey) return '';
  return `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query}`;
};

export default getMapEmbedUrl;
