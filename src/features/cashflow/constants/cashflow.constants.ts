import {
  CashflowCategory,
  AddRecordingButton,
} from '@/features/cashflow/types/cashflow.types';
import AddIncomeSvg from '@assets/add_income.svg?react';
import AddExpenseSvg from '@assets/add_expense.svg?react';
import TransferMoneySvg from '@assets/transfer_money.svg?react';

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

export const ADD_RECORDING_BUTTONS_ORDER = [
  AddRecordingButton.Income,
  AddRecordingButton.Expense,
  AddRecordingButton.Transfer,
] as const;

export const ADD_RECORDING_BUTTONS_CONFIG: Record<
  AddRecordingButton,
  { title: string; subtitle: string; icon: React.ElementType }
> = {
  [AddRecordingButton.Income]: {
    title: 'Add income',
    subtitle: 'Create an income manually',
    icon: AddIncomeSvg,
  },
  [AddRecordingButton.Expense]: {
    title: 'Add expense',
    subtitle: 'Create an expense manually',
    icon: AddExpenseSvg,
  },
  [AddRecordingButton.Transfer]: {
    title: 'Transfer money',
    subtitle: 'Select the amount and make a transfer',
    icon: TransferMoneySvg,
  },
};
