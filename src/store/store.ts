import { configureStore } from '@reduxjs/toolkit';
import periodReducer from '../features/period/period.slice';

const store = configureStore({
  reducer: {
    period: periodReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
