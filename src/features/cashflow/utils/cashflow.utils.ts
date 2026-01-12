import {
  CashflowCategory,
  type Cashflow,
  type CashflowAnalysis,
  type MonthlyData,
  type YearGroups,
  type YearlyTotals,
} from '@/features/cashflow/types/cashflow.types';
import { parseMonthKey } from '@/shared/utils/parseMonthKey.utils';

export const calculateTrend = (previos: number, current: number) => {
  if (previos === 0) {
    return 0;
  }
  return ((current - previos) / previos) * 100;
};

export const calculateBalance = (incomes: number, expenses: number): number => {
  return incomes - expenses;
};

export const analyzeCashflow = ({
  previous,
  current,
}: {
  previous: Cashflow;
  current: Cashflow;
}): CashflowAnalysis => {
  const analyze = (currentVal: number, prevVal: number = 0) => ({
    amount: currentVal,
    trend: calculateTrend(prevVal, currentVal),
  });

  const currentBalance = calculateBalance(current.incomes, current.expenses);
  const prevBalance = previous
    ? calculateBalance(previous.incomes, previous.expenses)
    : 0;

  return {
    [CashflowCategory.Balance]: analyze(currentBalance, prevBalance),
    [CashflowCategory.Incomes]: analyze(current.incomes, previous?.incomes),
    [CashflowCategory.Expenses]: analyze(current.expenses, previous?.expenses),
  };
};

export const groupMonthsByYear = (monthlyData: MonthlyData): YearGroups => {
  const yearGroups: YearGroups = {};

  Object.entries(monthlyData).forEach(([key, data]) => {
    const { year } = parseMonthKey(key);

    if (!yearGroups[year]) {
      yearGroups[year] = [];
    }

    yearGroups[year].push({
      incomes: data.incomes || 0,
      expenses: data.expenses || 0,
    });
  });

  return yearGroups;
};

export const calculateTotals = (months: Cashflow[]): YearlyTotals => {
  const totalIncome = months.reduce((sum, m) => sum + m.incomes, 0);
  const totalExpenses = months.reduce((sum, m) => sum + m.expenses, 0);
  const totalSavings = totalIncome - totalExpenses;

  return { totalIncome, totalExpenses, totalSavings };
};

export const calculateAverages = (totals: YearlyTotals, monthCount: number) => {
  return {
    incomes: totals.totalIncome / monthCount,
    expenses: totals.totalExpenses / monthCount,
    balance: totals.totalSavings / monthCount,
  };
};

export const calculateYearStats = (year: string, months: Cashflow[]) => {
  const monthCount = months.length;
  const totals = calculateTotals(months);
  const averages = calculateAverages(totals, monthCount);

  return {
    year: parseInt(year),
    monthCount,
    ...averages,
  };
};
