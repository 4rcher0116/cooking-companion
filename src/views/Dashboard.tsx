import React from 'react';
import styles from './styles/_Dashboard.module.css'

const Dashboard = () => {
  return (
    <div className={styles.dashboardContent}>
      <div className={styles.headerContent}>
        <p className={styles.headerText}>Cooking Companion</p>
      </div>
      <div className={styles.body}>
        <div className={styles.recipeDashboardContainer}>Recipe Dash Placeholder</div>
        <div className={styles.rightContainer}>
          <div className={styles.animatedCharacterContainer}>
            Animated Character Placeholder
          </div>
          <div>
            Leaderboard Shortcut Placeholder
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard