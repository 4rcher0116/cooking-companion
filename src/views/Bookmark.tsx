import React from 'react'
import styles from "./styles/_Bookmark.module.css"
import { useNavigate } from 'react-router-dom'

const Bookmark = () => {
    const navigate = useNavigate();

    const handleBacktoDashboard = () => {
        navigate("../dashboard");
    };

    return(
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
            <div className= {styles.body}>
                <div className={styles.bodyContent}>
                    <div className={styles.container}> Placeholder for Saved Recipe</div>
                    <div className={styles.container}> Placeholder for Saved Recipe</div>
                    <div className={styles.container}> Placeholder for Saved Recipe</div>
                </div>
            </div>
        </div>
    );
};

export default Bookmark;