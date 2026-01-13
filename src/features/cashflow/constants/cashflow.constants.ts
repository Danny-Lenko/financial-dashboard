import { CashflowCategory } from '@/features/cashflow/types/cashflow.types';

export const CASHFLOW_CATEGORY_ORDER = [
  CashflowCategory.Balance,
  CashflowCategory.Incomes,
  CashflowCategory.Expenses,
] as const;

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
