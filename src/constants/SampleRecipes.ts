import { RecipeDTO } from "./RecipeDTO";

export const sampleRecipes: RecipeDTO[] = [
    {
      vegetarian: true,
      vegan: false,
      glutenFree: true,
      dairyFree: false,
      veryHealthy: true,
      cheap: false,
      veryPopular: true,
      sustainable: true,
      lowFodmap: false,
      weightWatcherSmartPoints: 10,
      gaps: "none",
      preparationMinutes: 15,
      cookingMinutes: 30,
      aggregateLikes: 500,
      healthScore: 80,
      creditsText: "Recipe by John Doe",
      sourceName: "Healthy Eats",
      pricePerServing: 3.99,
      id: 1,
      title: "Vegan Mushroom Stir Fry",
      author: "John Doe",
      readyInMinutes: 45,
      servings: 4,
      sourceUrl: "https://example.com/vegan-mushroom-stir-fry",
      image: "https://example.com/images/vegan-mushroom-stir-fry.jpg",
      imageType: "jpg",
      nutrition: {
        summary: "A healthy, vegan mushroom stir fry recipe with low calories."
      },
      cuisines: ["Asian"],
      dishTypes: ["Main"],
      diets: ["Vegan", "Gluten Free"],
      occasions: ["Dinner"],
      analyzedInstructions: [
        {
          name: "Cooking Instructions",
          steps: [
            {
              number: 1,
              step: "Prepare ingredients.",
              ingredients: [
                { id: 11260, name: "mushrooms", localizedName: "mushrooms", image: "https://spoonacular.com/cdn/ingredients_100x100/mushrooms.png" },
                { id: 10011457, name: "spinach", localizedName: "spinach", image: "https://spoonacular.com/cdn/ingredients_100x100/spinach.jpg" }
              ],
              equipment: []
            },
            {
              number: 2,
              step: "Sauté mushrooms in a pan with olive oil.",
              ingredients: [
                { id: 4053, name: "olive oil", localizedName: "olive oil", image: "https://spoonacular.com/cdn/ingredients_100x100/olive-oil.jpg" }
              ],
              equipment: [{ id: 404645, name: "frying pan", localizedName: "frying pan", image: "https://spoonacular.com/cdn/equipment_100x100/pan.png" }]
            }
          ]
        }
      ],
      spoonacularScore: 90,
      spoonacularSourceUrl: "https://example.com/recipe-source"
    },
    {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      veryHealthy: false,
      cheap: true,
      veryPopular: false,
      sustainable: false,
      lowFodmap: true,
      weightWatcherSmartPoints: 8,
      gaps: "none",
      preparationMinutes: 20,
      cookingMinutes: 45,
      aggregateLikes: 100,
      healthScore: 60,
      creditsText: "Recipe by Jane Doe",
      sourceName: "Quick Bites",
      pricePerServing: 2.99,
      id: 2,
      title: "Chicken Alfredo",
      author: "Jane Doe",
      readyInMinutes: 65,
      servings: 4,
      sourceUrl: "https://example.com/chicken-alfredo",
      image: "https://example.com/images/chicken-alfredo.jpg",
      imageType: "jpg",
      nutrition: {
        summary: "A classic chicken alfredo recipe with creamy sauce."
      },
      cuisines: ["Italian"],
      dishTypes: ["Main"],
      diets: ["Non-Vegetarian"],
      occasions: ["Dinner"],
      analyzedInstructions: [
        {
          name: "Cooking Instructions",
          steps: [
            {
              number: 1,
              step: "Cook pasta according to package instructions.",
              ingredients: [{ id: 11424, name: "pasta", localizedName: "pasta", image: "https://spoonacular.com/cdn/ingredients_100x100/pasta.png" }],
              equipment: []
            },
            {
              number: 2,
              step: "Cook chicken in a pan with olive oil.",
              ingredients: [
                { id: 10220, name: "chicken breast", localizedName: "chicken breast", image: "https://spoonacular.com/cdn/ingredients_100x100/chicken-breast.png" },
                { id: 4053, name: "olive oil", localizedName: "olive oil", image: "https://spoonacular.com/cdn/ingredients_100x100/olive-oil.jpg" }
              ],
              equipment: [{ id: 404645, name: "frying pan", localizedName: "frying pan", image: "https://spoonacular.com/cdn/equipment_100x100/pan.png" }]
            }
          ]
        }
      ],
      spoonacularScore: 85,
      spoonacularSourceUrl: "https://example.com/recipe-source"
    }
  ];
  