const formatSingleDate = (date: Date | null): string => {
  if (!date) return '';

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

export const formatDateRange = (
  startDate: Date | null,
  endDate: Date | null
): { startDateStr: string; endDateStr: string; diffDays: number } => {
  const startDateStr = formatSingleDate(startDate);
  const endDateStr = formatSingleDate(endDate);

  const differenceInDays = (endDate: Date | null, startDate: Date | null): number => {
    if (!endDate || !startDate) return 0;
    return Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
  };

  let diffDays = 0;
  if (startDate && endDate) {
    diffDays = differenceInDays(endDate, startDate) + 1;
  }

  return {
    startDateStr,
    endDateStr,
    diffDays,
  };
};

export default formatDateRange;
