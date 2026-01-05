interface CurrentPeriod {
  year: number;
  month: number;
}

export interface PeriodState {
  activePeriod: Period;
  currentPeriod: CurrentPeriod;
}

export const Period = {
  ThisMonth: 'this-month',
  LastMonth: 'last-month',
  ThisYear: 'this-year',
  LastYear: 'last-year',
  SelectPeriod: 'select-period',
};

export type Period = (typeof Period)[keyof typeof Period];
