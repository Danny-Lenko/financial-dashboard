import type { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';

import { periods } from '@/types/features/period.types';
import { getPreviousMonth, getMonthKey } from '@/utils/period-helpers.utils';

export const selectCurrentPeriod = (state: RootState) =>
  state.period.currentPeriod;
export const selectActivePeriod = (state: RootState) =>
  state.period.activePeriod;

export const selectCurrentActiveMonthKey = createSelector(
  [selectCurrentPeriod, selectActivePeriod],
  (currentPeriod, activePeriod) => {
    const { year, month } = currentPeriod;

    switch (activePeriod) {
      case periods.thisMonth:
        return getMonthKey(year, month);

      case periods.lastMonth: {
        const prev = getPreviousMonth(year, month);
        return getMonthKey(prev.year, prev.month);
      }

      case periods.thisYear:
        return getMonthKey(year, month);

      case periods.lastYear:
        return getMonthKey(year - 1, month);

      default:
        return getMonthKey(year, month);
    }
  }
);

export const selectPreviousActiveMonthKey = createSelector(
  [selectCurrentPeriod, selectActivePeriod],
  (currentPeriod, activePeriod) => {
    const { year, month } = currentPeriod;

    switch (activePeriod) {
      case periods.thisMonth: {
        const prev = getPreviousMonth(year, month);
        return getMonthKey(prev.year, prev.month);
      }

      case periods.lastMonth: {
        const prev = getPreviousMonth(year, month);
        const prevPrev = getPreviousMonth(prev.year, prev.month);
        return getMonthKey(prevPrev.year, prevPrev.month);
      }

      case periods.thisYear: {
        const prev = getPreviousMonth(year, month);
        return getMonthKey(prev.year, prev.month);
      }

      case periods.lastYear: {
        const prev = getPreviousMonth(year - 1, month);
        return getMonthKey(prev.year, prev.month);
      }

      default: {
        const prev = getPreviousMonth(year, month);
        return getMonthKey(prev.year, prev.month);
      }
    }
  }
);

export const selectMonthKeys = createSelector(
  [selectCurrentActiveMonthKey, selectPreviousActiveMonthKey],
  (currentKey, previousKey) => ({
    current: currentKey,
    previous: previousKey,
  })
);
