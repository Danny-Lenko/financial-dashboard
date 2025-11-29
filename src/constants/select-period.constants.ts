import { Period } from '@/types/select-period.types';

interface PeriodButtonConfig {
  label: string;
  value: string;
  content: string;
  isStandalone?: boolean;
}

export const PERIOD_BUTTONS_CONFIG: PeriodButtonConfig[] = [
  {
    label: 'this month',
    value: Period.ThisMonth,
    content: 'This Month',
  },
  {
    label: 'last month',
    value: Period.LastMonth,
    content: 'Last Month',
  },
  {
    label: 'this year',
    value: Period.ThisYear,
    content: 'This Year',
  },
  {
    label: 'last year',
    value: Period.LastYear,
    content: 'Last Year',
  },
  {
    label: 'select period',
    value: Period.SelectPeriod,
    content: 'Select Period',
    isStandalone: true,
  },
];
