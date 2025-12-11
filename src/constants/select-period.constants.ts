import { Period } from '@/types/select-period.types';

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
