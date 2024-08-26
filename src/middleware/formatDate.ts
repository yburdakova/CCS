export const timeToString = (date: Date): string => {
  return date.toISOString();
};

export const formatDateTime = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);

  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${month}/${day}/${year} at ${hours}:${minutes}`;
};