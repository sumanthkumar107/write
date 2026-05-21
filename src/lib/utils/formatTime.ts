import { formatDistanceToNow, format, isToday, isYesterday, isThisWeek } from 'date-fns';

export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  
  if (isToday(date)) {
    return formatDistanceToNow(date, { addSuffix: true });
  }
  
  if (isYesterday(date)) {
    return 'yesterday';
  }
  
  if (isThisWeek(date)) {
    return formatDistanceToNow(date, { addSuffix: false });
  }
  
  if (date.getFullYear() === new Date().getFullYear()) {
    return format(date, 'MMM d');
  }
  
  return format(date, 'MMM d, yyyy');
}