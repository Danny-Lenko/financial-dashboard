import { createSlice } from '@reduxjs/toolkit';

import { generateBalancedTransactions } from '../utils/mock-transactions-generator.utils';
import type { DataState } from '../types/initialData.types';

const firstYearRecorded = 2023;
const firstMonthRecorded = 6;
const lastYearRecorded = 2025;
const lastMonthRecorded = 6;
const initialBalance = 5555;

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
        const initialTransactions = generateBalancedTransactions(
          firstYearRecorded,
          firstMonthRecorded,
          lastYearRecorded,
          lastMonthRecorded,
          initialBalance
        );

        state.initialTransactions = initialTransactions;
        state.isInitialized = true;
      }
    },
  },
});

export const { initializeData } = dataSlice.actions;
export default dataSlice.reducer;
