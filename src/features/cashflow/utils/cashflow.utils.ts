import type { PeriodWithType } from '@/features/period/types/period.types';
import type { Cashflow, CashflowTrend } from '../types/cashflow.types';
import type { InitialTransaction } from '@/features/data/types/initialData.types';

export function calculateAllMonthsCashflows(
  transactions: InitialTransaction[],
  startingBalance: number
): Cashflow {
  let incomes = 0;
  let expenses = 0;

  transactions.forEach((t) => {
    if (t.type === 'income') {
      incomes += t.amount;
    } else {
      expenses += Math.abs(t.amount);
    }
  });

  const balance = startingBalance + incomes - expenses;

  return {
    incomes: Math.round(incomes * 100) / 100,
    expenses: Math.round(expenses * 100) / 100,
    balance: Math.round(balance * 100) / 100,
  };
}

export function getPeriodCashflow(
  allCashflows: Map<string, Cashflow>,
  { year, month, type }: PeriodWithType
): Cashflow {
  // For a Year: average metrics
  if (type === 'year') {
    let totalIncomes = 0;
    let totalExpenses = 0;
    let totalBalance = 0;
    let monthCount = 0;

    for (let m = 0; m < 12; m++) {
      const key = `${year}-${m}`;
      const monthCashflow = allCashflows.get(key);

      if (monthCashflow) {
        totalIncomes += monthCashflow.incomes;
        totalExpenses += monthCashflow.expenses;
        totalBalance += monthCashflow.balance;
        monthCount++;
      }
    }

    const getAverage = (total: number) => {
      return monthCount > 0 ? Math.round((total / monthCount) * 100) / 100 : 0;
    };

    return {
      incomes: getAverage(totalIncomes),
      expenses: getAverage(totalExpenses),
      balance: getAverage(totalBalance),
    };
  }

  // For a Month: direct lookup
  const key = `${year}-${month}`;
  return allCashflows.get(key) || { incomes: 0, expenses: 0, balance: 0 };
}

export function calculateTrend(
  current: Cashflow,
  previous: Cashflow
): CashflowTrend {
  const calcPercent = (curr: number, prev: number) => {
    if (prev === 0) return 0;
    return Math.round(((curr - prev) / prev) * 100 * 100) / 100;
  };

  return {
    incomes: calcPercent(current.incomes, previous.incomes),
    expenses: calcPercent(current.expenses, previous.expenses),
    balance: calcPercent(current.balance, previous.balance),
  };
}
