import { createSelector } from '@reduxjs/toolkit';

import {
  selectActivePeriod,
  selectPreviousPeriod,
} from '@/features/period/state/period.selectors';
import {
  // selectCashflowData,
  selectInitialTransactions,
} from '@/features/data/state/data.selectors';
import type { Cashflow, CashflowTrend } from '../types/cashflow.types';
import { INITIAL_BALANCE } from '@/features/data/utils/mock-transactions-generator.utils';
import {
  calculateAllMonthsCashflows,
  calculateTrend,
  getPeriodCashflow,
} from '../utils/cashflow.utils';

export const selectAllPeriodsCashflows = createSelector(
  [selectInitialTransactions],
  (monthlyData): Map<string, Cashflow> => {
    const cashflows = new Map<string, Cashflow>();
    let runningBalance = INITIAL_BALANCE;

    const sorted = [...monthlyData].sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month - b.month;
    });

    sorted.forEach(({ year, month, transactions }) => {
      const cashflow = calculateAllMonthsCashflows(
        transactions,
        runningBalance
      );
      runningBalance = cashflow.balance;

      const key = `${year}-${month}`;
      cashflows.set(key, cashflow);
    });

    return cashflows;
  }
);

export const selectActivePeriodCashflow = createSelector(
  [selectAllPeriodsCashflows, selectActivePeriod],
  (allCashflows, activePeriod): Cashflow => {
    return getPeriodCashflow(allCashflows, activePeriod);
  }
);

export const selectPreviousPeriodCashflow = createSelector(
  [selectAllPeriodsCashflows, selectPreviousPeriod],
  (allCashflows, activePeriod): Cashflow => {
    return getPeriodCashflow(allCashflows, activePeriod);
  }
);

export const selectActivePeriodCashflowWithTrend = createSelector(
  [selectActivePeriodCashflow, selectPreviousPeriodCashflow],
  (current, previous): Cashflow & { trend: CashflowTrend } => ({
    ...current,
    trend: calculateTrend(current, previous),
  })
);
