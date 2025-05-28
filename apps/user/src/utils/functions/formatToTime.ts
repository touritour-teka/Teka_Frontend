const formatToTime = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export default formatToTime;