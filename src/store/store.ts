import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import periodReducer from '../features/period/period.slice';
import dataReducer from '../features/data/data.slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['data'],
};

const rootReducer = combineReducers({
  period: periodReducer,
  data: dataReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// import { configureStore } from '@reduxjs/toolkit';
// import periodReducer from '../features/period/period.slice';

// const store = configureStore({
//   reducer: {
//     period: periodReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;
