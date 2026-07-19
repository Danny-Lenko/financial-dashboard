import { selectInitialTransactions } from '@/features/data/state/data.selectors';
import { createSelector } from '@reduxjs/toolkit';
import { calculateExpenses, getPeriodExpenses } from '../utils/expenses.utils';
import type { MonthExpenses } from '../types/expenses.types';
import { selectActivePeriod } from '@/features/period/state/period.selectors';

export const selectAllMonthsExpenses = createSelector(
  [selectInitialTransactions],
  (allTransactions): Map<string, MonthExpenses> => {
    const expensesMap = new Map<string, MonthExpenses>();
    const grouped = new Map<string, typeof allTransactions>();

    allTransactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const year = date.getFullYear();
      const month = date.getMonth();
      const key = `${year}-${month}`;

      const transactionsForMonth = grouped.get(key) ?? [];
      transactionsForMonth.push(transaction);
      grouped.set(key, transactionsForMonth);
    });

    grouped.forEach((transactions, key) => {
      expensesMap.set(key, calculateExpenses(transactions));
    });

    return expensesMap;
  }
);

export const selectActivePeriodExpenses = createSelector(
  [selectAllMonthsExpenses, selectActivePeriod],
  (allExpenses, activePeriod): MonthExpenses => {
    return getPeriodExpenses(allExpenses, activePeriod);
  }
);
