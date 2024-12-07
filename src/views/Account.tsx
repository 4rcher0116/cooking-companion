import React, { useEffect, useState } from 'react';
import styles from "./styles/_Account.module.css";
import { useNavigate } from 'react-router-dom';
import { AchievementDTO } from '../constants/AchievementDTO';
import { achievementsList } from '../constants/AchievementsList';
import { getAchievementProgress, setAchievementProgress } from '../utils/localStorageUtils';
import AchievementCounter from '../components/common/AchievementCounter/AchievementCounter';

const Account = () => {
  const navigate = useNavigate();
  const [achievements, setAchievements] = useState<AchievementDTO[]>([]);

  const handleBacktoDashboard = () => {
    navigate("../dashboard");
  };

  const resetAchievements = () => {
    achievementsList.forEach(achievement => {
      setAchievementProgress(achievement.id, 0);
    });
    setAchievements(achievementsList.map(achievement => ({ ...achievement, progress: 0 })));
  };

  useEffect(() => {
    // Initialize achievements with progress from localStorage
    const initializedAchievements = achievementsList.map(achievement => ({
      ...achievement,
      progress: getAchievementProgress(achievement.id),
    }));
    setAchievements(initializedAchievements);
  }, []);

  // Function to update progress in state and localStorage
  const updateAchievementProgress = (achievementId: number, increment: number = 10) => {
    setAchievements(prevAchievements => prevAchievements.map(achievement => {
      if (achievement.id === achievementId) {
        const newProgress = Math.min(achievement.progress + increment, 100);
        setAchievementProgress(achievement.id, newProgress);
        return { ...achievement, progress: newProgress };
      }
      return achievement;
    }));
  };

  return (
    <div className={styles.accountContainer}>
      <div className={styles.headerContent}>
        <div className={styles.headerText}> Achievement Tracker</div>
      </div>
      <div className={styles.buttonContent}>
        <button
          className={styles.buttonContainer}
          onClick={handleBacktoDashboard}
        >
          Back to Dashboard
        </button>
      </div>
      <div className={styles.titleContent}>
        <div className={styles.titleText}>List of Achievement Collections</div>
      </div>
      <div className={styles.body}>
        <div className={styles.achievementsContainer}>
        <ul className={styles.achievementList}>
            {achievements.map((achievement) => (
              <li key={achievement.id} className={styles.achievementItem}>
                <div className={styles.achievementContent}>
                  <h3 className={styles.achievementTitle}>{achievement.name}</h3>
                  <p className={styles.achievementDescription}>{achievement.description}</p>
                  <span className={styles.achievementCategory}>
                    Category: {achievement.category}
                  </span>
                </div>
                <div className={styles.progressContainer}>
                  <AchievementCounter 
                    currentCount={achievement.progress} 
                    target={achievement.target} 
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Account