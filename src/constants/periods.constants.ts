import { getCurrentPeriod } from '@/utils/period-helpers.utils';

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export const CURRENT_PERIOD = getCurrentPeriod();
export const CURRENT_YEAR = CURRENT_PERIOD.year;
export const CURRENT_MONTH = CURRENT_PERIOD.month;
