import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Cashflow } from '@/types/cashflow.types';
import type { ExpensesByPeriodData } from '@/types/expenses.types';
import { generateTwoYearsData } from '@/utils/mock-data-generators.utils';

interface DataState {
  cashflow: Record<string, Cashflow>;
  expenses: Record<string, ExpensesByPeriodData>;
  isInitialized: boolean;
}

const initialState: DataState = {
  cashflow: {},
  expenses: {},
  isInitialized: false,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    initializeData(state) {
      if (!state.isInitialized) {
        const data = generateTwoYearsData();
        // const data = {
        //   cashflow: { 'this-month': { incomes: 0, expenses: 0 } },
        //   expenses: { 'this-month': { total: 0, period: '', categories: [] } },
        //   isInitialized: true,
        // };
        state.cashflow = data.cashflow;
        state.expenses = data.expenses;
        state.isInitialized = true;
      }
    },

    updateCashflow(
      state,
      action: PayloadAction<{ key: string; data: Cashflow }>
    ) {
      const { key, data } = action.payload;
      state.cashflow[key] = data;
    },

    updateExpenses(
      state,
      action: PayloadAction<{ key: string; data: ExpensesByPeriodData }>
    ) {
      const { key, data } = action.payload;
      state.expenses[key] = data;
    },

    resetData(state) {
      const data = generateTwoYearsData();
      state.cashflow = data.cashflow;
      state.expenses = data.expenses;
      state.isInitialized = true;
    },
  },
});

export const { initializeData, updateCashflow, updateExpenses } =
  dataSlice.actions;
export default dataSlice.reducer;
