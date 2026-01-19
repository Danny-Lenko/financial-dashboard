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

export interface InitialMonthlyBudget {
  year: number;
  month: number;
  transactions: InitialTransaction[];
}

export interface DataState {
  initialTransactions: InitialMonthlyBudget[];
  isInitialized: boolean;
}
