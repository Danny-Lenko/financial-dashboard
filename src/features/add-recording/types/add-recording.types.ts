export const AddRecordingButton = {
  Income: 'income',
  Expense: 'expense',
  Transfer: 'transfer',
} as const;

export type AddRecordingButton =
  (typeof AddRecordingButton)[keyof typeof AddRecordingButton];
