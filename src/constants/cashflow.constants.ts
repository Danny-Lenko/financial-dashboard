import { CashflowCategory } from '@/types/cashflow.types';

export const CASHFLOW_CATEGORY_ORDER = [
  CashflowCategory.Balance,
  CashflowCategory.Incomes,
  CashflowCategory.Expenses,
] as const;

export const CASHFLOW_CATEGORY_TITLES: Record<CashflowCategory, string> = {
  [CashflowCategory.Balance]: 'Balance',
  [CashflowCategory.Incomes]: 'Incomes',
  [CashflowCategory.Expenses]: 'Expenses',
};
