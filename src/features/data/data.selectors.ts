import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';

import {
  selectActivePeriodKey,
  selectPreviousPeriodKey,
} from '@/features/period/period.selectors';
import {
  analyzeCashflow,
  calculateYearStats,
  groupMonthsByYear,
} from '@/utils/cashflow.utils';

export const selectDataState = (state: RootState) => state.data;
export const selectCashflowData = (state: RootState) => state.data.cashflow;
export const selectExpensesData = (state: RootState) => state.data.expenses;
export const selectIsInitialized = (state: RootState) =>
  state.data.isInitialized;

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

// ========= Expenses Selectors

// export const selectCurrentExpenses = createSelector(
//   [selectExpensesData, selectActiveMonthKey],
//   (expenses, currentKey) => expenses[currentKey] || null
// );

// export const selectPreviousExpenses = createSelector(
//   [selectExpensesData, selectPreviousMonthKey],
//   (expenses, previousKey) => expenses[previousKey] || null
// );

// export const selectExpensesComparison = createSelector(
//   [selectExpensesData, selectMonthKeys],
//   (expenses, { current, previous }) => ({
//     current: expenses[current] || null,
//     previous: expenses[previous] || null,
//     currentKey: current,
//     previousKey: previous,
//   })
// );

// export const selectPeriodData = createSelector(
//   [selectCashflowComparison, selectExpensesComparison],
//   (cashflow, expenses) => ({
//     cashflow,
//     expenses,
//   })
// );

// export const selectCashflowStats = createSelector(
//   [selectCashflowComparison],
//   ({ current, previous }) => {
//     if (!current || !previous) {
//       return null;
//     }

//     const incomeDiff = current.income - previous.income;
//     const expensesDiff = current.expenses - previous.expenses;
//     const balanceDiff = current.balance - previous.balance;

//     return {
//       income: {
//         current: current.income,
//         previous: previous.income,
//         diff: incomeDiff,
//         percentChange:
//           previous.income !== 0 ? (incomeDiff / previous.income) * 100 : 0,
//       },
//       expenses: {
//         current: current.expenses,
//         previous: previous.expenses,
//         diff: expensesDiff,
//         percentChange:
//           previous.expenses !== 0
//             ? (expensesDiff / previous.expenses) * 100
//             : 0,
//       },
//       balance: {
//         current: current.balance,
//         previous: previous.balance,
//         diff: balanceDiff,
//         percentChange:
//           previous.balance !== 0 ? (balanceDiff / previous.balance) * 100 : 0,
//       },
//     };
//   }
// );
