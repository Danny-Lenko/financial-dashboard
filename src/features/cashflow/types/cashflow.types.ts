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
  balance: number;
}

export interface CashflowTrend {
  incomes: number;
  expenses: number;
  balance: number;
}

export type CashflowWithTrend = Cashflow & {
  trend: CashflowTrend | null;
};
