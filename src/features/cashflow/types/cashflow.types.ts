export const CashflowCategory = {
  Balance: 'balance',
  Incomes: 'incomes',
  Expenses: 'expenses',
} as const;

export type CashflowCategory =
  (typeof CashflowCategory)[keyof typeof CashflowCategory];

export interface MonthCashflow {
  incomes: number;
  expenses: number;
}

export interface CashflowData {
  [key: string]: MonthCashflow;
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

export interface YearGroups {
  [year: string]: MonthCashflow[];
}

export interface YearlyTotals {
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
}
