import type { FastifyInstance } from 'fastify'

import { authMiddleware } from '../middlewares/auth-middleware.js'

import { MealRepository } from '@/repositories/meal-repository.js'
import { mealUseCaseFactory } from '@/factories/meal-usecase-factory.js'
import type { Meal } from '@/models/meal-types.js'

type RequestParams = {
  mealId: string
}

export const mealRoutes = async (server: FastifyInstance) => {
  server.addHook('preHandler', authMiddleware)

  // #region COMMANDS
  server.post<{ Body: Meal }>('/', async (req, reply) => {
    try {
      const mealUseCase = mealUseCaseFactory(req.user.id)

      const meal = await mealUseCase.create(req.body)

      reply.code(201).send(meal)
    } catch (error) {
      reply.code(500).send(error)
    }
  })

  server.put<{ Body: Meal }>('/:mealId', async (req, reply) => {
    try {
      const mealUseCase = mealUseCaseFactory(req.user.id)

      const meal = await mealUseCase.create(req.body)

      reply.code(200).send(meal)
    } catch (error) {
      reply.code(500).send(error)
    }
  })

  server.delete<{ Params: RequestParams }>('/:mealId', async (req, reply) => {
    try {
      const mealId = Number(req.params.mealId)

      const mealRepository = new MealRepository(req.user.id)

      await mealRepository.delete(mealId)

      reply.code(204).send()
    } catch (error) {
      reply.code(500).send(error)
    }
  })
  // #endregion COMMANDS

  // #region QUERIES
  server.get<{ Params: RequestParams }>('/:mealId', async (req, reply) => {
    try {
      const mealId = Number(req.params.mealId)

      const mealRepository = new MealRepository(req.user.id)

      const meal = mealRepository.findById(mealId)

      reply.code(200).send(meal)
    } catch (error) {
      reply.code(500).send(error)
    }
  })

  server.get<{ Params: RequestParams }>('/', async (req, reply) => {
    try {
      const mealRepository = new MealRepository(req.user.id)

      const meals = mealRepository.getAll()

      reply.code(200).send(meals)
    } catch (error) {
      reply.code(500).send(error)
    }
  })
  // #endregion QUERIES
}
