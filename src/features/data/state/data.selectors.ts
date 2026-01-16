import type { RootState } from '@/store/store';

export const selectDataState = (state: RootState) => state.data;
export const selectCashflowData = (state: RootState) => state.data.cashflow;
export const selectExpensesData = (state: RootState) => state.data.expenses;
export const selectTransactionsData = (state: RootState) =>
  state.data.transactions;

export const selectIsInitialized = (state: RootState) =>
  state.data.isInitialized;
export const selectInitialTransactions = (state: RootState) =>
  state.data.initialTransactions;
