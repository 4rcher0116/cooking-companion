import React from 'react'
import styles from './styles/_RecipeDashboard.module.css'

const RecipeDashboard = () => {
  return (
    <div>
        <div>Filter Menu Placeholder</div>
        <div>Recipe Renderer Placeholder</div>
    </div>
  )
}

const FilterMenu = () => {
  /**
   * Filters to implement 
   * Meal type - autocomplete - Options: breakfast, lunch, dinner, snack/dessert
   * Max Cook time - autocompelte - Options: 'Quick(under 15 minutes)', 'Short(15-30 minutes)', 'Moderate (30-60 minutes)', 'Long (60-90 minutes)', 'Unlimited/No Limit', 
   * Serving size - slider - 1-20
   * Skill level - options: beginner, intermediate, advanced
   * calories - autocomplete - Options: Low(under 200 calories), Moderate (under 400 calories), standard (under 600 calories), hearty ( under 800 calories), high (over 800 calories)
   * Name search - text field
 
  */
  
  return (
    <div className={styles.filterMenuContainer}>
      
    </div>
  )
}

export default RecipeDashboard