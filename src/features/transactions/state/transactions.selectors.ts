import { createSelector } from '@reduxjs/toolkit';

import { parseMonthKey } from '@/shared/utils/parseMonthKey.utils';
import { selectActivePeriod } from '@/features/period/state/period.selectors';
import { selectTransactionsData } from '@/features/data/state/data.selectors';
import type { Transaction } from '../types/transaction.types';

export const selectActiveMonthTransactions = createSelector(
  [selectTransactionsData, selectActivePeriod],
  (transactionsData, currentKey) => transactionsData[currentKey] || null
);

export const selectActiveYearLastTransactions = createSelector(
  [selectTransactionsData, selectActivePeriod],
  (transactionsData, selectedYear): Transaction[] | null => {
    if (typeof selectedYear !== 'number') return null;

    const yearMonthKeys = Object.keys(transactionsData)
      .filter((key) => {
        const parsed = parseMonthKey(key);
        return parsed && parsed.year === selectedYear;
      })
      .sort();

    if (yearMonthKeys.length === 0) return null;

    const lastMonthKey = yearMonthKeys[yearMonthKeys.length - 1];
    const lastMonthTransactions = transactionsData[lastMonthKey];

    if (!lastMonthTransactions) return null;

    return lastMonthTransactions.slice(0, 20);
  }
);

export const selectActivePeriodTransactions = createSelector(
  [selectActiveMonthTransactions, selectActiveYearLastTransactions],
  (monthlyTransactions, yearlyTransactions) =>
    monthlyTransactions || yearlyTransactions || null
);
