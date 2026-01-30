import type { PaymentMethod } from '@/features/transactions/types/transaction.types';

export type TransactionType = 'income' | 'expense';

export interface InitialTransaction {
  id: string; // UUID
  type: TransactionType;
  name: string; // merchant
  amount: number; // positive for income, negative for expenses
  date: string; // YYYY-MM-DD
  method: PaymentMethod;
  category?: string; // only for expenses
  description?: string; // 5-15 sentences of lorem ipsum
  createdAt: string; // ISO timestamp
}

export interface InitialMonthlyBudget {
  year: number;
  month: number;
  transactions: InitialTransaction[];
}

export interface DataState {
  initialTransactions: InitialMonthlyBudget[];
  isInitialized: boolean;
}

export interface AddTransactionPayload {
  year: number;
  month: number;
  transaction: InitialTransaction;
}

export interface RemoveTransactionPayload {
  year: number;
  month: number;
  transactionId: string;
}
