// src/utils/achievementUtils.ts

import { achievementsList } from "../../constants/AchievementsList";
import { RecipeDTO } from "../../constants/RecipeDTO";
import { getAchievementProgress, setAchievementProgress } from "../../utils/localStorageUtils";

/**
 * Processes a completed recipe and updates achievements accordingly.
 * @param completedRecipe - The recipe that has been completed by the user.
 */
export const processCompletedRecipe = (completedRecipe: RecipeDTO): void => {
  achievementsList.forEach(achievement => {
    if (isComplexAchievement(achievement)) {
      handleComplexAchievement(achievement, completedRecipe);
    } else if (achievement.metric(completedRecipe)) {
      const currentProgress = getAchievementProgress(achievement.id);
      const newProgress = Math.min(currentProgress + 10, 100); // Increment by 10%
      setAchievementProgress(achievement.id, newProgress);

      if (newProgress === 100) {
        // Notify user upon achievement completion
        alert(`Congratulations! You've completed the achievement: ${achievement.name}`);
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
  return achievement.name === "Ingredient Guru" || achievement.name === "World Explorer" || achievement.name === "Culinary Connoisseur";
};

/**
 * Handles complex achievements that require tracking across multiple recipes.
 * @param achievement - The complex achievement to handle.
 * @param recipe - The recipe that has been completed.
 */
const handleComplexAchievement = (achievement: any, recipe: RecipeDTO): void => {
  const key = `complex_${achievement.id}`;
  const data = localStorage.getItem(key);
  let currentData = data ? JSON.parse(data) : {};

  switch (achievement.name) {
    case "Ingredient Guru":
      if (!currentData.ingredients) currentData.ingredients = new Set<string>();
      recipe.analyzedInstructions.forEach(instr => {
        instr.steps.forEach(step => {
          step.ingredients.forEach(ing => currentData.ingredients.add(ing.name));
        });
      });
      currentData.count = currentData.ingredients.size;
      if (currentData.count >= 10 && !currentData.completed) {
        currentData.completed = true;
        setAchievementProgress(achievement.id, 100);
        alert(`Congratulations! You've completed the achievement: ${achievement.name}`);
      } else {
        setAchievementProgress(achievement.id, Math.min((currentData.count / 10) * 100, 100));
      }
      break;

    case "World Explorer":
      if (!currentData.cuisines) currentData.cuisines = new Set<string>();
      recipe.cuisines.forEach(cuisine => currentData.cuisines.add(cuisine));
      currentData.count = currentData.cuisines.size;
      if (currentData.count >= 5 && !currentData.completed) {
        currentData.completed = true;
        setAchievementProgress(achievement.id, 100);
        alert(`Congratulations! You've completed the achievement: ${achievement.name}`);
      } else {
        setAchievementProgress(achievement.id, Math.min((currentData.count / 5) * 100, 100));
      }
      break;

    case "Culinary Connoisseur":
      if (!currentData.cuisines) currentData.cuisines = new Set<string>();
      recipe.cuisines.forEach(cuisine => currentData.cuisines.add(cuisine));
      currentData.count = currentData.cuisines.size;
      if (currentData.count >= 10 && !currentData.completed) {
        currentData.completed = true;
        setAchievementProgress(achievement.id, 100);
        alert(`Congratulations! You've completed the achievement: ${achievement.name}`);
      } else {
        setAchievementProgress(achievement.id, Math.min((currentData.count / 10) * 100, 100));
      }
      break;

    default:
      break;
  }

  // Store the updated data back to localStorage
  localStorage.setItem(key, JSON.stringify(currentData));
};
