import { FastifyInstance } from "fastify";

import { authMiddleware } from "../middlewares/auth-middleware.js";

import { UserUseCase } from "../usecases/user-usecase.js";

export const authRoutes = async (server: FastifyInstance) => {
  const userUseCase = new UserUseCase();

  server.addHook("preHandler", authMiddleware);

  server.get("/", async (req, reply) => {
    try {
      const token = req.headers.authorization?.replace(
        /^Bearer /,
        ""
      ) as string;

      const newToken = await userUseCase.refreshToken(token);

      reply.code(200).send({ token: newToken });
    } catch (error) {
      reply.code(500).send(error);
    }
  });
};
