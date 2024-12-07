import { achievementsList } from "../../constants/AchievementsList";
import { RecipeDTO } from "../../constants/RecipeDTO";
import { getAchievementProgress, setAchievementProgress } from "../../utils/localStorageUtils";

/**
 * Processes a completed recipe and updates achievements accordingly.
 * @param completedRecipe - The recipe that has been completed by the user.
 */
export const processCompletedRecipe = (completedRecipe: RecipeDTO): void => {
  achievementsList.forEach(achievement => {
    // If achievement requires complex processing, handle it
    if (isComplexAchievement(achievement)) {
      handleComplexAchievement(achievement, completedRecipe);
    } else if (achievement.metric(completedRecipe)) {
      // For simple achievements, just increment progress
      const currentProgress = getAchievementProgress(achievement.id);
      const newProgress = Math.min(currentProgress + 10, 100); // Increment by 10%
      setAchievementProgress(achievement.id, newProgress);

      // Notify user if achievement is completed
      if (newProgress === 100) {
        alert(`Congratulations! You've completed the achievement: ${achievement.name}`);
      }
    }
  });
};

export const calculateAchievementScore = (): number => {
  let totalProgress = 0;
  let achievementCount = 0;

  // Loop through all achievements
  achievementsList.forEach(achievement => {
    const progress = getAchievementProgress(achievement.id);
    totalProgress += progress;
    achievementCount += 1;
  });

  // Calculate the average score (could be weighted if needed)
  if (achievementCount === 0) return 0; // Avoid division by zero if no achievements exist
  return totalProgress / achievementCount;
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

  // Logic for handling different complex achievements
  switch (achievement.name) {
    case "Ingredient Guru":
      updateIngredientGuru(currentData, recipe, achievement);
      break;

    case "World Explorer":
      updateWorldExplorer(currentData, recipe, achievement);
      break;

    case "Culinary Connoisseur":
      updateCulinaryConnoisseur(currentData, recipe, achievement);
      break;

    default:
      break;
  }

  // Store the updated data back to localStorage
  localStorage.setItem(key, JSON.stringify(currentData));
};

// **Complex Achievement Handlers**
const updateIngredientGuru = (currentData: any, recipe: RecipeDTO, achievement: any) => {
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
};

const updateWorldExplorer = (currentData: any, recipe: RecipeDTO, achievement: any) => {
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
};

const updateCulinaryConnoisseur = (currentData: any, recipe: RecipeDTO, achievement: any) => {
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
};
