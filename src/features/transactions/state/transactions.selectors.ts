import { createSelector } from '@reduxjs/toolkit';
import type { InitialTransaction } from '@/features/data/types/initialData.types';
import { selectInitialTransactions } from '@/features/data/state/data.selectors';
import { selectActivePeriod } from '@/features/period/state/period.selectors';

const LAST_TRANSACTIONS_LIMIT = 7;

export const selectActivePeriodLastTransactions = createSelector(
  [selectInitialTransactions, selectActivePeriod],
  (monthlyData, { year, month, type }): InitialTransaction[] => {
    if (type === 'year') {
      const yearTransactions = monthlyData
        .filter((m) => m.year === year)
        .flatMap((m) => m.transactions);

      return yearTransactions
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, LAST_TRANSACTIONS_LIMIT);
    }

    const found = monthlyData.find((m) => m.year === year && m.month === month);

    if (!found) return [];

    return [...found.transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, LAST_TRANSACTIONS_LIMIT);
  }
);
