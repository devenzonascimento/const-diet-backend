import { FastifyInstance } from "fastify";

import { authMiddleware } from "../middlewares/auth-middleware.js";

import { MealUseCase } from "../usecases/meal-usecase.js";

import { MealFoodCreate } from "../interfaces/meal-food-interface.js";

interface RequestParams {
  userId: string;
  mealId: string;
}

interface RequestBody {
  name: string;
  foods: MealFoodCreate[];
}

export const mealRoutes = async (server: FastifyInstance) => {
  const mealUseCase = new MealUseCase();

  server.addHook("preHandler", authMiddleware);

  server.post<{ Params: RequestParams; Body: RequestBody }>(
    "/",
    async (req, reply) => {
      try {
        const { name, foods } = req.body;

        const { userId } = req.params;

        const meal = await mealUseCase.create({ userId, name }, foods);

        reply.code(201).send(meal);
      } catch (error) {
        reply.code(500).send(error);
      }
    }
  );

  server.get<{ Params: RequestParams }>("/:mealId", async (req, reply) => {
    try {
      const { mealId } = req.params;

      const meal = await mealUseCase.findById(mealId);

      reply.send(meal);
    } catch (error) {
      reply.code(500).send(error);
    }
  });

  server.put<{ Params: RequestParams; Body: RequestBody }>(
    "/:mealId",
    async (req, reply) => {
      try {
        const { name, foods } = req.body;

        const { mealId } = req.params;

        await mealUseCase.update({ id: mealId, name }, foods);

        reply.code(200).send();
      } catch (error) {
        console.log(error);
        reply.code(500).send(error);
      }
    }
  );

  server.delete<{ Params: RequestParams }>("/:mealId", async (req, reply) => {
    try {
      const { mealId } = req.params;

      await mealUseCase.delete(mealId);

      reply.code(204).send();
    } catch (error) {
      reply.code(500).send(error);
    }
  });

  server.get<{ Params: RequestParams }>("/", async (req, reply) => {
    try {
      const { userId } = req.params;

      const meal = await mealUseCase.getAll(userId);

      reply.code(200).send(meal);
    } catch (error) {
      reply.code(500).send(error);
    }
  });
};
