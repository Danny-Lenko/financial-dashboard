export type PeriodType = 'month' | 'year';

export interface PeriodState {
  activeMonth: number | null;
  activeYear: number;
}

export interface Period {
  month: number | null;
  year: number;
}

export type PeriodWithType =
  | {
      month: number;
      year: number;
      type: 'month';
    }
  | {
      month: null;
      year: number;
      type: 'year';
    };

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
