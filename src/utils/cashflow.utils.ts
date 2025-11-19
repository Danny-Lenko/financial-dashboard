import {
  CashflowCategory,
  type Cashflow,
  type CashflowAnalysis,
} from '@/types/cashflow.types';

//  Calculates the percentage trend (relative change) from a previous value to a current value.
export const calculateTrend = (previos: number, current: number) => {
  return ((current - previos) / previos) * 100;
};

// Calculates the balance by subtracting expenses from incomes.
export const calculateBalance = (incomes: number, expenses: number): number => {
  return incomes - expenses;
};

//  Calculates the balance, income, and expense trends between two cashflow periods,
// returns an analysis with current amounts and trend indicators for each category.
export const analyzeCashflow = (
  previos: Cashflow,
  current: Cashflow
): CashflowAnalysis => {
  const prevBalance = calculateBalance(previos.incomes, previos.expenses);
  const currentBalance = calculateBalance(current.incomes, current.expenses);

  return {
    [CashflowCategory.Balance]: {
      amount: currentBalance,
      trend: calculateTrend(prevBalance, currentBalance),
    },
    [CashflowCategory.Incomes]: {
      amount: current.incomes,
      trend: calculateTrend(previos.incomes, current.incomes),
    },
    [CashflowCategory.Expenses]: {
      amount: current.expenses,
      trend: calculateTrend(previos.expenses, current.expenses),
    },
  };
};

//  Formats an amount in USD with 2 decimal places
export const formatCurrency = (amount: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
