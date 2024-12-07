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
  "main course",
  "side dish",
  "dessert",
  "appetizer",
  "salad",
  "bread",
  "breakfast",
  "soup",
  "beverage",
  "sauce",
  "drink",
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
];

export const calorieMap: { [key: string]: number } = {
  "Low (under 200 calories)": 200,
  "Moderate (under 400 calories)": 400,
  "Standard (under 600 calories)": 600,
  "Hearty (under 800 calories)": 800,
};

export const cookTimeMap: { [key: string]: number } = {
    "Quick (under 15 minutes)": 15,
    "Short (15-30 minutes)": 30,
    "Moderate (30-60 minutes)": 60,
    "Long (60-90 minutes)": 90,
    "Unlimited/No Limit": Infinity, // Use Infinity to represent no limit
  };

export const skillLevelOptions = ["Beginner", "Intermediate", "Advanced"];
