import { periods, type PeriodState } from '@/types/features/period.types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: PeriodState = {
  currentPeriod: periods.thisMonth,
};

const periodSlice = createSlice({
  name: 'period',
  initialState,
  reducers: {
    setPeriod(state, action) {
      state.currentPeriod = action.payload;
    },
  },
});

export const { setPeriod } = periodSlice.actions;
export default periodSlice.reducer;
