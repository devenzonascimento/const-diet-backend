import { fastify, FastifyInstance } from "fastify";
import { fastifyCors } from "@fastify/cors";

import { userRoutes } from "./routes/user-route";
import { foodRoutes } from "./routes/food-route";

const server: FastifyInstance = fastify();

server.register(fastifyCors, {
  origin: true,
});

server.get("/", () => {
  return "SERVER ON!";
});

server.register(userRoutes, {
  prefix: "/users",
});

server.register(foodRoutes, {
  prefix: "users/:userId/foods",
});

/*
server.get("/auth", {preHandler: authMiddleware}, (req, reply) => {
  reply.code(200).send()
});

server.register(foodRoutes, {
  prefix: "users/:userId/foods",
});

server.register(mealRoutes, {
  prefix: "users/:userId/meals",
});

server.register(rotineRoutes, {
  prefix: "/routines",
});

server.register(foodInMealRoutes, {
  prefix: "/users/:userId/meals/:mealId/foods",
});

server.register(dailyMealRoutes, {
  prefix: "/users/daily-meals",
});

server.register(planRoutes, {
  prefix: "/users/plan",
});
*/

server.listen({ port: 3333 }, () => console.log("SERVIDOR ONLINE"));
