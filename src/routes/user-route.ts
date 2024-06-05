import { FastifyInstance } from "fastify";

import { UserUseCase } from "../usecases/user-usecase.js";

import {
  UserCreate,
  UserLogin,
  UserStats,
  UserUpdate,
} from "../interfaces/user-interface.js";

export const userRoutes = async (server: FastifyInstance) => {
  const userUseCase = new UserUseCase();

  server.post<{ Body: UserCreate }>("/register", async (req, reply) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        reply.code(400).send({
          message: "Fields name, email and password are required.",
        });
      }

      const user = await userUseCase.create({ name, email, password });

      reply.code(201).send(user);
    } catch (error) {
      reply.code(500).send(error);
    }
  });

  server.post<{ Body: UserLogin }>("/login", async (req, reply) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        reply.code(400).send({
          message: "Fields email and password are required.",
        });
      }

      const user = await userUseCase.login({ email, password });

      reply.code(200).send(user);
    } catch (error) {
      reply.code(500).send(error);
    }
  });

  server.patch<{ Params: { userId: string }; Body: UserStats }>(
    "/:userId/details",
    async (req, reply) => {
      try {
        const { age, height, weight, sex, activityLevel } = req.body;

        if (!age || !height || !weight || !sex || !activityLevel) {
          reply.code(400).send({
            message:
              "Fields age, height, weight, sex and activityLevel are required.",
          });
        }

        const { userId } = req.params;

        const user = await userUseCase.addStats(userId, {
          age,
          height,
          weight,
          sex,
          activityLevel,
        });

        reply.code(200).send(user);
      } catch (error) {
        reply.code(500).send(error);
      }
    }
  );

  server.put<{ Params: { userId: string }; Body: UserUpdate }>(
    "/:userId",
    async (req, reply) => {
      try {
        const { userId } = req.params;

        const data = req.body;

        const user = await userUseCase.update(userId, data);

        reply.code(200).send(user);
      } catch (error) {
        reply.status(500).send(error);
      }
    }
  );

  server.delete<{ Params: { userId: string } }>(
    "/:userId",
    async (req, reply) => {
      try {
        const { userId } = req.params;

        await userUseCase.delete(userId);

        reply.code(204).send();
      } catch (error) {
        reply.status(500).send(error);
      }
    }
  );
};
