// src/utils/achievementUtils.ts

import { achievementsList } from '../constants/AchievementsList';
import { RecipeDTO } from '../constants/RecipeDTO';
import { 
  getAchievementProgress, 
  setAchievementProgress, 
  getComplexAchievementData, 
  setComplexAchievementData 
} from "./localStorageUtils";

/**
 * Processes a completed recipe and updates achievements accordingly.
 * @param completedRecipe - The recipe that has been completed by the user.
 */
export const processCompletedRecipe = (completedRecipe: RecipeDTO): void => {
  achievementsList.forEach(achievement => {
    if (isComplexAchievement(achievement)) {
      handleComplexAchievement(achievement, completedRecipe);
    } else if (achievement.metric(completedRecipe)) {
      // Single-recipe achievements
      const currentProgress = getAchievementProgress(achievement.id);
      const newProgress = Math.min(currentProgress + 1, achievement.target); // Increment by 1
      setAchievementProgress(achievement.id, newProgress);

      if (newProgress === achievement.target) {
        // Notify user upon achievement completion
        alert(`🎉 Congratulations! You've completed the achievement: "${achievement.name}"!`);
      }
    }
  });
};

/**
 * Determines if an achievement requires complex processing.
 * @param achievement - The achievement to check.
 * @returns Boolean indicating if it's a complex achievement.
 */
const isComplexAchievement = (achievement: any): boolean => {
  return ["Ingredient Guru", "World Explorer", "Culinary Connoisseur"].includes(achievement.name);
};

/**
 * Handles complex achievements that require tracking across multiple recipes.
 * @param achievement - The complex achievement to handle.
 * @param recipe - The recipe that has been completed.
 */
const handleComplexAchievement = (achievement: any, recipe: RecipeDTO): void => {
  const data = getComplexAchievementData(achievement.id);

  switch (achievement.name) {
    case "Ingredient Guru":
      // Initialize arrays if they don't exist
      data.ingredients = data.ingredients || [];
      data.recipeCount = data.recipeCount || 0;

      // Add unique ingredients from this recipe
      recipe.analyzedInstructions.forEach(instr => {
        instr.steps.forEach(step => {
          step.ingredients.forEach(ing => {
            if (!data.ingredients.includes(ing.name)) {
              data.ingredients.push(ing.name);
            }
          });
        });
      });

      // Increment recipe count if the recipe has at least one unique ingredient
      if (recipe.analyzedInstructions.some(instr => instr.steps.length > 0)) {
        data.recipeCount += 1;
      }

      // Check if achievement is completed
      if (data.ingredients.length >= 10 && data.recipeCount >= 5 && !data.completed) {
        data.completed = true;
        setAchievementProgress(achievement.id, achievement.target); // Set to target (10)
        alert(`🎉 Congratulations! You've completed the achievement: "${achievement.name}"!`);
      } else {
        // Update progress based on unique ingredients
        const progress = Math.min(Math.floor((data.ingredients.length / 10) * 100), 100);
        setAchievementProgress(achievement.id, progress);
      }

      break;

    case "World Explorer":
      // Initialize arrays if they don't exist
      data.cuisines = data.cuisines || [];

      // Add unique cuisines from this recipe
      recipe.cuisines.forEach(cuisine => {
        if (!data.cuisines.includes(cuisine)) {
          data.cuisines.push(cuisine);
        }
      });

      // Check if achievement is completed
      if (data.cuisines.length >= 5 && !data.completed) {
        data.completed = true;
        setAchievementProgress(achievement.id, achievement.target); // Set to target (5)
        alert(`🎉 Congratulations! You've completed the achievement: "${achievement.name}"!`);
      } else {
        // Update progress based on unique cuisines
        const progress = Math.min(Math.floor((data.cuisines.length / 5) * 100), 100);
        setAchievementProgress(achievement.id, progress);
      }

      break;

    case "Culinary Connoisseur":
      // Initialize arrays if they don't exist
      data.cuisines = data.cuisines || [];
      data.recipeCount = data.recipeCount || 0;

      // Add unique cuisines from this recipe
      recipe.cuisines.forEach(cuisine => {
        if (!data.cuisines.includes(cuisine)) {
          data.cuisines.push(cuisine);
        }
      });

      // Increment recipe count
      data.recipeCount += 1;

      // Check if achievement is completed
      if (data.cuisines.length >= 10 && data.recipeCount >= 15 && !data.completed) {
        data.completed = true;
        setAchievementProgress(achievement.id, achievement.target); // Set to target (15)
        alert(`🎉 Congratulations! You've completed the achievement: "${achievement.name}"!`);
      } else {
        // Update progress based on unique cuisines and recipe count
        const cuisineProgress = Math.min(Math.floor((data.cuisines.length / 10) * 100), 100);
        const recipeProgress = Math.min(Math.floor((data.recipeCount / 15) * 100), 100);
        const overallProgress = Math.floor((cuisineProgress + recipeProgress) / 2);
        setAchievementProgress(achievement.id, overallProgress);
      }

      break;

    default:
      break;
  }

  // Store the updated data back to localStorage
  setComplexAchievementData(achievement.id, data);
};
