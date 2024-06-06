import { FastifyReply, FastifyRequest } from "fastify";

import { UserUseCase } from "../usecases/user-usecase.js";

export const authMiddleware = async (req: FastifyRequest, reply: FastifyReply) => {
  const userUseCase = new UserUseCase()

  const token = req.headers.authorization?.replace(/^Bearer /, "") as string;

  if (!token) {
    reply.code(401).send({ message: "Unauthorized: token missing." });
  }

  const user = await userUseCase.verifyToken(token);
 
  if (!user) {
    reply.code(401).send({ message: "Unauthorized: invalid token." });
  }

  return;
};
