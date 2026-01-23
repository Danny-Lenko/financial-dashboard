import type { RootState } from '@/store/store';

export const selectDataState = (state: RootState) => state.data;

export const selectIsInitialized = (state: RootState) =>
  state.data.isInitialized;

export const selectInitialTransactions = (state: RootState) =>
  state.data.initialTransactions;
