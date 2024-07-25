import { prisma } from "../../src/database/prisma-client";
import { RoutineUseCase } from "../../src/usecases/routine-usecase";

const routineData = [
  {
    id: "1",
    name: "Rotina 1",
    water: 2000.0,
    meals: [
      { mealId: "1", time: "08:00" },
      { mealId: "3", time: "12:00" },
      { mealId: "5", time: "18:00" },
    ],
  },
  {
    id: "2",
    name: "Rotina 2",
    water: 2500.0,
    meals: [
      { mealId: "2", time: "09:00" },
      { mealId: "4", time: "15:00" },
      { mealId: "6", time: "21:00" },
    ],
  },
  {
    id: "3",
    name: "Rotina 3",
    water: 2000.0,
    meals: [
      { mealId: "1", time: "08:00" },
      { mealId: "7", time: "11:00" },
      { mealId: "3", time: "13:00" },
      { mealId: "9", time: "17:00" },
    ],
  },
  {
    id: "4",
    name: "Rotina 4",
    water: 2500.0,
    meals: [
      { mealId: "1", time: "08:00" },
      { mealId: "5", time: "14:00" },
      { mealId: "8", time: "19:00" },
    ],
  },
  {
    id: "5",
    name: "Rotina 5",
    water: 2200.0,
    meals: [
      { mealId: "2", time: "09:00" },
      { mealId: "4", time: "13:00" },
      { mealId: "6", time: "20:00" },
    ],
  },
  {
    id: "6",
    name: "Rotina 6",
    water: 2300.0,
    meals: [
      { mealId: "1", time: "07:00" },
      { mealId: "5", time: "12:00" },
      { mealId: "7", time: "18:00" },
    ],
  },
  {
    id: "7",
    name: "Rotina 7",
    water: 2500.0,
    meals: [
      { mealId: "10", time: "14:00" },
      { mealId: "9", time: "18:00" },
    ],
  },
];

const routineUseCase = new RoutineUseCase();

interface Routine {
  name: string;
  water: number;
  meals: {
    mealId: string;
    time: string;
  }[];
}

const seed = async (routine: Routine) => {
  try {
    const userId = "0627e041-edb2-4d11-bf1b-ace20b787948";

    const { id } = await prisma.routine.create({
      data: {
        userId,
        name: routine.name,
        water: routine.water,
        meals: {
          createMany: {
            data: routine.meals.map((meal) => ({
              mealId: meal.mealId,
              time: meal.time,
            })),
          },
        },
      },
    });

    await routineUseCase.saveCalculatedFields(id);
  } catch (error) {
    console.error("Erro ao executar seed de rotinas:", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const startSeed = async () => {
  console.log("start");

  for (let i = 0; i < routineData.length; i++) {
    await seed(routineData[i]);
  }

  console.log("Seed concluída com sucesso.");
};
