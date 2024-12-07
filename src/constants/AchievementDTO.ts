import { RecipeDTO } from "./RecipeDTO";

export type AchievementDTO = {
    id: number;
    name: string;
    description: string;
    metric: (recipe: RecipeDTO) => boolean; // Function to determine if a recipe fulfills the metric
    progress: number; // Progress percentage (0-100)
    category: string;
  };