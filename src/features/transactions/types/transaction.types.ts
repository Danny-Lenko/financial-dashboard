import type { ReactNode } from 'react';
import type { InitialTransaction } from '@/features/data/types/initialData.types';

import type { SvgIconComponent } from '@mui/icons-material';

export const PaymentMethod = {
  BankAccount: 'bank_account',
  CreditCard: 'credit_card',
  DebitCard: 'debit_card',
  Cash: 'cash',
} as const;

export type PaymentMethod = (typeof PaymentMethod)[keyof typeof PaymentMethod];

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

export interface TransactionDetailConfig {
  field: keyof InitialTransaction;
  icon: SvgIconComponent;
  formatter?: (
    value: InitialTransaction[keyof InitialTransaction]
  ) => ReactNode;
}
