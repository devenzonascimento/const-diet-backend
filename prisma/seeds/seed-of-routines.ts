import { prisma } from "../../src/database/prisma-client";
import { RoutineUseCase } from "../../src/usecases/routine-usecase";

interface RoutineCreate {
  name: string;
  water: number;
  meals: {
    mealId: string;
    time: string;
  }[];
}

const routineUseCase = new RoutineUseCase();

const seedRoutine = async (routine: RoutineCreate) => {
  try {
    const userId = "60dec13e-ae9e-4ef5-9ad8-fd9cac569af3";

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
      })

      routineUseCase.saveCalculatedFields(id)
  } catch (error) {
    console.error("Erro ao executar seed de alimentos:", error);
  } finally {
    await prisma.$disconnect();
  }
};

const routines = [
  {
    name: "Rotina Nutritiva 1",
    water: 3750,
    meals: [
      {
        mealId: "c84b8276-f27a-49b5-b032-f2e4e00f1016", // Carne com Arroz e Feijão
        time: "12:30",
      },
      {
        mealId: "f8ce52bc-6b1d-4826-af70-b95fde03b8fd", // Aveia Matinal com Banana
        time: "07:45",
      },
      {
        mealId: "9710e594-222e-4b97-b9aa-56bde9ce918b", // Frango com Abacate e Couve
        time: "19:00",
      },
    ],
  },
  {
    name: "Rotina Saudável 2",
    water: 3750,
    meals: [
      {
        mealId: "e2052453-2b59-48db-9c21-ed158f828c59", // Iogurte com Maçã e Aveia
        time: "08:00",
      },
      {
        mealId: "dda10aab-42c2-4c50-8161-d3b1426f9993", // Tilápia com Batata e Couve
        time: "13:00",
      },
      {
        mealId: "092a6374-63a1-4085-98f5-3eeefc83008e", // Peru com Cenoura e Alface
        time: "19:30",
      },
    ],
  },
  {
    name: "Rotina Balanceada 3",
    water: 3750,
    meals: [
      {
        mealId: "e3407908-e1d5-4d9a-a687-70b56e5c16c4", // Prato Brasileiro Completo
        time: "12:00",
      },
      {
        mealId: "ed6ffa56-f4c5-4444-8f02-64b220df0091", // Pão com Queijo e Suco
        time: "09:00",
      },
      {
        mealId: "d5008a11-2eba-46eb-b706-3530545e260f", // Champions Breakfast
        time: "07:30",
      },
    ],
  },
  {
    name: "Rotina Energética 4",
    water: 3750,
    meals: [
      {
        mealId: "e2052453-2b59-48db-9c21-ed158f828c59", // Iogurte com Maçã e Aveia
        time: "10:00",
      },
      {
        mealId: "bf470fff-86a1-46a3-875f-39fcfb844f74", // Peixe com Batata e Alface
        time: "14:00",
      },
      {
        mealId: "45c3af5f-d968-4b90-ba34-dcb3521331f7", // Omelete com Tomate e Queijo
        time: "18:30",
      },
    ],
  },
  {
    name: "Rotina Leve 5",
    water: 3750,
    meals: [
      {
        mealId: "c84b8276-f27a-49b5-b032-f2e4e00f1016", // Carne com Arroz e Feijão
        time: "12:00",
      },
      {
        mealId: "f8ce52bc-6b1d-4826-af70-b95fde03b8fd", // Aveia Matinal com Banana
        time: "07:00",
      },
      {
        mealId: "9710e594-222e-4b97-b9aa-56bde9ce918b", // Frango com Abacate e Couve
        time: "19:00",
      },
    ],
  },
  {
    name: "Rotina Completa 6",
    water: 3750,
    meals: [
      {
        mealId: "092a6374-63a1-4085-98f5-3eeefc83008e", // Peru com Cenoura e Alface
        time: "08:30",
      },
      {
        mealId: "c84b8276-f27a-49b5-b032-f2e4e00f1016", // Carne com Arroz e Feijão
        time: "12:30",
      },
      {
        mealId: "dda10aab-42c2-4c50-8161-d3b1426f9993", // Tilápia com Batata e Couve
        time: "19:30",
      },
    ],
  },
  {
    name: "Rotina Light 7",
    water: 3750,
    meals: [
      {
        mealId: "e2052453-2b59-48db-9c21-ed158f828c59", // Iogurte com Maçã e Aveia
        time: "08:00",
      },
      {
        mealId: "45c3af5f-d968-4b90-ba34-dcb3521331f7", // Omelete com Tomate e Queijo
        time: "12:30",
      },
      {
        mealId: "ed6ffa56-f4c5-4444-8f02-64b220df0091", // Pão com Queijo e Suco
        time: "19:00",
      },
    ],
  },
  {
    name: "Rotina Fit 8",
    water: 3750,
    meals: [
      {
        mealId: "c84b8276-f27a-49b5-b032-f2e4e00f1016", // Carne com Arroz e Feijão
        time: "12:00",
      },
      {
        mealId: "bf470fff-86a1-46a3-875f-39fcfb844f74", // Peixe com Batata e Alface
        time: "14:00",
      },
      {
        mealId: "d5008a11-2eba-46eb-b706-3530545e260f", // Champions Breakfast
        time: "07:30",
      },
    ],
  },
  {
    name: "Rotina Sustentável 9",
    water: 3750,
    meals: [
      {
        mealId: "f8ce52bc-6b1d-4826-af70-b95fde03b8fd", // Aveia Matinal com Banana
        time: "07:45",
      },
      {
        mealId: "9710e594-222e-4b97-b9aa-56bde9ce918b", // Frango com Abacate e Couve
        time: "12:30",
      },
      {
        mealId: "e3407908-e1d5-4d9a-a687-70b56e5c16c4", // Prato Brasileiro Completo
        time: "19:00",
      },
    ],
  },
  {
    name: "Rotina Vital 10",
    water: 3750,
    meals: [
      {
        mealId: "dda10aab-42c2-4c50-8161-d3b1426f9993", // Tilápia com Batata e Couve
        time: "08:00",
      },
      {
        mealId: "092a6374-63a1-4085-98f5-3eeefc83008e", // Peru com Cenoura e Alface
        time: "12:30",
      },
      {
        mealId: "45c3af5f-d968-4b90-ba34-dcb3521331f7", // Omelete com Tomate e Queijo
        time: "19:00",
      },
    ],
  },
];

const startSeed = async () => {
  console.log("start");

  await routines.forEach(async (routine) => {
    await seedRoutine(routine);
  });

  console.log("Seed de rotinas concluída com sucesso.");
};

startSeed();
