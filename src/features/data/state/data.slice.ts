import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type {
  AddTransactionPayload,
  DataState,
  InitialMonthlyBudget,
  RemoveTransactionPayload,
} from '../types/initialData.types';

import initialTransactions from '../mocks/initial-transactions.json';

const initialState: DataState = {
  initialTransactions: [],
  isInitialized: false,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    initializeData(state) {
      if (!state.isInitialized) {
        state.initialTransactions =
          initialTransactions as InitialMonthlyBudget[];
        state.isInitialized = true;
      }
    },

    addTransaction(state, action: PayloadAction<AddTransactionPayload>) {
      const { year, month, transaction } = action.payload;

      const monthlyBudget = state.initialTransactions.find(
        (item) => item.year === year && item.month === month
      );

      if (monthlyBudget) {
        monthlyBudget.transactions.push(transaction);
      } else {
        state.initialTransactions.push({
          year,
          month,
          transactions: [transaction],
        });
      }
    },

    removeTransaction(state, action: PayloadAction<RemoveTransactionPayload>) {
      const { year, month, transactionId } = action.payload;

      const monthlyBudget = state.initialTransactions.find(
        (item) => item.year === year && item.month === month
      );

      if (!monthlyBudget) return;

      monthlyBudget.transactions = monthlyBudget.transactions.filter(
        (t) => t.id !== transactionId
      );

      // cleanup: if no transactions left for the month, remove the month entry
      if (monthlyBudget.transactions.length === 0) {
        state.initialTransactions = state.initialTransactions.filter(
          (item) => !(item.year === year && item.month === month)
        );
      }
    },
  },
});

export const { initializeData, addTransaction, removeTransaction } =
  dataSlice.actions;
export default dataSlice.reducer;
