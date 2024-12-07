// src/utils/localStorageUtils.ts

import { AchievementDTO } from "../constants/AchievementDTO";

/**
 * Retrieves the progress of a specific achievement from localStorage.
 * @param achievementId - The unique identifier of the achievement.
 * @returns The progress percentage (0-100). Returns 0 if not found or invalid.
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
  
    if (isNaN(parsedProgress) || parsedProgress < 0 || parsedProgress > 100) {
      // If the stored value is invalid, reset it to 0
      localStorage.setItem(progressKey, '0');
      return 0;
    }
  
    return parsedProgress;
  };
  
  /**
   * Sets the progress of a specific achievement in localStorage.
   * @param achievementId - The unique identifier of the achievement.
   * @param progress - The progress percentage to set (0-100).
   */
  export const setAchievementProgress = (achievementId: number, progress: number): void => {
    const progressKey = `achievement_${achievementId}`;
  
    // Ensure the progress is within 0-100%
    const sanitizedProgress = Math.max(0, Math.min(progress, 100));
  
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
   * @returns An object mapping achievement IDs to their progress percentages.
   */
  export const getAllAchievementsProgress = (achievements: AchievementDTO[]): Record<number, number> => {
    const progressRecord: Record<number, number> = {};
  
    achievements.forEach((achievement) => {
      progressRecord[achievement.id] = getAchievementProgress(achievement.id);
    });
  
    return progressRecord;
  };
  