import type { EntityState } from '@reduxjs/toolkit';
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

export interface DataState extends EntityState<InitialTransaction, string> {
  isInitialized: boolean;
}

export interface AddTransactionPayload {
  transaction: InitialTransaction;
}

export interface UpdateTransactionPayload {
  transaction: InitialTransaction;
}

export interface RemoveTransactionPayload {
  transactionId: string;
}
