import { periods, type PeriodState } from '@/types/features/period.types';
import { getCurrentPeriod } from '@/utils/period-helpers.utils';
import { createSlice } from '@reduxjs/toolkit';

const initialState: PeriodState = {
  activePeriod: periods.thisMonth,
  currentPeriod: getCurrentPeriod(),
};

const periodSlice = createSlice({
  name: 'period',
  initialState,
  reducers: {
    setActivePeriod(state, action) {
      state.activePeriod = action.payload;
    },
  },
});

export const { setActivePeriod } = periodSlice.actions;
export default periodSlice.reducer;
