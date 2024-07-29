import { FastifyInstance } from "fastify";

import { authMiddleware } from "../middlewares/auth-middleware.js";

import { DailyRoutineUseCase } from "../usecases/daily-routine-usecase.js";

import { $Enums } from "@prisma/client";

import { MealStatus } from "../interfaces/daily-routine-interface.js";

interface RequestParams {
  userId: string;
  dailyRoutineId: string;
}

interface RequestBody {
  status: $Enums.Status
}

export const dailyRoutineRoutes = async (server: FastifyInstance) => {
  const dailyRoutineUseCase = new DailyRoutineUseCase();

  server.addHook("preHandler", authMiddleware);

  server.get<{ Params: RequestParams; Body: RequestBody }>(
    "/",
    async (_, reply) => {
      try {
        const dailyRoutine = await dailyRoutineUseCase.getDailyRoutine();
        
        reply.code(200).send(dailyRoutine);
      } catch (error) {
        reply.code(500).send(error);
      }
    }
  );

  server.patch<{ Params: RequestParams; Body: RequestBody }>(
    "/:dailyRoutineId",
    async (req, reply) => {
      try {
        const { dailyRoutineId } = req.params;

        const { status } = req.body;

        await dailyRoutineUseCase.setStatus(dailyRoutineId, status);

        reply.code(200).send();
      } catch (error) {
        reply.code(500).send(error);
      }
    }
  );

  server.patch<{ Params: RequestParams; Body: MealStatus }>(
    "/:dailyRoutineId/meals-status",
    async (req, reply) => {
      try {
        const { dailyRoutineId } = req.params;

        const data = req.body;
        
        await dailyRoutineUseCase.setMealStatus(dailyRoutineId, data);

        reply.code(200).send();
      } catch (error) {
        reply.code(500).send(error);
      }
    }
  );

};
