import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type {
  CashflowData,
  MonthCashflow,
} from '@/features/cashflow/types/cashflow.types';
import type {
  ExpensesData,
  MonthExpenses,
} from '@/features/expenses/types/expenses.types';
import { generateTwoYearsData } from '@/features/data/utils/mock-data-generators.utils';
import type { TransactionsData } from '@/features/transactions/types/transaction.types';

interface DataState {
  cashflow: CashflowData;
  expenses: ExpensesData;
  transactions: TransactionsData;
  isInitialized: boolean;
}

const initialState: DataState = {
  cashflow: {},
  expenses: {},
  transactions: {},
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
        state.transactions = data.transactions;
        state.isInitialized = true;
      }
    },

    updateCashflow(
      state,
      action: PayloadAction<{ key: string; data: MonthCashflow }>
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
