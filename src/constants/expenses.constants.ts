import { ExpenseCategory } from '@/types/expenses.types';
import HomeSvg from '@assets/expenses/home.svg?react';
import ChargesSvg from '@assets/expenses/charges.svg?react';
import TransportationSvg from '@assets/expenses/transportation.svg?react';
import GroceriesSvg from '@assets/expenses/groceries.svg?react';
import EntertainmentSvg from '@assets/expenses/entertainment.svg?react';
import ShoppingSvg from '@assets/expenses/shopping.svg?react';

interface ExpenseConfig {
  name: ExpenseCategory;
  color: string;
  icon: React.ElementType;
}

export const EXPENSES_CONFIG: ExpenseConfig[] = [
  {
    name: ExpenseCategory.House,
    color: 'secondary.main',
    icon: HomeSvg,
  },
  {
    name: ExpenseCategory.Charges,
    color: 'error.dark',
    icon: ChargesSvg,
  },
  {
    name: ExpenseCategory.Transportation,
    color: 'secondary.light',
    icon: TransportationSvg,
  },
  {
    name: ExpenseCategory.Groceries,
    color: 'success.main',
    icon: GroceriesSvg,
  },
  {
    name: ExpenseCategory.Entertainment,
    color: 'warning.dark',
    icon: EntertainmentSvg,
  },
  {
    name: ExpenseCategory.Shopping,
    color: 'secondary.dark',
    icon: ShoppingSvg,
  },
];
