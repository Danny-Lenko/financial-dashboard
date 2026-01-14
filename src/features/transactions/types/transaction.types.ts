export type PaymentMethod = 'bank_account' | 'credit_card' | 'debit_card';

export interface Transaction {
  id: string;
  name: string; // Netflix, Orlando Rodrigues, Amazon
  method: PaymentMethod;
  date: string;
  amount: number; // +750.00 or -9.90
}

export interface TransactionsData {
  [key: string]: Transaction[];
}

export type Formatter = (
  value: string | number | PaymentMethod
) => string | JSX.Element;

export interface Column<T> {
  id: keyof T | 'menu';
  label: string;
  format?: Formatter;
  padding: string;
}
