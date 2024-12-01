import React from "react";
import styles from "./styles/_Bookmark.module.css";
import { useNavigate } from "react-router-dom";

const Bookmark = () => {
  const navigate = useNavigate();

  const handleBacktoDashboard = () => {
    navigate("../dashboard");
  };

  return (
    <div className={styles.bookmarkContainer}>
      <div className={styles.headerContent}>
        <div className={styles.headerText}>Bookmark</div>
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
        <div className={styles.titleText}>Saved</div>
      </div>

      <div className={styles.body}>
        <div className={styles.bodyContent}>
          {/* Replica of Recipe Card */}
          <div className={styles.recipeCard}>
            <img
              src="/path/to/image1.jpg" // Replace with your image path
              alt="Recipe 1"
              className={styles.recipeImage}
            />
            <div className={styles.recipeDetails}>
              <h3 className={styles.recipeTitle}>Recipe 1</h3>
              <p className={styles.recipeSummary}>
                A brief description of Recipe 1.
              </p>
            </div>
            <div className={styles.actions}>
              <button
                className={styles.bookmarkButton}
                aria-label="Bookmark recipe"
              >
                📌
              </button>
              <button className={styles.selectButton}>Select Recipe</button>
            </div>
          </div>

          {/* Add more cards as needed */}
          <div className={styles.recipeCard}>
            <img
              src="/path/to/image2.jpg" // Replace with your image path
              alt="Recipe 2"
              className={styles.recipeImage}
            />
            <div className={styles.recipeDetails}>
              <h3 className={styles.recipeTitle}>Recipe 2</h3>
              <p className={styles.recipeSummary}>
                A brief description of Recipe 2.
              </p>
            </div>
            <div className={styles.actions}>
              <button
                className={styles.bookmarkButton}
                aria-label="Bookmark recipe"
              >
                📌
              </button>
              <button className={styles.selectButton}>Select Recipe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookmark;
