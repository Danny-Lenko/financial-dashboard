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

export interface MonthYearPickerProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSelect: (year: number, month: number) => void;
  initialYear?: number;
  initialMonth?: number;
}
