import type { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';

import { getPreviousMonth } from '@/features/period/utils/period.utils';

export const selectActiveMonth = (state: RootState) => state.period.activeMonth;
export const selectActiveYear = (state: RootState) => state.period.activeYear;

export const selectActivePeriod = createSelector(
  [selectActiveYear, selectActiveMonth],
  (year, month) => ({
    year,
    month,
  })
);

export const selectPreviousPeriod = createSelector(
  [selectActivePeriod],
  ({ year, month }) => {
    if (!month) {
      return { year: year - 1, month: null };
    }

    const { year: prevYear, month: prevMonth } = getPreviousMonth(year, month);

    return {
      year: prevYear,
      month: prevMonth,
    };
  }
);

export const selectIsYearlyPeriod = createSelector(
  [selectActivePeriod],
  ({ month }) => month === null
);
