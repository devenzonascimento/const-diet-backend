import { CalculatedFields } from "../interfaces/routine-interface";
import { MealFood } from "../interfaces/meal-food-interface";

export const calculateFieldsBasedOnFoods = (foods: MealFood[]) => {
  const calculatedFields: CalculatedFields = {
    calories: 0,
    carbohydrates: 0,
    proteins: 0,
    fats: 0,
    sodium: 0,
    fibers: 0,
  };
  
  foods.forEach((item) => {
    calculatedFields.calories += item.quantity * item.food.calories / 100
    calculatedFields.carbohydrates += item.quantity * item.food.carbohydrates / 100
    calculatedFields.proteins += item.quantity * item.food.proteins / 100
    calculatedFields.fats += item.quantity * item.food.fats / 100
    calculatedFields.sodium += item.quantity * item.food.sodium / 100
    calculatedFields.fibers += item.quantity * item.food.fibers / 100
  });

  return calculatedFields;
};
