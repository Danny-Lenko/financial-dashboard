import type { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';

import { periods } from '@/types/features/period.types';
import { getPreviousMonth, getMonthKey } from '@/utils/period-helpers.utils';

// TODO: selectPreviousPeriodKey default return value for specific periods

export const selectCurrentPeriod = (state: RootState) =>
  state.period.currentPeriod;
export const selectActivePeriod = (state: RootState) =>
  state.period.activePeriod;

export const selectActivePeriodKey = createSelector(
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
        return year;

      case periods.lastYear:
        return year - 1;

      default:
        return activePeriod;
    }
  }
);

export const selectPreviousPeriodKey = createSelector(
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

      case periods.thisYear:
        return year - 1;

      case periods.lastYear:
        return year - 2;

      default: {
        // this must be adjusted to return the previous period key based on the chosen active period
        return activePeriod;
      }
    }
  }
);

export const selectMonthKeys = createSelector(
  [selectActivePeriodKey, selectPreviousPeriodKey],
  (currentKey, previousKey) => ({
    current: currentKey,
    previous: previousKey,
  })
);
