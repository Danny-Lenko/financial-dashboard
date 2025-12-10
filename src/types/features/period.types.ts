export const periods = {
  thisMonth: 'this-month',
  lastMonth: 'last-month',
  thisYear: 'this-year',
  lastYear: 'last-year',
} as const;

export type PeriodValue = (typeof periods)[keyof typeof periods];

export interface PeriodState {
  currentPeriod: PeriodValue;
}
