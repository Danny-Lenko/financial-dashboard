import type { PaymentMethod } from '../types/transaction.types';

export type Formatter = (value: string | number | PaymentMethod) => string;

export interface Column<T> {
  id: keyof T | 'menu';
  label: string;
  format?: Formatter;
  padding: string;
}
