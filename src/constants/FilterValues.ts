export interface FilterValues {
    mealType: string;
    maxCookTime: string;
    skillLevel: string;
    calories: string;
    servingSize: number;
    nameSearch: string;
}

export const EMPTY_FILTER_VALUES: FilterValues = {
  mealType: "",
  maxCookTime: "",
  skillLevel: "",
  calories: "",
  servingSize: 1,
  nameSearch: "",
};

// Options for the autocomplete fields
export const mealTypeOptions = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack/Dessert",
];

export const cookTimeOptions = [
  "Quick (under 15 minutes)",
  "Short (15-30 minutes)",
  "Moderate (30-60 minutes)",
  "Long (60-90 minutes)",
  "Unlimited/No Limit",
];

export const calorieOptions = [
  "Low (under 200 calories)",
  "Moderate (under 400 calories)",
  "Standard (under 600 calories)",
  "Hearty (under 800 calories)",
  "High (over 800 calories)",
];

export const skillLevelOptions = ["Beginner", "Intermediate", "Advanced"];
