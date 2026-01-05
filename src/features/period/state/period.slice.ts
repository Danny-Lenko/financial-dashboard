import { Period, type PeriodState } from '@/features/period/types/period.types';
import { getCurrentPeriod } from '@/features/period/utils/period.utils';
import { createSlice } from '@reduxjs/toolkit';

const initialState: PeriodState = {
  activePeriod: Period.ThisMonth,
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
