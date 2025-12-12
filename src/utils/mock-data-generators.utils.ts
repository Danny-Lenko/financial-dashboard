import type { Cashflow } from '@/types/cashflow.types';
import type { ExpensesByPeriodData } from '@/types/expenses.types';
import {
  MONTHS,
  CURRENT_YEAR,
  CURRENT_MONTH,
} from '@/constants/periods.constants';

import { ExpenseCategory } from '@/types/expenses.types';

const BASE_INCOME = 9000;
const BASE_EXPENSE = 4000;

interface ExpenseCategoryConfig {
  id: string;
  name: ExpenseCategory;
  basePercentage: number;
}

const EXPENSE_CATEGORIES_CONFIG: ExpenseCategoryConfig[] = [
  { id: '1', name: ExpenseCategory.House, basePercentage: 40 },
  { id: '2', name: ExpenseCategory.Charges, basePercentage: 20 },
  { id: '3', name: ExpenseCategory.Transportation, basePercentage: 13 },
  { id: '4', name: ExpenseCategory.Groceries, basePercentage: 10 },
  { id: '5', name: ExpenseCategory.Entertainment, basePercentage: 7 },
  { id: '6', name: ExpenseCategory.Shopping, basePercentage: 10 },
];

// Generates a random number with variance
function randomize(base: number, variance: number = 0.2): number {
  const min = base * (1 - variance);
  const max = base * (1 + variance);
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

// Generates cashflow for a specific month
export function generateMonthlyCashflow(year: number, month: number): Cashflow {
  // Trend: older data = larger (were richer in the past)
  const monthsAgo = (CURRENT_YEAR - year) * 12 + (CURRENT_MONTH - month);
  const trendMultiplier = 1 + monthsAgo * 0.03; // +3% per month ago

  return {
    incomes: randomize(BASE_INCOME * trendMultiplier, 0.15),
    expenses: randomize(BASE_EXPENSE * trendMultiplier, 0.2),
  };
}

// Generates expenses breakdown for a specific month
export function generateMonthlyExpenses(
  year: number,
  month: number,
  totalExpense: number
): ExpensesByPeriodData {
  const categories = EXPENSE_CATEGORIES_CONFIG.map((cat) => {
    const amount = randomize((totalExpense * cat.basePercentage) / 100, 0.25);
    return {
      id: cat.id,
      name: cat.name,
      amount,
      percentage: (amount / totalExpense) * 100,
    };
  });

  // Normalize so the sum = 100%
  const totalAmount = categories.reduce((sum, cat) => sum + cat.amount, 0);
  const normalizedCategories = categories.map((cat) => ({
    ...cat,
    amount: (cat.amount / totalAmount) * totalExpense,
    percentage: (cat.amount / totalAmount) * 100,
  }));

  return {
    total: totalExpense,
    period: `${MONTHS[month]} ${year}`,
    categories: normalizedCategories,
  };
}

// Generates all data for 2 years
export function generateTwoYearsData() {
  const data: {
    cashflow: Record<string, Cashflow>;
    expenses: Record<string, ExpensesByPeriodData>;
  } = {
    cashflow: {},
    expenses: {},
  };

  // Generates data for 24 months
  for (let yearOffset = 2; yearOffset >= 0; yearOffset--) {
    const year = CURRENT_YEAR - yearOffset;

    let startMonth: number;
    let endMonth: number;

    if (yearOffset === 2) {
      startMonth = CURRENT_MONTH;
      endMonth = 11;
    } else if (yearOffset === 1) {
      startMonth = 0;
      endMonth = 11;
    } else {
      startMonth = 0;
      endMonth = CURRENT_MONTH;
    }
    // const startMonth = yearOffset === 1 ? CURRENT_MONTH : 0;
    // const endMonth = yearOffset === -1 ? CURRENT_MONTH : 11;

    for (let month = startMonth; month <= endMonth; month++) {
      const key = `${year}-${String(month).padStart(2, '0')}`;
      const cashflow = generateMonthlyCashflow(year, month);

      data.cashflow[key] = cashflow;
      data.expenses[key] = generateMonthlyExpenses(
        year,
        month,
        cashflow.expenses
      );
    }
  }

  return data;
}
