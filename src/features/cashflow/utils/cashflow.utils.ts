import {
  CashflowCategory,
  type Cashflow,
  type CashflowAnalysis,
  type MonthlyData,
  type YearGroups,
  type YearlyTotals,
} from '@/features/cashflow/types/cashflow.types';

export const calculateTrend = (previos: number, current: number) => {
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
  const prevBalance = calculateBalance(previous.incomes, previous.expenses);
  const currentBalance = calculateBalance(current.incomes, current.expenses);

  return {
    [CashflowCategory.Balance]: {
      amount: currentBalance,
      trend: calculateTrend(prevBalance, currentBalance),
    },
    [CashflowCategory.Incomes]: {
      amount: current.incomes,
      trend: calculateTrend(previous.incomes, current.incomes),
    },
    [CashflowCategory.Expenses]: {
      amount: current.expenses,
      trend: calculateTrend(previous.expenses, current.expenses),
    },
  };
};

// Helper function to parse the key "YYYY-MM"
const parseMonthKey = (key: string) => {
  const [year, month] = key.split('-');
  return {
    year: parseInt(year),
    month: parseInt(month),
    key,
  };
};

// Groups monthly data by year
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

// Calculates total amounts for an array of months
export const calculateTotals = (months: Cashflow[]): YearlyTotals => {
  const totalIncome = months.reduce((sum, m) => sum + m.incomes, 0);
  const totalExpenses = months.reduce((sum, m) => sum + m.expenses, 0);
  const totalSavings = totalIncome - totalExpenses;

  return { totalIncome, totalExpenses, totalSavings };
};

// Calculates average values
export const calculateAverages = (totals: YearlyTotals, monthCount: number) => {
  return {
    incomes: totals.totalIncome / monthCount,
    expenses: totals.totalExpenses / monthCount,
    balance: totals.totalSavings / monthCount,
  };
};

// Calculates all statistics for the year
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
