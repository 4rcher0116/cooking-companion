// recipeSearchSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { EMPTY_FILTER_VALUES, FilterValues } from '../../constants/FilterValues';
import { RecipeDTO } from '../../constants/RecipeDTO';

interface RecipeSearchState {
  filters: FilterValues;
  recipes: RecipeDTO[];
  loading: boolean;
  error: string | null;
}

const initialState: RecipeSearchState = {
  filters: EMPTY_FILTER_VALUES,
  recipes: [],
  loading: false,
  error: null,
};

export const fetchRecipes = createAsyncThunk(
  'recipeSearch/fetchRecipes',
  async (filters: FilterValues) => {
    const response = await fetch('/api/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    const data: RecipeDTO[] = await response.json();
    return data;
  }
);

const recipeSearchSlice = createSlice({
  name: 'recipeSearch',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<FilterValues>) {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecipes.fulfilled, (state, action: PayloadAction<RecipeDTO[]>) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch recipes';
      });
  },
});

export const { setFilters } = recipeSearchSlice.actions;
export default recipeSearchSlice.reducer;