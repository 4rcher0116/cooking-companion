// completionToolSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RecipeDTO } from "../../constants/RecipeDTO";

interface CompletionToolState {
  recipe: RecipeDTO | null;
  isLoading: boolean;
  error: string | null;
  completionStatus: string;
}

const initialState: CompletionToolState = {
  recipe: null,
  isLoading: false,
  error: null,
  completionStatus: "incomplete",
};

const completionToolSlice = createSlice({
  name: "completionTool",
  initialState,
  reducers: {
    setRecipe(state, action: PayloadAction<RecipeDTO | null>) {
      state.recipe = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setCompletionStatus(state, action: PayloadAction<string>) {
      state.completionStatus = action.payload;
    },
  },
});

export const { setRecipe, setLoading, setError, setCompletionStatus } =
  completionToolSlice.actions;
export default completionToolSlice.reducer;
