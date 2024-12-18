import type { FastifyInstance } from 'fastify'

import { authMiddleware } from '@/middlewares/auth-middleware.js'

import { FoodRepository } from '@/repositories/food-repository.js'
import { FoodUseCase } from '@/usecases/food-usecase.js'
import type { Food } from '@/models/food-types.js'

type RequestParams = {
  foodId: string
}

export const foodRoutes = async (server: FastifyInstance) => {
  server.addHook('preHandler', authMiddleware)

  // #region Commands
  server.post<{ Body: Food }>('/', async (req, reply) => {
    try {
      const foodRepository = new FoodRepository(req.user.id)

      const foodUseCase = new FoodUseCase(foodRepository)

      const food = await foodUseCase.create(req.body)

      reply.code(201).send(food)
    } catch (error) {
      reply.code(500).send(error)
    }
  })

  server.put<{ Body: Food }>('/', async (req, reply) => {
    try {
      const foodRepository = new FoodRepository(req.user.id)

      const foodUseCase = new FoodUseCase(foodRepository)

      const food = await foodUseCase.update(req.body)

      reply.code(200).send(food)
    } catch (error) {
      reply.code(500).send(error)
    }
  })

  server.delete<{ Params: RequestParams }>('/:foodId', async (req, reply) => {
    try {
      const { foodId } = req.params

      const foodRepository = new FoodRepository(req.user.id)

      await foodRepository.delete(Number(foodId))

      reply.code(204).send()
    } catch (error) {
      reply.code(500).send(error)
    }
  })
  // #endregion Commands

  // #region Queries
  server.get<{ Params: RequestParams }>('/:foodId', async (req, reply) => {
    try {
      const { foodId } = req.params

      const foodRepository = new FoodRepository(req.user.id)

      const food = await foodRepository.findById(Number(foodId))

      if (!food) {
        reply.code(400).send(`Food with ID = ${foodId} not found.`)
      }

      reply.code(200).send(food)
    } catch (error) {
      reply.code(500).send(error)
    }
  })

  server.get('/', async (req, reply) => {
    try {
      const foodRepository = new FoodRepository(req.user.id)

      const queryParams = req.query as { page: string; pageSize: string }

      const page = Number.parseInt(queryParams.page)

      const pageSize = Number.parseInt(queryParams.pageSize)

      if (page && pageSize) {
        const result = await foodRepository.getAllWithPagination(page, pageSize)

        reply.code(200).send(result)
      } else {
        const foods = await foodRepository.getAll()

        reply.code(200).send(foods)
      }
    } catch (error) {
      reply.code(500).send(error)
    }
  })
  // #endregion Queries
}
