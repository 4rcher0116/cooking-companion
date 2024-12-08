import { configureStore } from '@reduxjs/toolkit';
import recipeSearchReducer from './slices/recipeSearchSlice';

const store = configureStore({
  reducer: {
    recipeSearch: recipeSearchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
