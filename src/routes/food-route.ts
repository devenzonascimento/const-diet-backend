import type { FastifyInstance } from 'fastify'

import { authMiddleware } from '@/middlewares/auth-middleware.js'

import { FoodRepository } from '@/repositories/food-repository.js'
import { FoodUseCase } from '@/usecases/food-usecase.js'
import type { FoodCreate, FoodUpdate } from '@/interfaces/food-interface.js'

type RequestParams = {
  foodId: string
}

export const foodRoutes = async (server: FastifyInstance) => {
  const foodUseCase = new FoodUseCase()
  const foodRepository = new FoodRepository()

  server.addHook('preHandler', authMiddleware)

  server.post<{ Params: RequestParams; Body: Omit<FoodCreate, 'userId'> }>(
    '/',
    async (req, reply) => {
      try {
        const user = req.user

        const data = req.body

        const food = await foodUseCase.create({ userId: user.id, ...data })

        reply.code(201).send(food)
      } catch (error) {
        reply.code(500).send(error)
      }
    },
  )

  server.get<{ Params: RequestParams }>('/:foodId', async (req, reply) => {
    try {
      const { foodId } = req.params

      const food = await foodRepository.findById(Number(foodId))

      if (!food) {
        reply.code(400).send(`Food with ID = ${foodId} not found.`)
      }

      reply.code(200).send(food)
    } catch (error) {
      reply.code(500).send(error)
    }
  })

  server.get<{ Params: RequestParams }>('/', async (req, reply) => {
    try {
      const user = req.user

      const queryParams = req.query as { page: string; pageSize: string }

      const page = Number.parseInt(queryParams.page)

      const pageSize = Number.parseInt(queryParams.pageSize)

      if (page && pageSize) {
        const result = await foodRepository.getAllWithPagination(
          user.id,
          page,
          pageSize,
        )

        reply.code(200).send(result)
      } else {
        const foods = await foodRepository.getAll(user.id)

        reply.code(200).send(foods)
      }
    } catch (error) {
      reply.code(500).send(error)
    }
  })

  // server.get<{ Params: RequestParams }>("/", async (req, reply) => {
  // 	try {
  // 		const user = req.user;

  // 		const foods = await foodRepository.getAll(user.id);

  // 		reply.code(200).send(foods);
  // 	} catch (error) {
  // 		reply.code(500).send(error);
  // 	}
  // });

  server.put<{ Params: RequestParams; Body: FoodUpdate }>(
    '/',
    async (req, reply) => {
      try {
        const user = req.user

        const data = req.body

        const food = await foodUseCase.update(user.id, data)

        reply.code(200).send(food)
      } catch (error) {
        reply.code(500).send(error)
      }
    },
  )

  server.delete<{ Params: RequestParams }>('/:foodId', async (req, reply) => {
    try {
      const { foodId } = req.params

      await foodRepository.delete(Number(foodId))

      reply.code(204).send()
    } catch (error) {
      reply.code(500).send(error)
    }
  })
}
