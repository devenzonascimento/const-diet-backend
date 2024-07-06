import { prisma } from "../database/prisma-client.js";
import { PlanCreate, PlanRepository } from "../interfaces/plan-interface.js";

export class PlanRepositoryPrisma implements PlanRepository {
  async create(planData: PlanCreate) {
    const planId = crypto.randomUUID();

    await prisma.plan.create({
      data: {
        id: planId,
        name: planData.name,
        goal: planData.goal,
        startDate: planData.startDate,
        endDate: planData.endDate,
        userId: planData.userId,
      },
    });

    for (const routine of planData.routines) {
      const routineData = await prisma.routine.findUnique({
        where: { id: routine.routineId },
        include: {
          meals: {
            include: {
              meal: {
                include: {
                  foods: {
                    include: {
                      food: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (routineData) {
        for (const date of routine.date) {
          const routineId = crypto.randomUUID();

          await prisma.dailyRoutine.create({
            data: {
              id: routineId,
              planId: planId,
              name: routineData.name,
              date: date,
              status: "PENDING",
              water: routineData.water,
              totalCalories: routineData.totalCalories,
              totalCarbohydrates: routineData.totalCarbohydrates,
              totalProteins: routineData.totalProteins,
              totalFats: routineData.totalFats,
              totalSodiums: routineData.totalSodiums,
              totalFibers: routineData.totalFibers,
            },
          });

          for (const { meal, time } of routineData.meals) {
            await prisma.dailyMeal.create({
              data: {
                routineId,
                name: meal.name,
                time: time,
                status: "PENDING",
                totalCalories: meal.totalCalories,
                totalCarbohydrates: meal.totalCarbohydrates,
                totalProteins: meal.totalProteins,
                totalFats: meal.totalFats,
                totalSodiums: meal.totalSodiums,
                totalFibers: meal.totalFibers,
                foods: {
                  createMany: {
                    data: meal.foods.map(({ food, quantity }) => ({
                      name: food.name,
                      unit: food.unit,
                      quantity: quantity,
                      calories: food.calories,
                      carbohydrates: food.carbohydrates,
                      proteins: food.proteins,
                      fats: food.fats,
                      sodiums: food.sodiums,
                      fibers: food.fibers,
                    })),
                  },
                },
              },
            });
          }
        }
      }
    }

    return await prisma.plan.findUnique({
      where: {
        id: planId,
      }
    });
  }
}

/*


for (const { meal, time } of routineData.meals) {
              await prisma.dailyMeal.create({
                data: {
                  routineId: routineData.id,
                  name: meal.name,
                  time: time,
                  status: "PENDING",
                  totalCalories: meal.totalCalories,
                  totalCarbohydrates: meal.totalCarbohydrates,
                  totalProteins: meal.totalProteins,
                  totalFats: meal.totalFats,
                  totalSodiums: meal.totalSodiums,
                  totalFibers: meal.totalFibers,
                  foods: {
                    createMany: {
                      data: meal.foods.map(({ food, quantity }) => ({
                        name: food.name,
                        unit: food.unit,
                        quantity: quantity,
                        calories: food.calories,
                        carbohydrates: food.carbohydrates,
                        proteins: food.proteins,
                        fats: food.fats,
                        sodiums: food.sodiums,
                        fibers: food.fibers,
                      })),
                    },
                  },
                },
              });
            }






...data.dailyRoutines.map((dailyRoutine) => {
        return prisma.dailyRoutine.create({
          data: {            
            planId: planId,
            date: dailyRoutine.date,
            dailyMeals: {
              createMany: {
                data: dailyRoutine.dailyMeals.map((meal) => ({                  
                  mealId: meal.mealId,
                  time: meal.time,
                })),
              },
            },
          },
        });
      }),










{
  id: planId,
  name: "kkk",
  goal: "ganhar",
  startDate: Dataaa,
  endDate: Dataa,
  userId: "gver345",
  dailyRoutines: [
    {
      id: "123v"
      date: Dataa,
      status: "PENDING",
      planId: planId,
      dailyMeals: [
        {
          dailyRoutineId: "123v",
          mealId: "3489584jgfa",
          time: "12:30",
          status: "PENDING",
        }
      ]
    }
  ]
}












import { Prisma } from "@prisma/client";

// ...

async create() {
  // ...

  const dailyMeals: Prisma.DailyMealUncheckedCreateNestedManyWithoutDailyRoutineInput[] = dailyRoutine.dailyMeals.map(meal => ({
    create: {
      dailyRoutineId: dailyRoutineId,
      mealId: meal.mealId,
      time: meal.time,
      status: "PENDING",
    },
  }));

  // ...

  return await prisma.plan.create({
    data: {
      userId: data.userId,
      goal: data.goal,
      startDate: data.startDate,
      endDate: data.endDate,
      dailyRoutines: {
        create: {
          id: dailyRoutineId,
          date: dailyRoutine.date,
          status: "PENDING",
          dailyMeals: {
            create: dailyMeals,
          },
        },
      },
    },
  });
}

// ...

{
  "name": "Plano de Exercício",
  "goal": "Perder Peso",
  "startDate": "2024-07-05T00:00:00.000Z",
  "endDate": "2024-12-31T23:59:59.999Z",
  "userId": "60dec13e-ae9e-4ef5-9ad8-fd9cac569af3",
  "dailyRoutines": [
    {
      "date": "2024-07-05T00:00:00.000Z",
      "dailyMeals": [
        {
          "mealId": "d5008a11-2eba-46eb-b706-3530545e260f",
          "time": "08:00"
        },
        {
          "mealId": "d5008a11-2eba-46eb-b706-3530545e260f",
          "time": "12:00"
        }
      ]
    },
    {
      "date": "2024-07-06T00:00:00.000Z",
      "dailyMeals": [
        {
          "mealId": "d5008a11-2eba-46eb-b706-3530545e260f",
          "time": "08:00"
        },
        {
          "mealId": "d5008a11-2eba-46eb-b706-3530545e260f",
          "time": "12:00"
        }
      ]
    }
  ]
}



*/
