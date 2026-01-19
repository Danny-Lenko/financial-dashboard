import { createSelector } from '@reduxjs/toolkit';

import {
  selectActivePeriod,
  selectIsYearlyPeriod,
  selectPreviousPeriod,
} from '@/features/period/state/period.selectors';
import {
  // selectCashflowData,
  selectInitialTransactions,
} from '@/features/data/state/data.selectors';
import type {
  CashflowWithTrend,
  MonthlyCashflow,
  PeriodCashflow,
  YearlyCashflow,
} from '../types/cashflow.types';
import { INITIAL_BALANCE } from '@/features/data/utils/mock-transactions-generator.utils';
import { calculateCashflowTrend } from '../utils/cashflow.utils';

export const selectAllMonthsCashflows = createSelector(
  [selectInitialTransactions],
  (monthlyData): MonthlyCashflow[] => {
    const results: MonthlyCashflow[] = [];
    let runningBalance = INITIAL_BALANCE; // initial balance

    // Sort chronologically
    const sorted = [...monthlyData].sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month - b.month;
    });

    // Calculate for each month
    sorted.forEach((monthData) => {
      let monthIncomes = 0;
      let monthExpenses = 0;

      monthData.transactions.forEach((t) => {
        if (t.type === 'income') {
          monthIncomes += t.amount;
          runningBalance += t.amount;
        } else {
          monthExpenses += Math.abs(t.amount);
          runningBalance += t.amount;
        }
      });

      results.push({
        year: monthData.year,
        month: monthData.month,
        incomes: Math.round(monthIncomes * 100) / 100,
        expenses: Math.round(monthExpenses * 100) / 100,
        balance: Math.round(runningBalance * 100) / 100,
        transactionCount: monthData.transactions.length,
      });
    });

    return results;
  }
);

export const selectAllYearsAverageCashflows = createSelector(
  [selectAllMonthsCashflows],
  (allPeriods): YearlyCashflow[] => {
    const yearMap = new Map<
      number,
      {
        totalIncomes: number;
        totalExpenses: number;
        finalBalance: number;
        totalTransactionCount: number;
        monthCount: number;
      }
    >();

    allPeriods.forEach((period) => {
      if (period.month === null) return; // skip yearly entries

      const existing = yearMap.get(period.year);
      if (existing) {
        existing.totalIncomes += period.incomes;
        existing.totalExpenses += period.expenses;
        existing.finalBalance = period.balance; // latest month's balance
        existing.totalTransactionCount += period.transactionCount;
        existing.monthCount++;
      } else {
        yearMap.set(period.year, {
          totalIncomes: period.incomes,
          totalExpenses: period.expenses,
          finalBalance: period.balance,
          totalTransactionCount: period.transactionCount,
          monthCount: 1,
        });
      }
    });

    return Array.from(yearMap.entries()).map(([year, data]) => {
      const avgIncomes = data.totalIncomes / data.monthCount;
      const avgExpenses = data.totalExpenses / data.monthCount;
      const avgBalance = data.finalBalance / data.monthCount;

      return {
        year,
        month: null,

        // Average values
        incomes: Math.round(avgIncomes * 100) / 100,
        expenses: Math.round(avgExpenses * 100) / 100,
        balance: Math.round(avgBalance * 100) / 100,

        // Total values
        totalIncomes: Math.round(data.totalIncomes * 100) / 100,
        totalExpenses: Math.round(data.totalExpenses * 100) / 100,
        finalBalance: Math.round(data.finalBalance * 100) / 100,

        // Other metrics
        monthCount: data.monthCount,
        transactionCount: data.totalTransactionCount,
      };
    });
  }
);

const getCashflowForPeriod = (
  monthlyCashflows: MonthlyCashflow[],
  yearlyCashflows: YearlyCashflow[],
  period: { year: number; month: number | null },
  isYearly: boolean
): PeriodCashflow => {
  if (isYearly) {
    return yearlyCashflows.find((item) => item.year === period.year)!;
  } else {
    return monthlyCashflows.find(
      (item) => item.year === period.year && item.month === period.month
    )!;
  }
};

export const selectActivePeriodCashflow = createSelector(
  [
    selectAllMonthsCashflows,
    selectAllYearsAverageCashflows,
    selectActivePeriod,
    selectIsYearlyPeriod,
  ],
  (
    monthlyCashflows,
    yearlyCashflows,
    activePeriod,
    isYearly
  ): PeriodCashflow => {
    return getCashflowForPeriod(
      monthlyCashflows,
      yearlyCashflows,
      activePeriod,
      isYearly
    );
  }
);

export const selectPreviousPeriodCashflow = createSelector(
  [
    selectAllMonthsCashflows,
    selectAllYearsAverageCashflows,
    selectPreviousPeriod,
    selectIsYearlyPeriod,
  ],
  (
    monthlyCashflows,
    yearlyCashflows,
    previousPeriod,
    isYearly
  ): PeriodCashflow => {
    return getCashflowForPeriod(
      monthlyCashflows,
      yearlyCashflows,
      previousPeriod,
      isYearly
    );
  }
);

export const selectActivePeriodCashflowWithTrend = createSelector(
  [selectActivePeriodCashflow, selectPreviousPeriodCashflow],
  (current, previous): CashflowWithTrend => {
    const trend = calculateCashflowTrend(current, previous);

    return {
      ...current,
      trend,
    };
  }
);

export const selectCashflowStartPeriod = createSelector(
  [selectAllMonthsCashflows],
  (data) => {
    const earliestYear = data[0].year;
    const earliestMonth = data[0].month;
    return { year: earliestYear, month: earliestMonth };
  }
);
