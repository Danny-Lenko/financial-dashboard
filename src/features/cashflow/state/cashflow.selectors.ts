import { createSelector } from '@reduxjs/toolkit';

import {
  selectActivePeriod,
  selectPreviousPeriod,
} from '@/features/period/state/period.selectors';
import { selectInitialTransactions } from '@/features/data/state/data.selectors';
import type { Cashflow, CashflowTrend } from '../types/cashflow.types';

import { INITIAL_BALANCE } from '@/features/data/consts/data.consts';
import {
  calculateAllMonthsCashflows,
  calculateTrend,
  getPeriodCashflow,
} from '../utils/cashflow.utils';

interface GroupedTransactions {
  year: number;
  month: number;
  transactions: ReturnType<typeof selectInitialTransactions>[number][];
}

const selectGroupedTransactionsByMonth = createSelector(
  [selectInitialTransactions],
  (allTransactions): GroupedTransactions[] => {
    const grouped = new Map<string, GroupedTransactions>();

    allTransactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const year = date.getFullYear();
      const month = date.getMonth();
      const key = `${year}-${month}`;

      const existing = grouped.get(key);
      if (existing) {
        existing.transactions.push(transaction);
        return;
      }

      grouped.set(key, {
        year,
        month,
        transactions: [transaction],
      });
    });

    return [...grouped.values()].sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month - b.month;
    });
  }
);

export const selectAllPeriodsCashflows = createSelector(
  [selectGroupedTransactionsByMonth],
  (monthlyData): Map<string, Cashflow> => {
    const cashflows = new Map<string, Cashflow>();
    let runningBalance = INITIAL_BALANCE;

    monthlyData.forEach(({ year, month, transactions }) => {
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
