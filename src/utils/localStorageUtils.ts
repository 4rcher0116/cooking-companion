// src/utils/localStorageUtils.ts

import { AchievementDTO } from "../constants/AchievementDTO";
import { achievementsList } from "../constants/AchievementsList";

/**
 * Retrieves the progress count of a specific achievement from localStorage.
 * @param achievementId - The unique identifier of the achievement.
 * @returns The progress count. Returns 0 if not found or invalid.
 */
export const getAchievementProgress = (achievementId: number): number => {
  const progressKey = `achievement_${achievementId}`;
  const progressValue = localStorage.getItem(progressKey);

  if (progressValue === null) {
    // If no progress is found, initialize it to 0
    localStorage.setItem(progressKey, '0');
    return 0;
  }

  const parsedProgress = parseInt(progressValue, 10);

  if (isNaN(parsedProgress) || parsedProgress < 0) {
    // If the stored value is invalid, reset it to 0
    localStorage.setItem(progressKey, '0');
    return 0;
  }

  return parsedProgress;
};

/**
 * Sets the progress count of a specific achievement in localStorage.
 * @param achievementId - The unique identifier of the achievement.
 * @param progress - The progress count to set (non-negative).
 */
export const setAchievementProgress = (achievementId: number, progress: number): void => {
  const progressKey = `achievement_${achievementId}`;

  // Ensure the progress is non-negative
  const sanitizedProgress = Math.max(0, progress);

  localStorage.setItem(progressKey, sanitizedProgress.toString());
};

/**
 * Resets all achievements by clearing their progress from localStorage.
 * @param achievements - An array of AchievementDTO objects.
 */
export const resetAllAchievements = (achievements: AchievementDTO[]): void => {
  achievements.forEach((achievement) => {
    const progressKey = `achievement_${achievement.id}`;
    localStorage.setItem(progressKey, '0');
  });
};

/**
 * Retrieves all achievement progresses as an object.
 * @param achievements - An array of AchievementDTO objects.
 * @returns An object mapping achievement IDs to their progress counts.
 */
export const getAllAchievementsProgress = (achievements: AchievementDTO[]): Record<number, number> => {
  const progressRecord: Record<number, number> = {};

  achievements.forEach((achievement) => {
    progressRecord[achievement.id] = getAchievementProgress(achievement.id);
  });

  return progressRecord;
};

/**
 * Retrieves complex achievement data from localStorage.
 * @param achievementId - The unique identifier of the complex achievement.
 * @returns The stored data object or an empty object if not found.
 */
export const getComplexAchievementData = (achievementId: number): any => {
  const key = `complex_${achievementId}`;
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : {};
};

/**
 * Sets complex achievement data in localStorage.
 * @param achievementId - The unique identifier of the complex achievement.
 * @param data - The data object to store.
 */
export const setComplexAchievementData = (achievementId: number, data: any): void => {
  const key = `complex_${achievementId}`;
  localStorage.setItem(key, JSON.stringify(data));
};

/**
 * Resets complex achievement data in localStorage.
 * @param achievementId - The unique identifier of the complex achievement.
 */
export const resetComplexAchievementData = (achievementId: number): void => {
  const key = `complex_${achievementId}`;
  localStorage.removeItem(key);
};

/**
 * Calculates the total score by summing up all achievements' progress.
 * @returns The total score.
 */
export const calculateTotalScore = (): number => {
  const allProgress = getAllAchievementsProgress(achievementsList);
  return Object.values(allProgress).reduce((acc, curr) => acc + curr, 0);
};
