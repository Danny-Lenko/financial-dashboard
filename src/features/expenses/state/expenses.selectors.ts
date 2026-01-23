import { selectInitialTransactions } from '@/features/data/state/data.selectors';
import { createSelector } from '@reduxjs/toolkit';
import { calculateExpenses, getPeriodExpenses } from '../utils/expenses.utils';
import type { MonthExpenses } from '../types/expenses.types';
import { selectActivePeriod } from '@/features/period/state/period.selectors';

export const selectAllMonthsExpenses = createSelector(
  [selectInitialTransactions],
  (monthlyData): Map<string, MonthExpenses> => {
    const expensesMap = new Map<string, MonthExpenses>();

    monthlyData.forEach(({ year, month, transactions }) => {
      const expenses = calculateExpenses(transactions);
      const key = `${year}-${month}`;
      expensesMap.set(key, expenses);
    });

    return expensesMap;
  }
);

export const selectActivePeriodExpenses = createSelector(
  [selectAllMonthsExpenses, selectActivePeriod],
  (allExpenses, { year, month, type }): MonthExpenses => {
    return getPeriodExpenses(allExpenses, { year, month, type });
  }
);
