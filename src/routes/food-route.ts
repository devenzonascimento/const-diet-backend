import { FastifyInstance } from "fastify";

import { authMiddleware } from "../middlewares/auth-middleware.js";

import { FoodUseCase } from "../usecases/food-usecase.js";

import { FoodCreate, FoodUpdate } from "../interfaces/food-interface.js";

interface RequestParams {
  userId: string;
  foodId: string;
}

export const foodRoutes = async (server: FastifyInstance) => {
  const foodUseCase = new FoodUseCase();

  server.addHook("preHandler", authMiddleware);

  server.post<{ Params: RequestParams; Body: Omit<FoodCreate, "userId"> }>(
    "/",
    async (req, reply) => {
      try {
        const { userId } = req.params;

        const data = req.body;

        const food = await foodUseCase.create({ userId, ...data });

        reply.code(201).send(food);
      } catch (error) {
        reply.code(500).send(error);
      }
    }
  );

  server.get<{ Params: RequestParams }>("/:foodId", async (req, reply) => {
    try {
      const { foodId } = req.params;

      const food = await foodUseCase.findById(foodId);

      reply.code(200).send(food);
    } catch (error) {
      reply.code(500).send(error);
    }
  });

  server.put<{ Params: RequestParams; Body: FoodUpdate }>(
    "/:foodId",
    async (req, reply) => {
      try {
        const { userId, foodId } = req.params;

        const data = req.body;

        const food = await foodUseCase.update(userId, foodId, data);

        reply.code(200).send(food);
      } catch (error) {
        reply.code(500).send(error);
      }
    }
  );

  server.delete<{ Params: RequestParams }>("/:foodId", async (req, reply) => {
    try {
      const { foodId } = req.params;

      await foodUseCase.delete(foodId);

      reply.code(204).send();
    } catch (error) {
      reply.code(500).send(error);
    }
  });

  server.get<{ Params: RequestParams }>("/", async (req, reply) => {
    try {
      const { userId } = req.params;

      const foods = await foodUseCase.getAllFoods(userId);

      reply.code(200).send(foods);
    } catch (error) {
      reply.code(500).send(error);
    }
  });
};
