import {
  CashflowCategory,
  type Cashflow,
  type CashflowAnalysis,
} from '@/types/cashflow.types';

export const calculateTrend = (previos: number, current: number) => {
  return ((current - previos) / previos) * 100;
};

export const calculateBalance = (incomes: number, expenses: number): number => {
  return incomes - expenses;
};

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
