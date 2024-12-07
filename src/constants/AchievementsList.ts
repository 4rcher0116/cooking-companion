// src/constants/AchievementsList.ts

import { AchievementDTO } from './AchievementDTO';
import { RecipeDTO } from './RecipeDTO';

export const achievementsList: AchievementDTO[] = [
  // Step-Based Achievements
  {
    id: 1,
    name: "Step Starter",
    description: "Complete a recipe with at least 5 steps.",
    metric: (recipe: RecipeDTO) => {
      // Calculate total number of steps across all analyzedInstructions
      const totalSteps = recipe.analyzedInstructions.reduce((acc, instr) => acc + instr.steps.length, 0);
      return totalSteps >= 5;
    },
    progress: 0,
    target: 1,
    category: "Steps",
  },
  {
    id: 2,
    name: "Step Master",
    description: "Complete 10 recipes each with 10 or more steps.",
    metric: (recipe: RecipeDTO) => {
      const totalSteps = recipe.analyzedInstructions.reduce((acc, instr) => acc + instr.steps.length, 0);
      return totalSteps >= 10;
    },
    progress: 0,
    target: 10,
    category: "Steps",
  },

  // Cook Time Achievements
  {
    id: 3,
    name: "Quick Cook",
    description: "Complete a recipe that takes under 15 minutes.",
    metric: (recipe: RecipeDTO) => recipe.readyInMinutes < 15,
    progress: 0,
    target: 1,
    category: "Cook Time",
  },
  {
    id: 4,
    name: "Slow and Steady",
    description: "Complete a recipe that takes over 2 hours.",
    metric: (recipe: RecipeDTO) => recipe.readyInMinutes > 120,
    progress: 0,
    target: 1,
    category: "Cook Time",
  },
  {
    id: 5,
    name: "Time Manager",
    description: "Complete 5 recipes with preparation and cooking time between 30-60 minutes.",
    metric: (recipe: RecipeDTO) => recipe.readyInMinutes >= 30 && recipe.readyInMinutes <= 60,
    progress: 0,
    target: 5,
    category: "Cook Time",
  },

  // Dietary Achievements
  {
    id: 6,
    name: "Vegan Virtuoso",
    description: "Complete 5 vegan recipes.",
    metric: (recipe: RecipeDTO) => recipe.vegan,
    progress: 0,
    target: 5,
    category: "Dietary",
  },
  {
    id: 7,
    name: "Gluten-Free Guru",
    description: "Complete 5 gluten-free recipes.",
    metric: (recipe: RecipeDTO) => recipe.glutenFree,
    progress: 0,
    target: 5,
    category: "Dietary",
  },
  {
    id: 8,
    name: "Dairy-Free Dynamo",
    description: "Complete 5 dairy-free recipes.",
    metric: (recipe: RecipeDTO) => recipe.dairyFree,
    progress: 0,
    target: 5,
    category: "Dietary",
  },

  // Serving Size Achievements
  {
    id: 9,
    name: "Solo Chef",
    description: "Cook 5 recipes for 1 serving.",
    metric: (recipe: RecipeDTO) => recipe.servings === 1,
    progress: 0,
    target: 5,
    category: "Serving Size",
  },
  {
    id: 10,
    name: "Family Feeder",
    description: "Cook 5 recipes for 4 or more servings.",
    metric: (recipe: RecipeDTO) => recipe.servings >= 4,
    progress: 0,
    target: 5,
    category: "Serving Size",
  },
  {
    id: 11,
    name: "Party Planner",
    description: "Cook 3 recipes for 8 or more servings.",
    metric: (recipe: RecipeDTO) => recipe.servings >= 8,
    progress: 0,
    target: 3,
    category: "Serving Size",
  },
  {
    id: 12,
    name: "Serving Size Explorer",
    description: "Cook recipes for at least 1, 2–3, 4–6, and 8+ servings.",
    metric: (recipe: RecipeDTO) => {
      const servings = recipe.servings;
      return (
        servings === 1 ||
        (servings >= 2 && servings <= 3) ||
        (servings >= 4 && servings <= 6) ||
        servings >= 8
      );
    },
    progress: 0,
    target: 4,
    category: "Serving Size",
  },

  // Ingredient-Based Achievements
  {
    id: 13,
    name: "Minimalist Chef",
    description: "Complete a recipe with fewer than 5 ingredients.",
    metric: (recipe: RecipeDTO) => {
      // Assuming each step lists ingredients, count unique ingredients
      const uniqueIngredients = new Set<string>();
      recipe.analyzedInstructions.forEach(instr => {
        instr.steps.forEach(step => {
          step.ingredients.forEach(ing => uniqueIngredients.add(ing.name));
        });
      });
      return uniqueIngredients.size < 5;
    },
    progress: 0,
    target: 1,
    category: "Ingredients",
  },
  {
    id: 14,
    name: "Ingredient Guru",
    description: "Use at least 10 different ingredients across 5 recipes.",
    metric: (recipe: RecipeDTO) => {
      // This metric requires tracking across multiple recipes, handled in the update logic
      return false; // Placeholder; actual logic will be implemented in the processing algorithm
    },
    progress: 0,
    target: 10,
    category: "Ingredients",
  },
  // Diverse Cuisine Achievements
  {
    id: 15,
    name: "World Explorer",
    description: "Complete recipes from at least 5 different cuisines.",
    metric: (recipe: RecipeDTO) => {
      // Similar to Ingredient Guru, requires tracking across multiple recipes
      return false; // Placeholder; actual logic will be handled in the processing algorithm
    },
    progress: 0,
    target: 5,
    category: "Cuisine",
  },
  {
    id: 16,
    name: "Culinary Connoisseur",
    description: "Complete 15 recipes from 10 different cuisines.",
    metric: (recipe: RecipeDTO) => {
      // Placeholder; actual logic will be handled in the processing algorithm
      return false;
    },
    progress: 0,
    target: 15,
    category: "Cuisine",
  },
];
