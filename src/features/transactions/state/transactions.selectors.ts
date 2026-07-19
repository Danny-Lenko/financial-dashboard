import { createSelector } from '@reduxjs/toolkit';
import type { InitialTransaction } from '@/features/data/types/initialData.types';
import {
  selectInitialTransactionEntities,
  selectInitialTransactions,
} from '@/features/data/state/data.selectors';
import { selectActivePeriod } from '@/features/period/state/period.selectors';

const LAST_TRANSACTIONS_LIMIT = 7;

export const selectActivePeriodLastTransactions = createSelector(
  [selectInitialTransactions, selectActivePeriod],
  (allTransactions, activePeriod): InitialTransaction[] => {
    if (activePeriod.type === 'year') {
      return allTransactions
        .filter(
          (transaction) =>
            new Date(transaction.date).getFullYear() === activePeriod.year
        )
        .slice(0, LAST_TRANSACTIONS_LIMIT);
    }

    return allTransactions
      .filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return (
          transactionDate.getFullYear() === activePeriod.year &&
          transactionDate.getMonth() === activePeriod.month
        );
      })
      .slice(0, LAST_TRANSACTIONS_LIMIT);
  }
);

export const selectTransactionById = (id: string) =>
  createSelector([selectInitialTransactionEntities], (transactionEntities) => {
    return transactionEntities[id] ?? null;
  });
