import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type {
  AddTransactionPayload,
  DataState,
  InitialMonthlyBudget,
  RemoveTransactionPayload,
  UpdateTransactionPayload,
} from '../types/initialData.types';

import { transactionsAdapter } from './data.adapter';
import initialTransactions from '../mocks/initial-transactions.json';

const normalizeTransactions = (monthlyData: InitialMonthlyBudget[]) =>
  monthlyData.flatMap((monthlyBudget) => monthlyBudget.transactions);

const initialState: DataState = transactionsAdapter.getInitialState({
  isInitialized: false,
});

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    initializeData(state) {
      if (!state.isInitialized) {
        transactionsAdapter.setAll(
          state,
          normalizeTransactions(initialTransactions as InitialMonthlyBudget[])
        );
        state.isInitialized = true;
      }
    },

    addTransaction(state, action: PayloadAction<AddTransactionPayload>) {
      transactionsAdapter.addOne(state, action.payload.transaction);
    },

    updateTransaction(state, action: PayloadAction<UpdateTransactionPayload>) {
      transactionsAdapter.updateOne(state, {
        id: action.payload.transaction.id,
        changes: action.payload.transaction,
      });
    },

    removeTransaction(state, action: PayloadAction<RemoveTransactionPayload>) {
      transactionsAdapter.removeOne(state, action.payload.transactionId);
    },
  },
});

export const {
  initializeData,
  addTransaction,
  updateTransaction,
  removeTransaction,
} = dataSlice.actions;
export default dataSlice.reducer;
