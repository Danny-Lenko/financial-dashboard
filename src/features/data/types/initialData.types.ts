import type { CashflowData } from '@/features/cashflow/types/cashflow.types';
import type { ExpensesData } from '@/features/expenses/types/expenses.types';
import type { TransactionsData } from '@/features/transactions/types/transaction.types';
import type { MonthlyBudget } from '../utils/mock-transactions-generator.utils';

export type TransactionType = 'income' | 'expense';

export type PaymentMethod = 'bank_account' | 'credit_card' | 'debit_card';

export interface InitialTransaction {
  id: string; // UUID
  type: TransactionType;
  name: string; // merchant
  category?: string; // only for expenses
  method: PaymentMethod;
  date: string; // YYYY-MM-DD
  amount: number; // positive for income, negative for expenses
  description: string; // 5-15 sentences of lorem ipsum
  createdAt: string; // ISO timestamp
}

export interface DataState {
  initialTransactions: MonthlyBudget[];
  isInitialized: boolean;
}
