import { FastifyInstance } from "fastify";

import { authMiddleware } from "../middlewares/auth-middleware.js";

import { RoutineUseCase } from "../usecases/routine-usecase.js";

import { RoutineMealCreate } from "../interfaces/routine-meal-interface.js";

interface RequestParams {
  userId: string;
  routineId: string;
}

interface RequestBody {
  name: string;
  water: number;
  meals: RoutineMealCreate[];
}

export const routineRoutes = async (server: FastifyInstance) => {
  const routineUseCase = new RoutineUseCase();

  server.addHook("preHandler", authMiddleware)

  server.post<{ Params: RequestParams; Body: RequestBody }>(
    "/",
    async (req, reply) => {
      try {
        const { userId } = req.params;
        
        const { name, water, meals } = req.body;

        const routine = await routineUseCase.create({ userId, name, water }, meals);

        reply.code(201).send(routine);
      } catch (error) {
        reply.code(500).send(error);
      }
    }
  );

  server.get<{ Params: RequestParams }>("/:routineId", async (req, reply) => {
    try {
      const { routineId } = req.params;

      const routine = await routineUseCase.findById(routineId);

      reply.code(200).send(routine);
    } catch (error) {
      reply.code(500).send(error);
    }
  });

  server.put<{ Params: RequestParams; Body: RequestBody }>(
    "/:routineId",
    async (req, reply) => {
      try {
        const { routineId } = req.params;
        
        const { name, water, meals } = req.body;

        const routine = await routineUseCase.update({ id: routineId, name, water }, meals);

        reply.code(200).send(routine);
      } catch (error) {
        console.log(error);
        reply.code(500).send(error);
      }
    }
  );

  server.delete<{ Params: RequestParams }>("/:routineId", async (req, reply) => {
    try {
      const { routineId } = req.params;

      await routineUseCase.delete(routineId);

      reply.code(204).send();
    } catch (error) {
      reply.code(500).send(error);
    }
  });

  server.get<{ Params: RequestParams }>("/", async (req, reply) => {
    try {
      const { userId } = req.params;

      const routines = await routineUseCase.getAll(userId);

      reply.code(200).send(routines);
    } catch (error) {
      reply.code(500).send(error);
    }
  });
};
