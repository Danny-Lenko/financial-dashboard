export const ExpenseCategory = {
  House: 'House',
  Charges: 'Charges',
  Transportation: 'Transportation',
  Groceries: 'Groceries',
  Entertainment: 'Entertainment',
  Shopping: 'Shopping',
} as const;

export type ExpenseCategory =
  (typeof ExpenseCategory)[keyof typeof ExpenseCategory];

export interface Expense {
  id: string;
  name: ExpenseCategory;
  amount: number;
  percentage: number;
  //   color?: string;
  //   icon?: string;
}

export interface ExpensesByPeriodData {
  total: number;
  period: string;
  categories: Expense[];
}
