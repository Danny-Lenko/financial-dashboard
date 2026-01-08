import type { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';

import { Period } from '../types/period.types';
import {
  getPreviousMonth,
  getMonthKey,
} from '@/features/period/utils/period.utils';
import { parseMonthKey } from '@/features/cashflow/utils/cashflow.utils';

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

    const { year: activeYear, month: activeMonth } = parseMonthKey(
      activePeriod.toString()
    );

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
        const prev = getPreviousMonth(activeYear, activeMonth);
        return getMonthKey(prev.year, prev.month);
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
