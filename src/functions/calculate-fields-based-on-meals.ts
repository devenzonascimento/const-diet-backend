import { CalculatedFields } from "../interfaces/routine-interface";

export const calculateFieldsBasedOnMeals = (meals: CalculatedFields[]) => {
  const calculatedFields: CalculatedFields = {
    totalCalories: 0,
    totalCarbohydrates: 0,
    totalProteins: 0,
    totalFats: 0,
    totalSodiums: 0,
    totalFibers: 0,
  };
  
  meals.forEach((meal) => {
    calculatedFields.totalCalories += meal.totalCalories;
    calculatedFields.totalCarbohydrates += meal.totalCarbohydrates;
    calculatedFields.totalProteins += meal.totalProteins;
    calculatedFields.totalFats += meal.totalFats;
    calculatedFields.totalSodiums += meal.totalSodiums;
    calculatedFields.totalFibers += meal.totalFibers;
  });

  return calculatedFields;
};