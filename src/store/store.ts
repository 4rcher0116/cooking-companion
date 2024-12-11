import { configureStore } from '@reduxjs/toolkit';
import recipeSearchReducer from './slices/recipeSearchSlice';
import completionToolReducer from './slices/completionToolSlice';

const store = configureStore({
  reducer: {
    recipeSearch: recipeSearchReducer,
    completionTool: completionToolReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
