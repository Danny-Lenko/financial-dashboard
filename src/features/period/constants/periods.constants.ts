import {
  CURRENT_MONTH,
  CURRENT_YEAR,
} from '@/shared/constants/current-period.constants';
import { getPreviousMonth } from '../utils/period.utils';
import type { PeriodButtonConfig } from '../types/period.types';

const prevMonthInfo = getPreviousMonth(CURRENT_YEAR, CURRENT_MONTH);

export const PERIOD_VALUES = {
  THIS_MONTH: { year: CURRENT_YEAR, month: CURRENT_MONTH },
  LAST_MONTH: { year: prevMonthInfo.year, month: prevMonthInfo.month },
  THIS_YEAR: { year: CURRENT_YEAR, month: null },
  LAST_YEAR: { year: CURRENT_YEAR - 1, month: null },
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
