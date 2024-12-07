import { TextField, Slider, Autocomplete, Grid } from "@mui/material";
import styles from "./styles/_RecipeDashboard.module.css";
import { RecipeDTO } from "../../constants/RecipeDTO";
import { sampleRecipes } from "../../constants/SampleRecipes";
import {
  calorieOptions,
  cookTimeOptions,
  mealTypeOptions,
  skillLevelOptions,
} from "../../constants/FilterValues";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { setFilters } from "../../store/slices/recipeSearchSlice";

const RecipeDashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.filterMenuContainerInDashboard}>
        <FilterMenu />
      </div>
      <div className={styles.recipeListContainer}>
        <RecipeCardList
          recipes={[
            ...sampleRecipes,
            ...sampleRecipes,
            ...sampleRecipes,
            ...sampleRecipes,
            ...sampleRecipes,
          ]}
        />
      </div>
    </div>
  );
};

const FilterMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.recipeSearch.filters);

  const handleFilterChange = (name: string, value: any) => {
    dispatch(setFilters({ ...filters, [name]: value }));
  };

  return (
    <div className={styles.filterMenuContainer}>
      <Grid container spacing={2}>
        {/* Row 1 */}
        <Grid item xs={4}>
          <Autocomplete
            options={mealTypeOptions}
            value={filters.mealType}
            onChange={(event, newValue) => handleFilterChange('mealType', newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Meal Type" variant="outlined" />
            )}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#835352", // Your custom accent color
              },
            }}
            className={styles.filterItem}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            options={cookTimeOptions}
            value={filters.maxCookTime}
            onChange={(event, newValue) => handleFilterChange('maxCookTime', newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Max Cook Time" variant="outlined" />
            )}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#835352", // Your custom accent color
              },
            }}
            className={styles.filterItem}
          />
        </Grid>
        <Grid item xs={4}>
          <Autocomplete
            options={skillLevelOptions}
            value={filters.skillLevel}
            onChange={(event, newValue) => handleFilterChange('skillLevel', newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Skill Level" variant="outlined" />
            )}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#835352", // Your custom accent color
              },
            }}
            className={styles.filterItem}
          />
        </Grid>
        {/* Row 2 */}
        <Grid item xs={4}>
          <Autocomplete
            options={calorieOptions}
            value={filters.calories}
            onChange={(event, newValue) => handleFilterChange('calories', newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Calories" variant="outlined" />
            )}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#835352", // Your custom accent color
              },
            }}
            className={styles.filterItem}
          />
        </Grid>
        <Grid item xs={4}>
          <div className={styles.filterItem}>
            <label>Serving Size</label>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Slider
                defaultValue={filters.servingSize}
                step={1}
                marks
                min={1}
                max={20}
                valueLabelDisplay="auto"
                onChange={(event, newValue) => handleFilterChange('servingSize', newValue)}
                sx={{
                  color: "#835352", // Custom track and thumb color
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#835352", // Custom thumb color
                  },
                  "& .MuiSlider-track": {
                    backgroundColor: "#FF5733", // Custom track color
                  },
                  "& .MuiSlider-rail": {
                    backgroundColor: "#E0E0E0", // Optional: rail color (unfilled part of slider)
                  },
                  width: "90%",
                }}
              />
            </div>
          </div>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Name Search"
            variant="outlined"
            value={filters.nameSearch}
            onChange={(event) => handleFilterChange('nameSearch', event.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#835352", // Custom outline color when focused
                },
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#835352", // Custom label color when focused
              },
            }}
            className={styles.filterItem}
          />
        </Grid>
      </Grid>
    </div>
  );
};

type RecipeCardProps = {
  recipe: RecipeDTO;
};

type RecipeCardListProps = {
  recipes: RecipeDTO[];
};

// RecipeCard Component: Renders a single recipe
const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className={styles.recipeCard}>
      <img
        src={recipe.image}
        alt={recipe.title}
        className={styles.recipeImage}
      />
      <div className={styles.recipeDetails}>
        <h3 className={styles.recipeTitle}>{recipe.title}</h3>
        <p className={styles.recipeSummary}>{recipe.nutrition.summary}</p>
      </div>
      <div className={styles.actions}>
        <button className={styles.bookmarkButton} aria-label="Bookmark recipe">
          <span role="img" aria-hidden="true">
            📌
          </span>
        </button>
        <button className={styles.selectButton}>Select Recipe</button>
      </div>
    </div>
  );
};

// RecipeCardList Component: Renders a vertical list of RecipeCards
const RecipeCardList: React.FC<RecipeCardListProps> = ({ recipes }) => {
  return (
    <div className={styles.recipeCardList}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeDashboard;
