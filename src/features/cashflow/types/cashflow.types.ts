export const CashflowCategory = {
  Balance: 'balance',
  Incomes: 'incomes',
  Expenses: 'expenses',
} as const;

export type CashflowCategory =
  (typeof CashflowCategory)[keyof typeof CashflowCategory];

export interface BaseCashflow {
  year: number;
  incomes: number;
  expenses: number;
  balance: number;
  transactionCount: number;
}

export interface MonthlyCashflow extends BaseCashflow {
  month: number;
}

export interface YearlyCashflow extends BaseCashflow {
  month: null;
  totalIncomes: number;
  totalExpenses: number;
  finalBalance: number;
  monthCount: number;
}

export interface CashflowTrend {
  incomes: {
    current: number;
    previous: number;
    change: number;
    changePercent: number;
  };
  expenses: {
    current: number;
    previous: number;
    change: number;
    changePercent: number;
  };
  balance: {
    current: number;
    previous: number;
    change: number;
    changePercent: number;
  };
}

export type PeriodCashflow = MonthlyCashflow | YearlyCashflow;

export type CashflowWithTrend = PeriodCashflow & {
  trend: CashflowTrend | null;
};
