import React from 'react'
import styles from "./styles/_Account.module.css"
import { Navigate, useNavigate } from 'react-router-dom';

const achievements = [
  // Meal Types Achievements
  { id: 1, title: "Breakfast Champion", description: "Cook 10 breakfast recipes.", category: "Meal Type" },
  { id: 2, title: "Lunch Break Master", description: "Prepare 5 unique lunch recipes.", category: "Meal Type" },
  { id: 3, title: "Dinner Deluxe", description: "Complete 15 dinner recipes.", category: "Meal Type" },
  { id: 4, title: "Snack Attack", description: "Prepare 10 snack or dessert recipes.", category: "Meal Type" },
  { id: 5, title: "Meal Type Explorer", description: "Cook at least one recipe from each meal type: breakfast, lunch, dinner, and snack/dessert.", category: "Meal Type" },

  // Cook Time Achievements
  { id: 6, title: "Speedy Chef", description: "Complete 3 recipes with a cook time under 20 minutes.", category: "Cook Time" },
  { id: 7, title: "Efficient Cook", description: "Prepare 5 recipes with a cook time of exactly 30 minutes.", category: "Cook Time" },
  { id: 8, title: "Patience is a Virtue", description: "Cook 3 recipes with a cook time over 2 hours.", category: "Cook Time" },
  { id: 9, title: "Balanced Chef", description: "Cook 1 recipe from each time category: under 15 minutes, 30 minutes, 1 hour, and over 2 hours.", category: "Cook Time" },

  // Skill Level Achievements
  { id: 10, title: "Beginner's Luck", description: "Successfully complete 5 beginner-level recipes.", category: "Skill Level" },
  { id: 11, title: "Intermediate Explorer", description: "Master 10 intermediate-level recipes.", category: "Skill Level" },
  { id: 12, title: "Advanced Artist", description: "Conquer 5 advanced recipes.", category: "Skill Level" },
  { id: 13, title: "Skillful Chef", description: "Cook 1 recipe from each skill level: beginner, intermediate, and advanced.", category: "Skill Level" },

  // Calories Achievements
  { id: 14, title: "Low-Calorie Chef", description: "Prepare 5 recipes with under 300 calories per serving.", category: "Calories" },
  { id: 15, title: "Balanced Dieter", description: "Cook 5 recipes with 300–500 calories per serving.", category: "Calories" },
  { id: 16, title: "Indulgent Chef", description: "Complete 3 recipes with over 800 calories per serving.", category: "Calories" },
  { id: 17, title: "Calorie Explorer", description: "Cook 1 recipe from each calorie range: under 300, 300–500, 500–800, and over 800.", category: "Calories" },

  // Serving Size Achievements
  { id: 18, title: "Solo Chef", description: "Cook 5 recipes for 1 serving.", category: "Serving Size" },
  { id: 19, title: "Family Feeder", description: "Complete 5 recipes for 4 or more servings.", category: "Serving Size" },
  { id: 20, title: "Party Planner", description: "Cook 3 recipes for 8 or more servings.", category: "Serving Size" },
  { id: 21, title: "Serving Size Explorer", description: "Cook recipes for at least 1, 2–3, 4–6, and 8+ servings.", category: "Serving Size" }
];

const Account = () => {
  const navigate = useNavigate();

  const handleBacktoDashboard = () => {
    navigate("../dashboard");
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
            {achievements.map((achievements) => (
              <li key={achievements.id} className={styles.achievementItem}>
                <h3 className={styles.achievemntTitle}>{achievements.title}</h3>
                <p className={styles.achievementDescription}>
                  {achievements.description}
                </p>
                <span className={styles.achievementCategory}>
                  Category: {achievements.category}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Account