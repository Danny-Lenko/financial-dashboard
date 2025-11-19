import { CashflowCategory } from '@/types/cashflow.types';

export const CASHFLOW_CATEGORY_ORDER = [
  CashflowCategory.Balance,
  CashflowCategory.Incomes,
  CashflowCategory.Expenses,
] as const;

// export const CASHFLOW_CATEGORY_TITLES: Record<CashflowCategory, string> = {
//   [CashflowCategory.Balance]: 'Balance',
//   [CashflowCategory.Incomes]: 'Incomes',
//   [CashflowCategory.Expenses]: 'Expenses',
// };

export const CASHFLOW_CATEGORY_CONFIG: Record<
  CashflowCategory,
  { title: string; amountColor: string }
> = {
  [CashflowCategory.Balance]: {
    title: 'Balance',
    amountColor: 'primary.main',
  },
  [CashflowCategory.Incomes]: {
    title: 'Incomes',
    amountColor: 'text.primary ',
  },
  [CashflowCategory.Expenses]: {
    title: 'Expenses',
    amountColor: 'text.primary ',
  },
};
