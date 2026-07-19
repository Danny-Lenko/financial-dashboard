import type { ExpenseCategory } from '@/features/expenses/types/expenses.types';

interface ExpensesByPeriodMock {
  total: number;
  period: string;
  categories: {
    id: string;
    name: ExpenseCategory;
    amount: number;
    percentage: number;
  }[];
}

export const thisMonthExpensesMock: ExpensesByPeriodMock = {
  total: 3945.55,
  period: 'March 2024',
  categories: [
    {
      id: '1',
      name: 'House',
      amount: 1631.5,
      percentage: 41.35,
    },
    {
      id: '2',
      name: 'Charges',
      amount: 848.45,
      percentage: 21.51,
    },
    {
      id: '3',
      name: 'Transportation',
      amount: 531.65,
      percentage: 13.47,
    },
    {
      id: '4',
      name: 'Groceries',
      amount: 383.37,
      percentage: 9.97,
    },
    {
      id: '5',
      name: 'Entertainment',
      amount: 132.18,
      percentage: 3.35,
    },
    {
      id: '6',
      name: 'Shopping',
      amount: 418.4,
      percentage: 10.35,
    },
  ],
};
