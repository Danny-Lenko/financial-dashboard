import { createSlice } from '@reduxjs/toolkit';

import { type PeriodState } from '@/features/period/types/period.types';
import {
  CURRENT_MONTH,
  CURRENT_YEAR,
} from '@/shared/constants/current-period.constants';

const initialState: PeriodState = {
  activeMonth: CURRENT_MONTH,
  activeYear: CURRENT_YEAR,
};

const periodSlice = createSlice({
  name: 'period',
  initialState,
  reducers: {
    setActivePeriod(state, action) {
      state.activeMonth = action.payload.month;
      state.activeYear = action.payload.year;
    },

    setActiveMonth(state, action) {
      state.activeMonth = action.payload;
    },

    setActiveYear(state, action) {
      state.activeYear = action.payload;
    },
  },
});

export const { setActivePeriod, setActiveMonth, setActiveYear } =
  periodSlice.actions;
export default periodSlice.reducer;
