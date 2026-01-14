import type {
  CashflowData,
  MonthCashflow,
} from '@/features/cashflow/types/cashflow.types';
import type {
  ExpensesData,
  MonthExpenses,
} from '@/features/expenses/types/expenses.types';
import { EXPENSE_CATEGORIES_CONFIG } from '@/features/expenses/types/expenses.types';
import { MONTHS } from '@/shared/constants/months.constants';
import {
  CURRENT_YEAR,
  CURRENT_MONTH,
} from '@/shared/constants/current-period.constants';
import type { Transaction } from '@/features/transactions/types/transaction.types';
import {
  EXPENSE_SOURCES,
  INCOME_SOURCES,
} from '@/features/transactions/constants/last-transactions.constants';

const BASE_INCOME = 9000;
const BASE_EXPENSE = 4000;

// Generates a random number with variance
function randomize(base: number, variance: number = 0.2): number {
  const min = base * (1 - variance);
  const max = base * (1 + variance);
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

// Generates cashflow for a specific month
export function generateMonthlyCashflow(
  year: number,
  month: number
): MonthCashflow {
  // Trend: older data = smaller (were poorer in the past)
  const monthsAgo = (CURRENT_YEAR - year) * 12 + (CURRENT_MONTH - month);
  const trendMultiplier = 1 - monthsAgo * 0.03; // -3% per month ago

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
): MonthExpenses {
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

// Generates a random date string within the given month
function randomDateInMonth(year: number, month: number): string {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const day = Math.floor(Math.random() * daysInMonth) + 1;
  return `${year}/${String(month + 1).padStart(2, '0')}/${String(day).padStart(2, '0')}`;
}

// Generates transactions for a specific month
function generateMonthlyTransactions(
  year: number,
  month: number
): Transaction[] {
  const transactions: Transaction[] = [];
  let idCounter = 1;

  // 3-5 incomes
  const incomeCount = 3 + Math.floor(Math.random() * 3);
  for (let i = 0; i < incomeCount; i++) {
    const totalWeight = INCOME_SOURCES.reduce((sum, s) => sum + s.weight, 0);
    let random = Math.random() * totalWeight;
    let source = INCOME_SOURCES.at(0)!;

    for (const s of INCOME_SOURCES) {
      random -= s.weight;
      if (random <= 0) {
        source = s;
        break;
      }
    }

    transactions.push({
      id: `${year}-${month}-${idCounter++}`,
      name: source.name,
      method: 'bank_account',
      date: randomDateInMonth(year, month),
      amount: randomize(800, 0.3),
    });
  }

  // 15-17 expenses
  const expenseCount = 20 - incomeCount;
  for (let i = 0; i < expenseCount; i++) {
    const source =
      EXPENSE_SOURCES[Math.floor(Math.random() * EXPENSE_SOURCES.length)];
    const method =
      source.name === 'Mortgage'
        ? 'bank_account'
        : Math.random() > 0.5
          ? 'credit_card'
          : 'debit_card';

    transactions.push({
      id: `${year}-${month}-${idCounter++}`,
      name: source.name,
      method,
      date: randomDateInMonth(year, month),
      amount: -randomize(source.amount, 0.3),
    });
  }

  // Sort by date (newest first)
  return transactions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// Generates all data for 2 years
export function generateTwoYearsData() {
  const data: {
    cashflow: CashflowData;
    expenses: ExpensesData;
    transactions: { [key: string]: Transaction[] };
  } = {
    cashflow: {},
    expenses: {},
    transactions: {},
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

    for (let month = startMonth; month <= endMonth; month++) {
      const key = `${year}-${String(month).padStart(2, '0')}`;
      const cashflow = generateMonthlyCashflow(year, month);

      data.cashflow[key] = cashflow;
      data.expenses[key] = generateMonthlyExpenses(
        year,
        month,
        cashflow.expenses
      );
      data.transactions[key] = generateMonthlyTransactions(year, month);
    }
  }

  return data;
}
