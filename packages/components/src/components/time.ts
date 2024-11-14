import { format } from 'date-fns'

export const formatDate = (date: number | string | Date) =>
  format(new Date(date), 'yyyy/MM/dd')

export const formatTime = (date: number | string | Date) =>
  format(new Date(date), 'yyyy/MM/dd HH:mm:ss')
