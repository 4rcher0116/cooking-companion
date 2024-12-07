// recipeSearchSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  EMPTY_FILTER_VALUES,
  FilterValues,
} from "../../constants/FilterValues";
import { RecipeDTO } from "../../constants/RecipeDTO";

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
 
//TODO: Implement the filters.servingSize and skill level as a frontend filters for the user to select
//TODO: implement a dietary restrictions and diet choice filter for the user to select
export const fetchRecipes = createAsyncThunk(
  "recipeSearch/fetchRecipes",
  async (filters: FilterValues, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams();

      if (filters.nameSearch) {
        queryParams.append("query", filters.nameSearch);
      } else if (filters.mealType) {
        queryParams.append("query", filters.mealType);
      }

      if (filters.mealType && filters.mealType.length > 0) {
        queryParams.append("type", filters.mealType);
      }
      if (filters.maxCookTime && filters.maxCookTime.toString().length > 0) {
        queryParams.append("maxReadyTime", filters.maxCookTime.toString());
      }
      if (filters.calories && filters.calories.toString().length > 0) {
        queryParams.append("maxCalories", filters.calories.toString());
      }

      //unmoddable query params
      queryParams.append("instructionsRequred", "true");
      queryParams.append("addRecipeInformation", "true");
      queryParams.append("addRecipeInstructions", "true");
      queryParams.append("ignorePantry", "true");
      queryParams.append("sort", "max-used-ingredients");
      queryParams.append("offset", "0");
      queryParams.append("number", "100");

      const response = await fetch(
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?${queryParams.toString()}`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key":
              "978ab811a1msh136890da1b1be40p1b8f81jsnf35bad97499a",
            "X-RapidAPI-Host":
              "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data = await response.json();

      // Map the results array to match the RecipeDTO structure
      const recipes: RecipeDTO[] = data.results.map((recipe: any) => ({
        vegetarian: recipe.vegetarian || false,
        vegan: recipe.vegan || false,
        glutenFree: recipe.glutenFree || false,
        dairyFree: recipe.dairyFree || false,
        veryHealthy: recipe.veryHealthy || false,
        cheap: recipe.cheap || false,
        veryPopular: recipe.veryPopular || false,
        sustainable: recipe.sustainable || false,
        lowFodmap: recipe.lowFodmap || false,
        weightWatcherSmartPoints: recipe.weightWatcherSmartPoints || 0,
        gaps: recipe.gaps || "",
        preparationMinutes: recipe.preparationMinutes || null,
        cookingMinutes: recipe.cookingMinutes || null,
        aggregateLikes: recipe.aggregateLikes || 0,
        healthScore: recipe.healthScore || 0,
        creditsText: recipe.creditsText || "",
        sourceName: recipe.sourceName || "",
        pricePerServing: recipe.pricePerServing || 0,
        id: recipe.id,
        title: recipe.title || "",
        author: recipe.sourceName || "", // If author maps to sourceName
        readyInMinutes: recipe.readyInMinutes || 0,
        servings: recipe.servings || 0,
        sourceUrl: recipe.sourceUrl || "",
        image: recipe.image || "",
        imageType: recipe.imageType || "",
        nutrition: {
          summary: recipe.summary || "",
        },
        cuisines: recipe.cuisines || [],
        dishTypes: recipe.dishTypes || [],
        diets: recipe.diets || [],
        occasions: recipe.occasions || [],
        analyzedInstructions: recipe.analyzedInstructions.map(
          (instruction: any) => ({
            name: instruction.name || "",
            steps: instruction.steps.map((step: any) => ({
              number: step.number,
              step: step.step || "",
              ingredients: step.ingredients.map((ingredient: any) => ({
                id: ingredient.id,
                name: ingredient.name || "",
                localizedName: ingredient.localizedName || "",
                image: ingredient.image || "",
              })),
              equipment: step.equipment.map((equipment: any) => ({
                id: equipment.id,
                name: equipment.name || "",
                localizedName: equipment.localizedName || "",
                image: equipment.image || "",
              })),
              length: step.length
                ? {
                    number: step.length.number || 0,
                    unit: step.length.unit || "",
                  }
                : undefined,
            })),
          })
        ),
        spoonacularScore: recipe.spoonacularScore || 0,
        spoonacularSourceUrl: recipe.spoonacularSourceUrl || "",
      }));

      return recipes;
    } catch (error: any) {
      return rejectWithValue(
        error.message || "An error occurred while fetching recipes"
      );
    }
  }
);

const recipeSearchSlice = createSlice({
  name: "recipeSearch",
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
      .addCase(
        fetchRecipes.fulfilled,
        (state, action: PayloadAction<RecipeDTO[]>) => {
          state.loading = false;
          state.recipes = action.payload;
        }
      )
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch recipes";
      });
  },
});

export const { setFilters } = recipeSearchSlice.actions;
export default recipeSearchSlice.reducer;
