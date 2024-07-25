import { $Enums } from "@prisma/client";
import { prisma } from "../../src/database/prisma-client";

import { Food } from "../../src/interfaces/food-interface";

const foodsData = [
  { "id": "1", "name": "Arroz", "unit": $Enums.Unit.GRAMS, "calories": 130.0, "carbohydrates": 28.2, "proteins": 2.5, "fats": 0.2, "fibers": 0.3, "sodium": 1.0 },
  { "id": "2", "name": "Feijão", "unit": $Enums.Unit.GRAMS, "calories": 76.0, "carbohydrates": 13.6, "proteins": 4.5, "fats": 0.3, "fibers": 8.3, "sodium": 1.0 },
  { "id": "3", "name": "Frango", "unit": $Enums.Unit.GRAMS, "calories": 239.0, "carbohydrates": 0.0, "proteins": 27.0, "fats": 14.0, "fibers": 0.0, "sodium": 0.82 },
  { "id": "4", "name": "Carne Bovina", "unit": $Enums.Unit.GRAMS, "calories": 250.0, "carbohydrates": 0.0, "proteins": 26.0, "fats": 15.0, "fibers": 0.0, "sodium": 0.72 },
  { "id": "5", "name": "Batata", "unit": $Enums.Unit.GRAMS, "calories": 77.0, "carbohydrates": 17.5, "proteins": 2.0, "fats": 0.1, "fibers": 2.2, "sodium": 0.6 },
  { "id": "6", "name": "Tomate", "unit": $Enums.Unit.GRAMS, "calories": 18.0, "carbohydrates": 3.9, "proteins": 0.9, "fats": 0.2, "fibers": 1.2, "sodium": 0.5 },
  { "id": "7", "name": "Alface", "unit": $Enums.Unit.GRAMS, "calories": 15.0, "carbohydrates": 2.9, "proteins": 1.4, "fats": 0.2, "fibers": 1.3, "sodium": 0.28 },
  { "id": "8", "name": "Cenoura", "unit": $Enums.Unit.GRAMS, "calories": 41.0, "carbohydrates": 9.6, "proteins": 0.9, "fats": 0.2, "fibers": 2.8, "sodium": 0.69 },
  { "id": "9", "name": "Maçã", "unit": $Enums.Unit.GRAMS, "calories": 52.0, "carbohydrates": 13.8, "proteins": 0.3, "fats": 0.2, "fibers": 2.4, "sodium": 1.0 },
  { "id": "10", "name": "Banana", "unit": $Enums.Unit.GRAMS, "calories": 89.0, "carbohydrates": 22.8, "proteins": 1.1, "fats": 0.3, "fibers": 2.6, "sodium": 1.0 },
  { "id": "11", "name": "Pão Integral", "unit": $Enums.Unit.GRAMS, "calories": 247.0, "carbohydrates": 43.3, "proteins": 8.4, "fats": 4.2, "fibers": 6.8, "sodium": 0.435 },
  { "id": "12", "name": "Ovo", "unit": $Enums.Unit.GRAMS, "calories": 155.0, "carbohydrates": 1.1, "proteins": 13.0, "fats": 11.0, "fibers": 0.0, "sodium": 0.124 },
  { "id": "13", "name": "Leite", "unit": $Enums.Unit.MILILITERS, "calories": 42.0, "carbohydrates": 4.8, "proteins": 3.4, "fats": 1.0, "fibers": 0.0, "sodium": 0.44 },
  { "id": "14", "name": "Queijo", "unit": $Enums.Unit.GRAMS, "calories": 402.0, "carbohydrates": 1.3, "proteins": 25.0, "fats": 33.0, "fibers": 0.0, "sodium": 0.621 },
  { "id": "15", "name": "Peixe", "unit": $Enums.Unit.GRAMS, "calories": 206.0, "carbohydrates": 0.0, "proteins": 22.0, "fats": 12.0, "fibers": 0.0, "sodium": 0.76 }
]

const seed = async (food: Food) => {
  try {
    const userId = "0627e041-edb2-4d11-bf1b-ace20b787948";

    await prisma.food.create({
      data: {
        userId,
        ...food
      }
    })

  } catch (error) {
    console.error("Erro ao executar seed de alimentos:", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const startSeed = async () => {
  console.log("start");

  for (let i = 0; i < foodsData.length; i++) {
    await seed(foodsData[i]);
  }

  console.log("Seed concluída com sucesso.");
};
