import type { Cashflow } from '@/features/cashflow/types/cashflow.types';

export const twoMonthsAgoCashflow: Cashflow = {
  incomes: 8950.0,
  expenses: 5045.55,
};

export const lastMonthCashflow: Cashflow = {
  incomes: 7450.0,
  expenses: 4713.55,
};

export const thisMonthCashflow: Cashflow = {
  incomes: 9450.0,
  expenses: 3945.55,
};

export const twoYearsAgoCashflow: Cashflow = {
  incomes: 104500.0,
  expenses: 69455.5,
};

export const lastYearCashflow: Cashflow = {
  incomes: 94500.0,
  expenses: 49455.5,
};

export const thisYearCashflow: Cashflow = {
  incomes: 84500.0,
  expenses: 59455.5,
};

export const periodCashflowMap: Record<
  string,
  { current: Cashflow; previous: Cashflow }
> = {
  'this-month': {
    current: thisMonthCashflow,
    previous: lastMonthCashflow,
  },
  'last-month': {
    current: lastMonthCashflow,
    previous: twoMonthsAgoCashflow,
  },

  'this-year': {
    current: thisYearCashflow,
    previous: lastYearCashflow,
  },
  'last-year': {
    current: lastYearCashflow,
    previous: twoYearsAgoCashflow,
  },
};
