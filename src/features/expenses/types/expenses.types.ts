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
}

export interface MonthExpenses {
  total: number;
  period: string;
  categories: Expense[];
}

export interface ExpensesData {
  [key: string]: MonthExpenses;
}

export interface CategoryStats {
  id: string;
  name: string;
  amount: number;
  percentage: number;
  totalAmount: number;
}

export interface YearExpenses {
  year: number;
  monthCount: number;
  totalExpenses: number;
  avgMonthlyExpenses: number;
  categories: CategoryStats[];
}

export interface ExpensesStats {
  [year: number]: YearExpenses;
}

export interface CategoryGroup {
  id: string;
  name: string;
  amounts: number[];
  percentages: number[];
}

interface ExpenseCategoryConfig {
  id: string;
  name: ExpenseCategory;
  basePercentage: number;
}
export const EXPENSE_CATEGORIES_CONFIG: ExpenseCategoryConfig[] = [
  { id: '1', name: ExpenseCategory.House, basePercentage: 40 },
  { id: '2', name: ExpenseCategory.Charges, basePercentage: 20 },
  { id: '3', name: ExpenseCategory.Transportation, basePercentage: 13 },
  { id: '4', name: ExpenseCategory.Groceries, basePercentage: 10 },
  { id: '5', name: ExpenseCategory.Entertainment, basePercentage: 7 },
  { id: '6', name: ExpenseCategory.Shopping, basePercentage: 10 },
];
