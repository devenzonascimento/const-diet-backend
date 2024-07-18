import { CalculatedFields } from "../interfaces/routine-interface";

export const calculateFieldsBasedOnMeals = (meals: CalculatedFields[]) => {
  const calculatedFields: CalculatedFields = {
    calories: 0,
    carbohydrates: 0,
    proteins: 0,
    fats: 0,
    sodium: 0,
    fibers: 0,
  };
  
  meals.forEach((meal) => {
    calculatedFields.calories += meal.calories;
    calculatedFields.carbohydrates += meal.carbohydrates;
    calculatedFields.proteins += meal.proteins;
    calculatedFields.fats += meal.fats;
    calculatedFields.sodium += meal.sodium;
    calculatedFields.fibers += meal.fibers;
  });

  return calculatedFields;
};
