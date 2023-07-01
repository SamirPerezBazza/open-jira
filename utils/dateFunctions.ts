import { formatDistanceToNow } from 'date-fns'

export const getFormatDistanceToNow = (date: number) => {
  return formatDistanceToNow(date);
}