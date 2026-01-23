import { v4 as uuidv4 } from 'uuid';
import type {
  InitialMonthlyBudget,
  InitialTransaction,
} from '../types/initialData.types';
import {
  EXPENSE_SOURCES,
  INCOME_SOURCES,
} from '../../transactions/constants/last-transactions.constants';

export const INITIAL_BALANCE = 5000;

// Lorem ipsum generator
function generateDescription(): string {
  const sentences = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa.',
    'Nisi ut aliquip ex ea commodo consequat.',
    'Curabitur pretium tincidunt lacus nulla gravida orci a odio.',
    'Pellentesque habitant morbi tristique senectus et netus.',
    'Mauris blandit aliquet elit, eget tincidunt nibh pulvinar.',
    'Vestibulum ac diam sit amet quam vehicula elementum.',
    'Proin eget tortor risus cras ultricies ligula sed magna.',
    'Quisque velit nisi, pretium ut lacinia in elementum.',
    'Vivamus magna justo, lacinia eget consectetur sed convallis.',
    'Donec sollicitudin molestie malesuada praesent sapien massa.',
    'Nulla porttitor accumsan tincidunt sed porttitor lectus nibh.',
  ];

  const count = 5 + Math.floor(Math.random() * 11); // 5-15 sentences
  const selected = [];
  for (let i = 0; i < count; i++) {
    selected.push(sentences[Math.floor(Math.random() * sentences.length)]);
  }
  return selected.join(' ');
}

const BIG_PURCHASES = [
  {
    name: 'Tesla',
    amount: 50000,
    threshold: 60000,
    category: 'Transportation',
  },
];

// Generates balanced transactions
export function generateBalancedTransactions(
  startYear: number,
  startMonth: number,
  endYear: number,
  endMonth: number,
  initialBalance: number = INITIAL_BALANCE
): InitialMonthlyBudget[] {
  const results: InitialMonthlyBudget[] = [];
  let currentBalance = initialBalance;

  // Calculate total months for trend purposes
  const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;

  // Trend parameters
  const MIN_INCOME = 4000;
  const MAX_INCOME = 10000;
  const INCOME_GROWTH = (MAX_INCOME - MIN_INCOME) / (totalMonths - 1);

  let year = startYear;
  let month = startMonth;
  let monthIndex = 0;

  while (year < endYear || (year === endYear && month <= endMonth)) {
    const monthTransactions: InitialTransaction[] = [];
    // const monthStartBalance = currentBalance;
    let monthTotalIncome = 0;
    // let monthTotalExpenses = 0;

    // Base target income for this month (linear trend)
    const baseTargetIncome = MIN_INCOME + INCOME_GROWTH * monthIndex;

    // Add ±15% variation (to avoid monotonous growth)
    const variance = 0.15;
    const targetIncome =
      baseTargetIncome * (1 + (Math.random() - 0.5) * 2 * variance);

    const createDate = (day: number) => {
      const d = new Date(year, month, day);
      return d.toISOString().split('T')[0];
    };

    // 1. INCOME - distributed throughout the month to reach targetIncome
    const incomeCount = 3 + Math.floor(Math.random() * 3);

    const firstHalfCount = 1 + Math.floor(Math.random() * (incomeCount - 1));
    const secondHalfCount = incomeCount - firstHalfCount;

    const firstHalfDays = Array.from(
      { length: firstHalfCount },
      () => 1 + Math.floor(Math.random() * 15)
    ).sort((a, b) => a - b);

    const secondHalfDays = Array.from(
      { length: secondHalfCount },
      () => 16 + Math.floor(Math.random() * 13)
    ).sort((a, b) => a - b);

    const allIncomeDays = [...firstHalfDays, ...secondHalfDays];

    // Distribute targetIncome among transactions
    allIncomeDays.forEach((day, idx) => {
      const source = weightedRandom(INCOME_SOURCES);

      // The last transaction gets the remainder to reach targetIncome
      let amount: number;
      if (idx === allIncomeDays.length - 1) {
        amount = Math.max(500, targetIncome - monthTotalIncome);
      } else {
        // Distribute proportionally to weight
        const remainingTransactions = allIncomeDays.length - idx;
        const avgPerTransaction =
          (targetIncome - monthTotalIncome) / remainingTransactions;
        amount = avgPerTransaction * (0.8 + Math.random() * 0.4); // ±20% variation
      }

      amount = Math.round(amount * 100) / 100;

      monthTransactions.push({
        id: uuidv4(),
        type: 'income',
        name: source.name,
        method: 'bank_account',
        date: createDate(day),
        amount,
        description: generateDescription(),
        createdAt: new Date(year, month, day).toISOString(),
      });

      currentBalance += amount;
      monthTotalIncome += amount;
    });

    // 2. CHECK FOR BIG PURCHASE
    const availablePurchase = BIG_PURCHASES.find(
      (p) =>
        currentBalance >= p.threshold &&
        !results.some((m) => m.transactions.some((t) => t.name === p.name))
    );

    if (availablePurchase) {
      const purchaseDay = 10 + Math.floor(Math.random() * 5);

      monthTransactions.push({
        id: uuidv4(),
        type: 'expense',
        name: availablePurchase.name,
        category: availablePurchase.category,
        method:
          currentBalance >= availablePurchase.amount
            ? 'bank_account'
            : 'credit_card',
        date: createDate(purchaseDay),
        amount: -availablePurchase.amount,
        description: `Major purchase: ${availablePurchase.name}. ${generateDescription()}`,
        createdAt: new Date(year, month, purchaseDay).toISOString(),
      });

      currentBalance -= availablePurchase.amount;
      // monthTotalExpenses += availablePurchase.amount;
    }

    // 3. REGULAR EXPENSES - also grow over time (30-50% of income)
    const expenseRatio = 0.35 + Math.random() * 0.15; // 35-50%
    const targetExpenses = targetIncome * expenseRatio;
    let accumulatedExpenses = 0;

    const maxRegularExpenses = 15;
    const expenseDays = Array.from(
      { length: maxRegularExpenses },
      (_, i) =>
        5 +
        Math.floor((25 / maxRegularExpenses) * i) +
        Math.floor(Math.random() * 2)
    ).sort(() => Math.random() - 0.5);

    expenseDays.forEach((day, idx) => {
      const remainingTarget = targetExpenses - accumulatedExpenses;
      if (remainingTarget <= 0) return;
      if (currentBalance - remainingTarget < 500) return;

      const source =
        EXPENSE_SOURCES[Math.floor(Math.random() * EXPENSE_SOURCES.length)];

      // Distribute expenses
      let amount: number;
      if (
        idx === expenseDays.length - 1 ||
        accumulatedExpenses > targetExpenses * 0.9
      ) {
        amount = Math.min(remainingTarget, source.amount * 2);
      } else {
        const remainingTransactions = expenseDays.length - idx;
        const avgPerTransaction = remainingTarget / remainingTransactions;
        amount = Math.min(
          avgPerTransaction * (0.5 + Math.random()),
          source.amount * 2
        );
      }

      amount = Math.round(amount * 100) / 100;

      if (currentBalance - amount < 500) return;

      const method =
        source.name === 'Mortgage'
          ? 'bank_account'
          : Math.random() > 0.5
            ? 'credit_card'
            : 'debit_card';

      monthTransactions.push({
        id: uuidv4(),
        type: 'expense',
        name: source.name,
        category: source.category,
        method,
        date: createDate(day),
        amount: -amount,
        description: generateDescription(),
        createdAt: new Date(year, month, day).toISOString(),
      });

      currentBalance -= amount;
      accumulatedExpenses += amount;
      // monthTotalExpenses += amount;
    });

    monthTransactions.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    results.push({
      year,
      month,
      transactions: monthTransactions,
      // startingBalance: Math.round(monthStartBalance * 100) / 100,
      // totalIncome: Math.round(monthTotalIncome * 100) / 100,
      // totalExpenses: Math.round(monthTotalExpenses * 100) / 100,
      // endingBalance: Math.round(currentBalance * 100) / 100,
    });

    monthIndex++;
    month++;
    if (month > 11) {
      month = 0;
      year++;
    }
  }

  return results;
}

function weightedRandom<T extends { weight?: number }>(items: readonly T[]): T {
  const totalWeight = items.reduce((sum, item) => sum + (item.weight || 1), 0);
  let random = Math.random() * totalWeight;

  for (const item of items) {
    random -= item.weight || 1;
    if (random <= 0) return item;
  }

  return items[0];
}
