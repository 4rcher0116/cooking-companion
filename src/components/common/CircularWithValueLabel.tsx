import React from "react";
import CircularProgress, { CircularProgressProps } from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./styles/_CircularWithValueLabel.module.css"; 

function CircularProgressWithLabel(props: CircularProgressProps & { value: number }) {
  return (
    <Box className={styles.circularProgressContainer}>
      <CircularProgress
        variant="determinate"
        {...props}
        size={55} /* Increase size */
        thickness={2.5} /* Adjust thickness if needed */
      />
      <Box className={styles.circularProgressText}>
        <Typography
          variant="caption"
          component="div"
          className={styles.circularProgressLabel}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default CircularProgressWithLabel;
