export const formatTimestamp = (timestampString: string) => {
  const date = new Date(timestampString);
  const options = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  const formattedDate = date.toLocaleString('en-US', options);

  // Extract day from the date to add suffix (e.g., 1st, 2nd, 3rd, 4th)
  const day = date.getDate();
  const suffix = getDaySuffix(day);

  return `${formattedDate.replace(/\d{1,2}(?=(st|nd|rd|th))/g, '$&' + suffix)}`;
};

// Function to get day suffix (st, nd, rd, th)
const getDaySuffix = day => {
  if (day >= 11 && day <= 13) {
    return 'th';
  }
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};
