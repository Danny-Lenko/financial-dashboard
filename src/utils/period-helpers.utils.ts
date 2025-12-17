import type { Cashflow } from '@/types/cashflow.types';

export type PeriodKey = 'this-month' | 'last-month' | 'this-year' | 'last-year';

export function getMonthKey(year: number, month: number): string {
  return `${year}-${String(month).padStart(2, '0')}`;
}

export const getPreviousMonth = (year: number, month: number) => {
  if (month === 0) {
    return { year: year - 1, month: 11 };
  }
  return { year, month: month - 1 };
};

const getRealDate = () => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth(), // 0-indexed
  };
};

export const getCurrentPeriod = () => {
  const envYear = import.meta.env.VITE_CURRENT_YEAR;
  const envMonth = import.meta.env.VITE_CURRENT_MONTH;

  if (envYear && envMonth !== undefined && envMonth !== '') {
    return {
      year: parseInt(envYear, 10),
      month: parseInt(envMonth, 10),
    };
  }

  return getRealDate();
};

// export function getCurrentMonthKey(): string {
//   return getMonthKey(CURRENT_YEAR, CURRENT_MONTH);
// }

// export function getLastMonthKey(): string {
//   const lastMonth = CURRENT_MONTH - 1;
//   return getMonthKey(CURRENT_YEAR, lastMonth);
// }

// Gets data for a specific period
export function getKeysForPeriod(period: PeriodKey): {
  current: string;
  previous: string;
} {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  switch (period) {
    case 'this-month':
      return {
        current: getMonthKey(year, month),
        previous: getMonthKey(year, month - 1),
      };

    case 'last-month':
      return {
        current: getMonthKey(year, month - 1),
        previous: getMonthKey(year, month - 2),
      };

    case 'this-year':
      // Sum of all months this year
      return {
        current: `${year}-year`,
        previous: `${year - 1}-year`,
      };

    case 'last-year':
      return {
        current: `${year - 1}-year`,
        previous: `${year - 2}-year`,
      };
  }
}

// Aggregates cashflow for a year
export function aggregateYearlyCashflow(
  data: Record<string, Cashflow>,
  year: number
): Cashflow {
  let totalIncomes = 0;
  let totalExpenses = 0;

  for (let month = 0; month < 12; month++) {
    const key = getMonthKey(year, month);
    const monthData = data[key];
    if (monthData) {
      totalIncomes += monthData.incomes;
      totalExpenses += monthData.expenses;
    }
  }

  return {
    incomes: Math.round(totalIncomes * 100) / 100,
    expenses: Math.round(totalExpenses * 100) / 100,
  };
}
