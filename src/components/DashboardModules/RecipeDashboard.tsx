import React, { useState } from "react";
import {
  TextField,
  Slider,
  Autocomplete,
  Grid,
  CircularProgress,
  Typography,
  Box,
  Button,
  IconButton,
  Modal,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styles from "./styles/_RecipeDashboard.module.css";
import { RecipeDTO } from "../../constants/RecipeDTO";
import {
  calorieOptions,
  cookTimeOptions,
  mealTypeOptions,
  skillLevelOptions,
} from "../../constants/FilterValues";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchRecipes, setFilters } from "../../store/slices/recipeSearchSlice";
import { useEffect, useMemo } from "react";
import useImageLoader from "../../hooks/useImageLoader";
import htmr from "htmr";
import useDebounce from "../../hooks/useDebounce";
import {
  setCompletionStatus,
  setRecipe,
} from "../../store/slices/completionToolSlice";
import { useMediaQuery } from "@mui/material";

const RecipeDashboard = () => {
  const filterValues = useSelector(
    (state: RootState) => state.recipeSearch.filters
  );
  const recipes = useSelector((state: RootState) => state.recipeSearch.recipes);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [modalOpen, setModalOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    let returnRecipes = recipes;

    if (filterValues.servingSize) {
      returnRecipes = returnRecipes.filter(
        (recipe) => recipe.servings >= filterValues.servingSize
      );
    }

    if (filterValues.skillLevel) {
      returnRecipes = returnRecipes.filter((recipe) => {
        const totalSteps = recipe.analyzedInstructions.reduce(
          (acc, instruction) => acc + instruction.steps.length,
          0
        );
        if (filterValues.skillLevel === "Beginner") {
          return totalSteps < 10;
        } else if (filterValues.skillLevel === "Intermediate") {
          return totalSteps < 25;
        } else {
          return totalSteps >= 25;
        }
      });
    }

    console.log("Filter Values", filterValues);
    console.log("Recipes after filtering", returnRecipes);

    setFilteredRecipes(returnRecipes.slice(0, 30));
  }, [recipes, filterValues]);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.filterMenuContainerInDashboard}>
        {isSmallScreen ? (
          <IconButton className={styles.searchIcon} onClick={handleModalOpen}>
            <SearchIcon />
          </IconButton>
        ) : (
          <FilterMenu />
        )}
      </div>
      <div className={styles.recipeListContainer}>
        <RecipeCardList recipes={filteredRecipes} />
      </div>
      <Modal open={modalOpen} onClose={handleModalClose}>
        <Box className={styles.modalContent}>
          <FilterMenu />
          <Button onClick={handleModalClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
};

const FilterMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.recipeSearch.filters);
  const debouncedFilters = useDebounce(filters, 1200);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  const handleFilterChange = (name: string, value: any) => {
    dispatch(setFilters({ ...filters, [name]: value }));
  };

  useEffect(() => {
    dispatch(fetchRecipes(debouncedFilters));
  }, [debouncedFilters, dispatch]);

  return (
    <div className={styles.filterMenuContainer}>
      <Grid container spacing={2}>
        {/* Row 1 */}
        <Grid item xs={12} sm={6} md={4}>
          <Autocomplete
            options={mealTypeOptions}
            value={filters.mealType}
            onChange={(event, newValue) =>
              handleFilterChange("mealType", newValue)
            }
            renderInput={(params) => (
              <TextField {...params} label="Meal Type" variant="outlined" />
            )}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#835352", // Your custom accent color
                },
            }}
            className={styles.filterItem}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Autocomplete
            options={cookTimeOptions}
            value={filters.maxCookTime}
            onChange={(event, newValue) =>
              handleFilterChange("maxCookTime", newValue)
            }
            renderInput={(params) => (
              <TextField {...params} label="Max Cook Time" variant="outlined" />
            )}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#835352", // Your custom accent color
                },
            }}
            className={styles.filterItem}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Autocomplete
            options={skillLevelOptions}
            value={filters.skillLevel}
            onChange={(event, newValue) =>
              handleFilterChange("skillLevel", newValue)
            }
            renderInput={(params) => (
              <TextField {...params} label="Skill Level" variant="outlined" />
            )}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#835352", // Your custom accent color
                },
            }}
            className={styles.filterItem}
          />
        </Grid>
        {/* Row 2 */}
        <Grid item xs={12} sm={6} md={4}>
          <Autocomplete
            options={calorieOptions}
            value={filters.calories}
            onChange={(event, newValue) =>
              handleFilterChange("calories", newValue)
            }
            renderInput={(params) => (
              <TextField {...params} label="Calories" variant="outlined" />
            )}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#835352", // Your custom accent color
                },
            }}
            className={styles.filterItem}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
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
                onChange={(event, newValue) =>
                  handleFilterChange("servingSize", newValue)
                }
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
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Name Search"
            variant="outlined"
            value={filters.nameSearch}
            onChange={(event) =>
              handleFilterChange("nameSearch", event.target.value)
            }
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
  imageUrl: string;
  onRecipeSelect: (recipe: RecipeDTO) => void;
};

type RecipeCardListProps = {
  recipes: RecipeDTO[];
};
const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  imageUrl,
  onRecipeSelect,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);
  }, [imageUrl]);

  const totalSteps = recipe.analyzedInstructions.reduce(
    (acc, instruction) => acc + instruction.steps.length,
    0
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={styles.recipeCard}>
      <div className={styles.imageContainer}>
        {!imageLoaded && (
          <div className={styles.imagePlaceholder}>
            <CircularProgress />
          </div>
        )}
        <img
          src={imageUrl}
          alt={recipe.title}
          className={styles.recipeImage}
          style={{ display: imageLoaded ? "block" : "none" }}
        />
      </div>
      <div className={styles.recipeDetails}>
        <Typography
          variant="body1"
          fontWeight={100}
          className={styles.recipeTitle}
        >
          {recipe.title}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="body2">
            <strong>Servings:</strong> {recipe.servings}
          </Typography>
          <Typography variant="body2">
            <strong>Cook Time:</strong> {recipe.readyInMinutes} minutes
          </Typography>
          <Typography variant="body2">
            <strong>Steps:</strong> {totalSteps}
          </Typography>
          <Box
            sx={{
              maxHeight: expanded ? "none" : isSmallScreen ? "2em" : "8em",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Typography variant="body2">
              <strong>Description:</strong> {htmr(recipe.nutrition.summary)}
            </Typography>
            {!expanded && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: "1.5em",
                  background: "linear-gradient(to bottom, transparent, white)",
                }}
              />
            )}
          </Box>
          <Button onClick={handleExpandClick} sx={{ alignSelf: "flex-start" }}>
            {expanded ? "Show Less" : "Show More"}
          </Button>
        </Box>
      </div>
      <div className={styles.actions}>
        {!isSmallScreen && (
          <button
            className={styles.bookmarkButton}
            aria-label="Bookmark recipe"
          >
            <span role="img" aria-hidden="true">
              📌
            </span>
          </button>
        )}
        <button
          className={styles.selectButton}
          onClick={() => {
            onRecipeSelect(recipe);
          }}
        >
          Select Recipe
        </button>
      </div>
    </div>
  );
};

const RecipeCardList: React.FC<RecipeCardListProps> = ({ recipes }) => {
  const imageUrls = useMemo(
    () => recipes.map((recipe) => recipe.image),
    [recipes]
  ); // Memoize array

  const loadedImages = useImageLoader(imageUrls, 1500);
  const dispatch = useDispatch<AppDispatch>();

  const onRecipeSelect = (recipe: RecipeDTO) => {
    dispatch(setRecipe(recipe));
    dispatch(setCompletionStatus("incomplete"));
  };

  return (
    <div className={styles.recipeCardList}>
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          imageUrl={loadedImages[index] || ""}
          onRecipeSelect={onRecipeSelect}
        />
      ))}
    </div>
  );
};

export default RecipeDashboard;
