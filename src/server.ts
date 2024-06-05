import fastify from "fastify";
import fastifyCors from "@fastify/cors";

const server = fastify();

server.register(fastifyCors, {
  origin: true
})

server.get("/", () => {
  return "SERVER ON!!!";
});

server.listen(
  {
    port: 3333,
  },
  () => console.log("SERVIDOR ONLINE")
);
