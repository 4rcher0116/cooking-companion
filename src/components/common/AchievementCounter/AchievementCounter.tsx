// src/components/common/AchievementCounter.tsx

import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from './achievements.module.css';
type AchievementCounterProps = {
  currentCount: number;
  target: number;
};

const AchievementCounter: React.FC<AchievementCounterProps> = ({ currentCount, target }) => {
  return (
    <Box className={styles.counterContainer}>
      <Typography variant="subtitle2" style={{ fontSize: '15px' }}>
        {currentCount} / {target}
      </Typography>
    </Box>
  );
};

export default AchievementCounter;
