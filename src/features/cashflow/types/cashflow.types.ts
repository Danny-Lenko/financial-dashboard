export const CashflowCategory = {
  Balance: 'balance',
  Incomes: 'incomes',
  Expenses: 'expenses',
} as const;

export type CashflowCategory =
  (typeof CashflowCategory)[keyof typeof CashflowCategory];

export interface Cashflow {
  incomes: number;
  expenses: number;
}

export interface CashflowMetrics {
  amount: number;
  trend: number;
}

export interface CashflowAnalysis {
  balance: CashflowMetrics;
  incomes: CashflowMetrics;
  expenses: CashflowMetrics;
}

export const AddRecordingButton = {
  Income: 'income',
  Expense: 'expense',
  Transfer: 'transfer',
} as const;

export type AddRecordingButton =
  (typeof AddRecordingButton)[keyof typeof AddRecordingButton];

export interface YearGroups {
  [year: string]: Cashflow[];
}

export interface MonthlyData {
  [key: string]: Cashflow;
}

export interface YearlyTotals {
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
}
