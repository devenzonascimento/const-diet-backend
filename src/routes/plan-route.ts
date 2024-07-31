import { FastifyInstance } from "fastify";

import { PlanUseCase } from "../usecases/plan-usecase.js";

import { authMiddleware } from "../middlewares/auth-middleware.js";

import { PlanCreate, PlanUpdate } from "../interfaces/plan-interface.js";

interface RequestParams {
  userId: string;
  planId: string;
}

export const planRoutes = async (server: FastifyInstance) => {
  const planUseCase = new PlanUseCase();

  server.addHook("preHandler", authMiddleware);

  server.post<{ Params: RequestParams; Body: PlanCreate }>(
    "/",
    async (req, reply) => {
      try {
        const { userId } = req.params;

        const data = req.body;

        const plan = await planUseCase.create({ ...data, userId });

        reply.code(201).send(plan);
      } catch (error) {
        reply.code(500).send(error);
      }
    }
  );

  server.put<{ Params: RequestParams; Body: Omit<PlanUpdate, "id"> }>(
    "/:planId",
    async (req, reply) => {
      try {
        const { planId } = req.params;

        const data = req.body;

        const plan = await planUseCase.update({ id: planId, ...data });

        reply.code(200).send(plan);
      } catch (error) {
        reply.code(500).send(error);
      }
    }
  );

  server.get<{ Params: RequestParams }>("/:planId", async (req, reply) => {
    try {
      const { planId } = req.params;

      const plan = await planUseCase.getPlanById(planId);

      reply.code(200).send(plan);
    } catch (error) {
      reply.code(500).send(error);
    }
  });

  server.get<{ Params: RequestParams }>("/", async (req, reply) => {
    try {
      const { userId } = req.params;

      const plans = await planUseCase.getAll(userId);

      reply.code(200).send(plans);
    } catch (error) {
      reply.code(500).send(error);
    }
  });

  server.delete<{ Params: RequestParams }>("/:planId", async (req, reply) => {
    try {
      const { planId } = req.params;

      await planUseCase.delete(planId);

      reply.code(204).send();
    } catch (error) {
      reply.code(500).send(error);
    }
  });

  server.patch<{ Params: RequestParams }>(
    "/:planId/active",
    async (req, reply) => {
      try {
        const { userId, planId } = req.params;

        const plan = await planUseCase.setActivePlan(userId, planId);

        reply.code(200).send(plan);
      } catch (error) {
        reply.code(500).send(error);
      }
    }
  );

  server.get<{ Params: RequestParams }>("/active", async (req, reply) => {
    try {
      const { userId } = req.params;

      const plan = await planUseCase.getActivePlan(userId);

      reply.code(200).send(plan);
    } catch (error) {
      reply.code(500).send(error);
    }
  });
};
