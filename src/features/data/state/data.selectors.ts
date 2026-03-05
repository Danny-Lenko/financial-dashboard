import { createEntityAdapter } from '@reduxjs/toolkit';
import type { RootState } from '@/store/store';
import type { InitialTransaction } from '../types/initialData.types';

const transactionsAdapter = createEntityAdapter<InitialTransaction, string>();

export const selectDataState = (state: RootState) => state.data;

export const selectIsInitialized = (state: RootState) =>
  state.data.isInitialized;

const transactionSelectors = transactionsAdapter.getSelectors(selectDataState);

export const selectInitialTransactions = transactionSelectors.selectAll;
export const selectInitialTransactionEntities =
  transactionSelectors.selectEntities;
export const selectInitialTransactionIds = transactionSelectors.selectIds;
