import type { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';

import { getPreviousMonth } from '@/features/period/utils/period.utils';
import { selectInitialTransactions } from '../../data/state/data.selectors';
import type { Period, PeriodWithType } from '../types/period.types';

export const selectActiveMonth = (state: RootState) => state.period.activeMonth;
export const selectActiveYear = (state: RootState) => state.period.activeYear;

export const selectActivePeriod = createSelector(
  [selectActiveYear, selectActiveMonth],
  (year, month): PeriodWithType => ({
    year,
    month,
    type: month === null ? 'year' : 'month',
  })
);

export const selectPreviousPeriod = createSelector(
  [selectActivePeriod],
  ({ year, month, type }): PeriodWithType => {
    if (type === 'year') {
      return { year: year - 1, month: null, type: 'year' };
    }

    const { year: prevYear, month: prevMonth } = getPreviousMonth(year, month!);

    return {
      year: prevYear,
      month: prevMonth,
      type: 'month',
    };
  }
);

export const selectStartingPeriod = createSelector(
  [selectInitialTransactions],
  (monthlyData): Period => {
    if (monthlyData.length === 0) {
      const currentDate = new Date();
      return { year: currentDate.getFullYear(), month: currentDate.getMonth() };
    }

    const sorted = [...monthlyData].sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month - b.month;
    });

    const first = sorted[0];
    return { year: first.year, month: first.month };
  }
);
