export const periods = {
  thisMonth: 'this-month',
  lastMonth: 'last-month',
  thisYear: 'this-year',
  lastYear: 'last-year',
} as const;

export type Period = (typeof periods)[keyof typeof periods];

interface CurrentPeriod {
  year: number;
  month: number;
}

export interface PeriodState {
  activePeriod: Period;
  currentPeriod: CurrentPeriod;
}
