import { createSelector } from '@reduxjs/toolkit';

import {
  selectActivePeriodKey,
  selectPreviousPeriodKey,
} from '@/features/period/state/period.selectors';
import { selectCashflowData } from '@/features/data/state/data.selectors';
import {
  analyzeCashflow,
  calculateYearStats,
  groupMonthsByYear,
} from '@/features/cashflow/utils/cashflow.utils';

// ========= Cashflow Selectors
export const selectYearlyCashflowStats = createSelector(
  [selectCashflowData],
  (monthlyData) => {
    const yearGroups = groupMonthsByYear(monthlyData);

    return Object.entries(yearGroups)
      .map(([year, months]) => calculateYearStats(year, months))
      .sort((a, b) => b.year - a.year);
  }
);

export const selectActiveMonthCashflow = createSelector(
  [selectCashflowData, selectActivePeriodKey],
  (cashflow, currentKey) => cashflow[currentKey] || null
);

export const selectActiveYearCashflow = createSelector(
  [selectYearlyCashflowStats, selectActivePeriodKey],
  (yearlyAverages, selectedYear) => {
    return yearlyAverages.find((item) => item.year === selectedYear) || null;
  }
);

export const selectActivePeriodCashflow = createSelector(
  [selectActiveMonthCashflow, selectActiveYearCashflow],
  (monthlyCashflow, yearlyCashflow) => monthlyCashflow || yearlyCashflow || null
);

export const selectPreviousMonthCashflow = createSelector(
  [selectCashflowData, selectPreviousPeriodKey],
  (cashflow, previousKey) => cashflow[previousKey] || null
);

export const selectPreviousYearCashflow = createSelector(
  [selectYearlyCashflowStats, selectPreviousPeriodKey],
  (yearlyAverages, selectedYear) => {
    return yearlyAverages.find((item) => item.year === selectedYear) || null;
  }
);

export const selectPreviousPeriodCashflow = createSelector(
  [selectPreviousMonthCashflow, selectPreviousYearCashflow],
  (monthlyCashflow, yearlyCashflow) => monthlyCashflow || yearlyCashflow || null
);

export const selectCashflowStats = createSelector(
  [selectActivePeriodCashflow, selectPreviousPeriodCashflow],
  (current, previous) => analyzeCashflow({ previous, current })
);

export const selectCashflowStartPeriod = createSelector(
  [selectYearlyCashflowStats],
  (data) => {
    const earliestYear = data[data.length - 1].year;
    // ======================== test this ==================================
    const earliestMonth = 11 - data[data.length - 1].monthCount;
    return { year: earliestYear, month: earliestMonth };
  }
);
