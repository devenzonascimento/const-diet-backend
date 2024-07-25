import { prisma } from "../../src/database/prisma-client";
import { MealUseCase } from "../../src/usecases/meal-usecase";

const mealsData = [
  { "id": "1", "name": "Café da Manhã", "foods": [{ "id": "1", "quantity": 100.0 }, { "id": "12", "quantity": 50.0 }] },
  { "id": "2", "name": "Lanche da Manhã", "foods": [{ "id": "9", "quantity": 100.0 }, { "id": "13", "quantity": 200.0 }] },
  { "id": "3", "name": "Almoço", "foods": [{ "id": "1", "quantity": 150.0 }, { "id": "2", "quantity": 100.0 }, { "id": "3", "quantity": 100.0 }] },
  { "id": "4", "name": "Lanche da Tarde", "foods": [{ "id": "10", "quantity": 100.0 }, { "id": "13", "quantity": 200.0 }] },
  { "id": "5", "name": "Jantar", "foods": [{ "id": "1", "quantity": 150.0 }, { "id": "2", "quantity": 100.0 }, { "id": "4", "quantity": 100.0 }] },
  { "id": "6", "name": "Ceia", "foods": [{ "id": "12", "quantity": 50.0 }, { "id": "14", "quantity": 30.0 }] },
  { "id": "7", "name": "Lanche Noturno", "foods": [{ "id": "9", "quantity": 100.0 }] },
  { "id": "8", "name": "Refeição Pós-Treino", "foods": [{ "id": "3", "quantity": 150.0 }, { "id": "8", "quantity": 100.0 }] },
  { "id": "9", "name": "Refeição Pré-Treino", "foods": [{ "id": "15", "quantity": 150.0 }, { "id": "7", "quantity": 100.0 }] },
  { "id": "10", "name": "Refeição de Domingo", "foods": [{ "id": "4", "quantity": 200.0 }, { "id": "5", "quantity": 150.0 }, { "id": "6", "quantity": 100.0 }] }
]

const mealUseCase = new MealUseCase()

interface Meal {
  id: string;
  name: string;
  foods: {
    id: string;
    quantity: number;    
  }[]
}
const seed = async (meal: Meal) => {
  try {
    const userId = "0627e041-edb2-4d11-bf1b-ace20b787948";

    const { id } = await prisma.meal.create({
      data: {
        userId,
        id: meal.id,
        name: meal.name,
        foods: {
          createMany: {
            data: meal.foods.map((food) => ({
              foodId: food.id,
              quantity: food.quantity,            
            })),
          }
        }
      }
    })

    await mealUseCase.saveCalculatedFields(id)

  } catch (error) {
    console.error("Erro ao executar seed de refeições:", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const startSeed = async () => {
  console.log("start");

  for (let i = 0; i < mealsData.length; i++) {
    await seed(mealsData[i]);
  }

  console.log("Seed concluída com sucesso.");
};
