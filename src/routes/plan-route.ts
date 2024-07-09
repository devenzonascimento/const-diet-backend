import { FastifyInstance } from "fastify";
import { PlanUseCase } from "../usecases/plan-usecase.js";
import { PlanCreate } from "../interfaces/plan-interface.js";

interface RequestParams {
  userId: string;
  planId: string;
}

export const planRoutes = async (server: FastifyInstance) => {
  const planUseCase = new PlanUseCase()

  server.post<{ Params: RequestParams; Body: PlanCreate }>(
    "/",
    async (req, reply) => {
      try {
        const { userId } = req.params;

        const data = req.body;        

        const plan = await planUseCase.create({...data, userId});

        reply.code(201).send(plan);
      } catch (error) {
        reply.code(500).send(error);
      }
    }
  );

  server.get<{ Params: RequestParams; }>(
    "/",
    async (req, reply) => {
      try {
        const { userId } = req.params;

        const plan = await planUseCase.getAll(userId);

        reply.code(200).send(plan);
      } catch (error) {
        reply.code(500).send(error);
      }
    }
  );
};

