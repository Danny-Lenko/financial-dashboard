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

export interface CategoryStats {
  name: ExpenseCategory;
  amount: number;
  percentage: number;
}

export interface MonthExpenses {
  total: number;
  categories: CategoryStats[];
}
