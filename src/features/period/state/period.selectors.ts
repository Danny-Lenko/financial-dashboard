import type { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';

import {
  getPreviousMonth,
  getMonthKey,
} from '@/features/period/utils/period.utils';
import { parseMonthKey } from '@/features/cashflow/utils/cashflow.utils';

export const selectActivePeriod = (state: RootState) =>
  state.period.activePeriod;

export const selectPreviousPeriod = createSelector(
  [selectActivePeriod],
  (activePeriod) => {
    if (typeof activePeriod === 'number') {
      return activePeriod - 1;
    }

    const { year, month } = parseMonthKey(activePeriod);
    const prev = getPreviousMonth(year, month);
    return getMonthKey(prev.year, prev.month);
  }
);
export const selectIsYearlyPeriod = createSelector(
  [selectActivePeriod],
  (activePeriod) => typeof activePeriod === 'number'
);

export const selectActivePeriodInfo = createSelector(
  [selectActivePeriod],
  (activePeriod) => {
    if (typeof activePeriod === 'number') {
      return { type: 'year' as const, year: activePeriod };
    }

    const { year, month } = parseMonthKey(activePeriod);
    return { type: 'month' as const, year, month };
  }
);
