import type { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';

import { Period } from '../types/period.types';
import {
  getPreviousMonth,
  getMonthKey,
} from '@/features/period/utils/period.utils';

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
      case Period.ThisMonth:
        return getMonthKey(year, month);

      case Period.LastMonth: {
        const prev = getPreviousMonth(year, month);
        return getMonthKey(prev.year, prev.month);
      }

      case Period.ThisYear:
        return year;

      case Period.LastYear:
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
      case Period.ThisMonth: {
        const prev = getPreviousMonth(year, month);
        return getMonthKey(prev.year, prev.month);
      }

      case Period.LastMonth: {
        const prev = getPreviousMonth(year, month);
        const prevPrev = getPreviousMonth(prev.year, prev.month);
        return getMonthKey(prevPrev.year, prevPrev.month);
      }

      case Period.ThisYear:
        return year - 1;

      case Period.LastYear:
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
