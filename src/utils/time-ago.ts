export function TimeAgo(timestamp: number) {
  const diff = Math.floor((Date.now() - timestamp * 1000) / 1000);

  if (diff < 60)
    return `${diff} seconds ago`;

  const minutes = Math.floor(diff / 60);
  if (minutes < 60)
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24)
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;

  const days = Math.floor(hours / 24);
  if (days < 30)
    return `${days} day${days !== 1 ? 's' : ''} ago`;

  const months = Math.floor(days / 30);
  if (months < 12)
    return `${months} month${months !== 1 ? 's' : ''} ago`;

  const years = Math.floor(days / 365);

  return `${years} year${years !== 1 ? 's' : ''} ago`;
}
