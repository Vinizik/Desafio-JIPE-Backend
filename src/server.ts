import fastify from "fastify";
import { prisma } from "./lib/prisma";
import fastifyCors from "@fastify/cors";

const server = fastify();
server.register(fastifyCors);

server.get("/cars", async function (req, reply) {
  const cars = await prisma.carros.findMany();
  reply.send(cars);
});

server.post("/cars", async (req, reply) => {
  await prisma.carros.create({
    data: {
      nome: req.body.nome,
      preco: req.body.preco,
      kilometragem: req.body.kilometragem,
    },
  });
  reply.send({ message: "/cars" });
  console.log("Carro adicionado com sucesso!");
});

server.delete("/cars/:carId", async (req, reply) => {
  await prisma.carros.delete({
    where: {
      id: Number(req.params.carId),
    },
  });
  reply.send({ message: "/cars" });
  console.log("Carro deletado com sucesso!");
});

server.put("/cars/:carId", async (req, reply) => {
  await prisma.carros.update({
    where: {
      id: Number(req.params.carId),
    },
    data: {
      nome: req.body.nome,
      preco: req.body.preco,
      kilometragem: req.body.kilometragem,
    },
  });
  reply.send({ message: "/cars" });
  console.log("Carro editado com sucesso!");
});

server.listen({ port: 3001 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
