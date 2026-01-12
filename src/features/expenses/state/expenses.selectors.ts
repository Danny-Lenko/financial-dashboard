import { selectExpensesData } from '@/features/data/state/data.selectors';
import { createSelector } from '@reduxjs/toolkit';
import { calculateYearExpenseStats } from '../utils/expenses.utils';
import { selectActivePeriod } from '@/features/period/state/period.selectors';
import type { YearExpenses } from '../types/expenses.types';
import { parseMonthKey } from '@/shared/utils/parseMonthKey.utils';

export const selectActiveMonthExpenses = createSelector(
  [selectExpensesData, selectActivePeriod],
  (expensesData, currentKey) => expensesData[currentKey] || null
);

export const selectActiveYearExpenses = createSelector(
  [selectExpensesData, selectActivePeriod],
  (expensesData, selectedYear): YearExpenses | null => {
    if (typeof selectedYear !== 'number') return null;

    const yearMonths = Object.entries(expensesData)
      .filter(([key]) => parseMonthKey(key).year === selectedYear)
      .map(([, data]) => data);

    if (yearMonths.length === 0) return null;

    return calculateYearExpenseStats(selectedYear, yearMonths);
  }
);

export const selectActivePeriodExpenses = createSelector(
  [selectActiveMonthExpenses, selectActiveYearExpenses],
  (monthlyExpenses, yearlyExpenses) => monthlyExpenses || yearlyExpenses || null
);
