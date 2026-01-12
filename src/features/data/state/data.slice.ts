import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Cashflow } from '@/features/cashflow/types/cashflow.types';
import type {
  ExpensesData,
  MonthExpenses,
} from '@/features/expenses/types/expenses.types';
import { generateTwoYearsData } from '@/features/data/utils/mock-data-generators.utils';

interface DataState {
  cashflow: Record<string, Cashflow>;
  expenses: ExpensesData;
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
      action: PayloadAction<{ key: string; data: MonthExpenses }>
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
