import type { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';

import { getPreviousMonth } from '@/features/period/utils/period.utils';
import { selectInitialTransactions } from '../../data/state/data.selectors';
import type { Period, PeriodWithType } from '../types/period.types';

export const selectActiveMonth = (state: RootState) => state.period.activeMonth;
export const selectActiveYear = (state: RootState) => state.period.activeYear;

export const selectActivePeriod = createSelector(
  [selectActiveYear, selectActiveMonth],
  (year, month): PeriodWithType =>
    month === null
      ? {
          year,
          month: null,
          type: 'year',
        }
      : {
          year,
          month,
          type: 'month',
        }
);

export const selectPreviousPeriod = createSelector(
  [selectActivePeriod],
  (activePeriod): PeriodWithType => {
    if (activePeriod.type === 'year') {
      return { year: activePeriod.year - 1, month: null, type: 'year' };
    }

    const { year: prevYear, month: prevMonth } = getPreviousMonth(
      activePeriod.year,
      activePeriod.month
    );

    return {
      year: prevYear,
      month: prevMonth,
      type: 'month',
    };
  }
);

export const selectStartingPeriod = createSelector(
  [selectInitialTransactions],
  (allTransactions): Period => {
    if (allTransactions.length === 0) {
      const currentDate = new Date();
      return { year: currentDate.getFullYear(), month: currentDate.getMonth() };
    }

    const oldestTransaction = allTransactions.reduce((oldest, transaction) =>
      transaction.date < oldest.date ? transaction : oldest
    );

    const startDate = new Date(oldestTransaction.date);

    return { year: startDate.getFullYear(), month: startDate.getMonth() };
  }
);
