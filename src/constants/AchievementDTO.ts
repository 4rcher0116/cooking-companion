import { RecipeDTO } from "./RecipeDTO";

export type AchievementDTO = {
    id: number;
    name: string;
    description: string;
    metric: (recipe: RecipeDTO) => boolean; // Function to determine if a recipe fulfills the metric
    progress: number; // amount of target completed
    target: number; // amount required to complete achievment
    category: string;
  };