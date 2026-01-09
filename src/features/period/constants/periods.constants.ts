import {
  CURRENT_MONTH,
  CURRENT_YEAR,
} from '@/shared/constants/current-period.constants';
import { getMonthKey, getPreviousMonth } from '../utils/period.utils';
import type { PeriodButtonConfig } from '../types/period.types';

const prevMonthInfo = getPreviousMonth(CURRENT_YEAR, CURRENT_MONTH);

export const PERIOD_VALUES = {
  THIS_MONTH: getMonthKey(CURRENT_YEAR, CURRENT_MONTH),
  LAST_MONTH: getMonthKey(prevMonthInfo.year, prevMonthInfo.month),
  THIS_YEAR: CURRENT_YEAR,
  LAST_YEAR: CURRENT_YEAR - 1,
} as const;

export const PERIOD_BUTTONS_CONFIG: PeriodButtonConfig[] = [
  {
    name: 'this-month',
    value: PERIOD_VALUES.THIS_MONTH,
    label: 'This Month',
  },
  {
    name: 'last-month',
    value: PERIOD_VALUES.LAST_MONTH,
    label: 'Last Month',
  },
  {
    name: 'this-year',
    value: PERIOD_VALUES.THIS_YEAR,
    label: 'This Year',
  },
  {
    name: 'last-year',
    value: PERIOD_VALUES.LAST_YEAR,
    label: 'Last Year',
  },
];
