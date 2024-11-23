import {
  TextField,
  Slider,
  Autocomplete,
  Grid,
} from "@mui/material";
import styles from './styles/_RecipeDashboard.module.css'

const RecipeDashboard = () => {
  return (
    <div>
        <FilterMenu />
        <div>Recipe Renderer Placeholder</div>
    </div>
  )
}


const FilterMenu = () => {
  // Options for the autocomplete fields
  const mealTypeOptions = ["Breakfast", "Lunch", "Dinner", "Snack/Dessert"];
  const cookTimeOptions = [
    "Quick (under 15 minutes)",
    "Short (15-30 minutes)",
    "Moderate (30-60 minutes)",
    "Long (60-90 minutes)",
    "Unlimited/No Limit",
  ];
  const calorieOptions = [
    "Low (under 200 calories)",
    "Moderate (under 400 calories)",
    "Standard (under 600 calories)",
    "Hearty (under 800 calories)",
    "High (over 800 calories)",
  ];
  const skillLevelOptions = ["Beginner", "Intermediate", "Advanced"];

  return (
    <div className={styles.filterMenuContainer}>
      <Grid container spacing={2}>
        {/* Row 1 */}
        <Grid item xs={4}>
          <Autocomplete
            options={mealTypeOptions}
            renderInput={(params) => (
              <TextField {...params} label="Meal Type" variant="outlined" />
            )}
            className={styles.filterItem}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            options={cookTimeOptions}
            renderInput={(params) => (
              <TextField {...params} label="Max Cook Time" variant="outlined" />
            )}
            className={styles.filterItem}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            options={skillLevelOptions}
            renderInput={(params) => (
              <TextField {...params} label="Skill Level" variant="outlined" />
            )}
            className={styles.filterItem}
          />
        </Grid>
        {/* Row 2 */}
        <Grid item xs={4}>
          <Autocomplete
            options={calorieOptions}
            renderInput={(params) => (
              <TextField {...params} label="Calories" variant="outlined" />
            )}
            className={styles.filterItem}
          />
        </Grid>
        <Grid item xs={4}>
          <div className={styles.filterItem}>
            <label>Serving Size</label>
            <Slider
              defaultValue={1}
              step={1}
              marks
              min={1}
              max={20}
              valueLabelDisplay="auto"
            />
          </div>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Name Search"
            variant="outlined"
            className={styles.filterItem}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default RecipeDashboard