export type PeriodType = 'month' | 'year';

export interface PeriodState {
  activeMonth: number;
  activeYear: number;
}

export interface Period {
  month: number | null;
  year: number;
}

export interface PeriodWithType extends Period {
  type: PeriodType;
}

export interface MonthYearPickerProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSelect: (period: string) => void;
}

export interface PeriodButtonConfig {
  name: string;
  value: Period;
  label: string;
  isStandalone?: boolean;
}
