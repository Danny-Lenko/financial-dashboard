export interface PeriodState {
  activePeriod: string | number;
}

export interface MonthYearPickerProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSelect: (year: number, month: number) => void;
}

export interface PeriodButtonConfig {
  name: string;
  value: string | number;
  label: string;
  isStandalone?: boolean;
}
