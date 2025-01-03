import type { FastifyTypedInstance } from '@/types/fastify-typed-instance.js'
import { authMiddleware } from '../middlewares/auth-middleware.js'
import { MealRepository } from '@/repositories/meal-repository.js'
import { mealUseCaseFactory } from '@/factories/meal-usecase-factory.js'
import { mealFoodSchema, mealSchema, type Meal } from '@/models/meal-types.js'
import { z } from 'zod'

export const mealController = async (server: FastifyTypedInstance) => {
  server.addHook('preHandler', authMiddleware)

  // #region COMMANDS
  server.post(
    '/',
    {
      schema: {
        tags: ['Meals'],
        body: z.object({
          id: z.number(),
          name: z.string(),
          description: z.string().optional().nullable(),
          foods: z.array(mealFoodSchema),
        }),
        response: {
          201: mealSchema,
        },
      },
    },
    async (req, reply) => {
      try {
        const mealUseCase = mealUseCaseFactory(req.user.id)

        const meal = await mealUseCase.create(req.body as Meal)

        reply.code(201).send(meal)
      } catch (error) {
        reply.code(500).send(error)
      }
    },
  )

  server.put(
    '/:mealId',
    {
      schema: {
        tags: ['Meals'],
        body: z.object({
          id: z.number(),
          name: z.string(),
          description: z.string().optional().nullable(),
          foods: z.array(mealFoodSchema),
        }),
        response: {
          200: mealSchema,
        },
      },
    },
    async (req, reply) => {
      try {
        const mealUseCase = mealUseCaseFactory(req.user.id)

        const meal = await mealUseCase.create(req.body as Meal)

        reply.code(200).send(meal)
      } catch (error) {
        reply.code(500).send(error)
      }
    },
  )

  server.delete(
    '/:mealId',
    {
      schema: {
        tags: ['Meals'],
        params: z.object({
          mealId: z.coerce.number(),
        }),
      },
    },
    async (req, reply) => {
      try {
        const { mealId } = req.params

        const mealRepository = new MealRepository(req.user.id)

        await mealRepository.delete(mealId)

        reply.code(204).send()
      } catch (error) {
        reply.code(500).send(error)
      }
    },
  )
  // #endregion COMMANDS

  // #region QUERIES
  server.get(
    '/:mealId',
    {
      schema: {
        tags: ['Meals'],
        params: z.object({
          mealId: z.coerce.number(),
        }),
        response: {
          200: mealSchema,
          400: z.string(),
        },
      },
    },
    async (req, reply) => {
      try {
        const { mealId } = req.params

        const mealRepository = new MealRepository(req.user.id)

        const meal = await mealRepository.findById(mealId)

        if (!meal) {
          reply.code(400).send(`Meal with ID = ${mealId} not found.`)
        }

        reply.code(200).send(meal)
      } catch (error) {
        reply.code(500).send(error)
      }
    },
  )

  server.get(
    '/',
    {
      schema: {
        tags: ['Meals'],
        querystring: z.object({
          page: z.coerce.number(),
          pageSize: z.coerce.number(),
        }),
        response: {
          200: z
            .object({
              items: z.array(mealSchema),
              totalCount: z.number(),
              totalPages: z.number(),
              currentPage: z.number(),
            })
            .or(z.array(mealSchema)),
        },
      },
    },
    async (req, reply) => {
      try {
        const mealRepository = new MealRepository(req.user.id)

        const { page, pageSize } = req.query

        if (page && pageSize) {
          const result = await mealRepository.getAllWithPagination(
            page,
            pageSize,
          )

          reply.code(200).send(result)
        }

        const meals = await mealRepository.getAll()

        reply.code(200).send(meals)
      } catch (error) {
        reply.code(500).send(error)
      }
    },
  )
  // #endregion QUERIES
}
