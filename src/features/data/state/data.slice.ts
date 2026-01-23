import { createSlice } from '@reduxjs/toolkit';

import type {
  DataState,
  InitialMonthlyBudget,
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
  },
});

export const { initializeData } = dataSlice.actions;
export default dataSlice.reducer;
