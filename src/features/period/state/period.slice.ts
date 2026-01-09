import { createSlice } from '@reduxjs/toolkit';

import { type PeriodState } from '@/features/period/types/period.types';
import { CURRENT_MONTH_KEY } from '@/shared/constants/current-period.constants';

const initialState: PeriodState = {
  activePeriod: CURRENT_MONTH_KEY,
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
