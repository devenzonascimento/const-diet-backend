import { fastify, FastifyInstance } from "fastify";
import { fastifyCors } from "@fastify/cors";

import { authRoutes } from "./routes/auth-route";
import { userRoutes } from "./routes/user-route";
import { foodRoutes } from "./routes/food-route";
import { mealRoutes } from "./routes/meal-route";
import { routineRoutes } from "./routes/routine-route";
import { planRoutes } from "./routes/plan-route";
import { dailyRoutineRoutes } from "./routes/daily-routine-route";

const server: FastifyInstance = fastify();

server.register(fastifyCors, {
  origin: true,
});

server.get("/", () => {
  return "SERVER ON!";
});

server.register(authRoutes, {
  prefix: "/auth",
});

server.register(userRoutes, {
  prefix: "/users",
});

server.register(foodRoutes, {
  prefix: "users/:userId/foods",
});

server.register(mealRoutes, {
  prefix: "users/:userId/meals",
});

server.register(routineRoutes, {
  prefix: "users/:userId/routines",
});

server.register(planRoutes, {
  prefix: "users/:userId/plans",
});

server.register(dailyRoutineRoutes, {
  prefix: "users/:userId/daily-routines",
});

server.listen({ port: 3333 }, () => console.log("SERVIDOR ONLINE"));

//TODO: implementar uma logica pra quando houver update em foods ou meals refazer os campos autocalculados