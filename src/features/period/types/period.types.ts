export interface PeriodState {
  activeMonth: number;
  activeYear: number;
}

export interface MonthYearPickerProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSelect: (period: string) => void;
}

export interface PeriodButtonConfig {
  name: string;
  value: { year: number; month: number | null };
  label: string;
  isStandalone?: boolean;
}
