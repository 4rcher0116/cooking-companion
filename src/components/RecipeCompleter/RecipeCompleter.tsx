import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Step,
  Stepper,
  StepLabel,
  Typography,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { RootState } from "../../store/store";
import { setCompletionStatus, setRecipe } from "../../store/slices/completionToolSlice";
import { processCompletedRecipe } from "../Achievement/AchievementsUtils";

type RecipeCompleterProps = {
    isSmallScreen?: boolean;
};

const RecipeCompleter: React.FC<RecipeCompleterProps> = ({isSmallScreen}) => {
  const dispatch = useDispatch();
  const recipe = useSelector((state: RootState) => state.completionTool.recipe);
  const [activeStep, setActiveStep] = useState(0);
  const [timerOpen, setTimerOpen] = useState(false);
  const [timerValue, setTimerValue] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isTimerRunning && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isTimerRunning, timeLeft]);

  if (!recipe) {
    return <Typography variant="h6">No recipe selected</Typography>;
  }

  const steps = recipe.analyzedInstructions[0]?.steps || [];

  const scanForAchievements = () => {
    processCompletedRecipe(recipe);
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      dispatch(setCompletionStatus("complete"));
      scanForAchievements();
      dispatch(setRecipe(null));
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleTimerOpen = () => {
    setTimerOpen(true);
  };

  const handleTimerClose = () => {
    setTimerOpen(false);
  };

  const handleTimerStart = () => {
    setTimeLeft(timerValue * 60);
    setIsTimerRunning(true);
    setTimerOpen(false);
  };

  const handleTimerPause = () => {
    setIsTimerRunning(false);
  };

  const handleTimerReset = () => {
    setIsTimerRunning(false);
    setTimeLeft(0);
  };

  const handleAbandonRecipe = () => {
    dispatch(setRecipe(null));
    dispatch(setCompletionStatus("incomplete"));
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxSizing: "border-box",
        height: "100%",
      }}
    >
      <Stepper activeStep={activeStep} alternativeLabel sx={{ width: "100%" }}>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel
              StepIconProps={{
                sx: {
                  fontSize: isSmallScreen ? "2rem" :"3rem", // Adjust the size of the stepper circles
                  color: activeStep === index ? "#829189" : "#65726E", // Adjust the color of the stepper circles
                },
              }}
            />
          </Step>
        ))}
      </Stepper>
      <Box
        sx={{
          mt: 2,
          mb: 2,
          p: 2,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 1,
          width: "100%",
        }}
      >
        <Typography
          sx={{
            mb: 1,
            color: "#835352",
            fontWeight: 800,
            fontSize: isSmallScreen ? "2rem" :"3rem",
          }}
        >{`Step ${activeStep + 1}`}</Typography>
        <Typography
          sx={{
            color: "#835352",
            fontWeight: 500,
            fontSize: isSmallScreen ? "1.2rem" :"2.1rem",
          }}
        >
          {steps[activeStep]?.step}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2, alignItems: "center", width: "100%" }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <IconButton color="primary" onClick={handleTimerOpen}>
          <AccessTimeIcon />
        </IconButton>
        <Button variant="contained" onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Finish" : "Next"}
        </Button>
      </Box>
      {timeLeft > 0 && (
        <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
          <Typography variant="h6">{formatTime(timeLeft)}</Typography>
          <Button onClick={handleTimerPause} sx={{ ml: 2 }}>
            {isTimerRunning ? "Pause" : "Resume"}
          </Button>
          <Button onClick={handleTimerReset} sx={{ ml: 2 }}>
            Reset
          </Button>
        </Box>
      )}
      {!isSmallScreen && <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, width: "100%" }}>
        <Button variant="outlined" color="secondary" onClick={handleAbandonRecipe}>
          Abandon Recipe
        </Button>
      </Box>}

      <Dialog open={timerOpen} onClose={handleTimerClose}>
        <DialogTitle>Set Timer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Timer (minutes)"
            type="number"
            fullWidth
            variant="outlined"
            value={timerValue}
            onChange={(e) => setTimerValue(Number(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTimerClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleTimerStart} color="primary">
            Start
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RecipeCompleter;