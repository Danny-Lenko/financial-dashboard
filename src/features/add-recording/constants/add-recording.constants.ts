import AddIncomeSvg from '@assets/add_income.svg?react';
import AddExpenseSvg from '@assets/add_expense.svg?react';
import TransferMoneySvg from '@assets/transfer_money.svg?react';
import { AddRecordingButton } from '../types/add-recording.types';

export const ADD_RECORDING_BUTTONS_ORDER = [
  AddRecordingButton.Income,
  AddRecordingButton.Expense,
  AddRecordingButton.Transfer,
] as const;

export type AddRecordingButtonType =
  (typeof ADD_RECORDING_BUTTONS_ORDER)[number];

export const ADD_RECORDING_BUTTONS_CONFIG: Record<
  AddRecordingButton,
  {
    title: string;
    subtitle: string;
    icon: React.ElementType;
    disabled?: boolean;
    path: string;
  }
> = {
  [AddRecordingButton.Income]: {
    title: 'Add income',
    subtitle: 'Create an income manually',
    icon: AddIncomeSvg,
    path: `/transactions/add/${AddRecordingButton.Income}`,
  },
  [AddRecordingButton.Expense]: {
    title: 'Add expense',
    subtitle: 'Create an expense manually',
    icon: AddExpenseSvg,
    path: `/transactions/add/${AddRecordingButton.Expense}`,
  },
  [AddRecordingButton.Transfer]: {
    title: 'Transfer money',
    subtitle: 'Select the amount and make a transfer',
    icon: TransferMoneySvg,
    disabled: true,
    path: `/transactions/add/${AddRecordingButton.Transfer}`,
  },
};
