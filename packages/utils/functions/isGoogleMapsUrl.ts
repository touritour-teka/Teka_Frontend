export const isGoogleMapsUrl = (text: string) => {
  return /https?:\/\/(www\.)?(google\.com\/maps|maps\.app\.goo\.gl)\/.+/.test(text);
};

export const extractGoogleMapsUrl = (text: string) => {
  const match = text.match(
    /(https?:\/\/(www\.)?(google\.com\/maps|maps\.app\.goo\.gl)\/[^\s]+)/
  );

  if (!match) return null;

  const url = match[1];

  if (url.includes('maps.app.goo.gl')) {
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.4!2m3!1f0!2m2!1f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDI0JzE0LjQiTiAxMDDCsDI4JzM2LjAiRQ!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus&ehbc=2E312F`;
  }

  if (url.includes('google.com/maps')) {
    if (!url.includes('/embed')) {
      return url.replace(/(\/place\/|\/search\/|\/\@)/, '/embed/');
    }
    return url;
  }

  return url;
};
