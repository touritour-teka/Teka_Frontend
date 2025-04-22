const isGoogleMapsUrl = (text: string): boolean => {
  return /https:\/\/(www\.google\.(com|co\.\w{2})\/maps(\?|\/)|maps\.app\.goo\.gl\/[^\s]+)/.test(
    text
  );
};

export default isGoogleMapsUrl;
