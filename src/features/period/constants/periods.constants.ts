import { getCurrentPeriod } from '@/features/period/utils/period.utils';
import { Period } from '../types/period.types';

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

interface PeriodButtonConfig {
  name: string;
  value: string;
  label: string;
  isStandalone?: boolean;
}

export const PERIOD_BUTTONS_CONFIG: PeriodButtonConfig[] = [
  {
    name: 'this-month',
    value: Period.ThisMonth,
    label: 'This Month',
  },
  {
    name: 'last-month',
    value: Period.LastMonth,
    label: 'Last Month',
  },
  {
    name: 'this-year',
    value: Period.ThisYear,
    label: 'This Year',
  },
  {
    name: 'last-year',
    value: Period.LastYear,
    label: 'Last Year',
  },
  {
    name: 'select-period',
    value: Period.SelectPeriod,
    label: 'Select Period',
    isStandalone: true,
  },
];
