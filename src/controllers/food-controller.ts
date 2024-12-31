import type { FastifyTypedInstance } from '@/types/fastify-typed-instance.js'
import { authMiddleware } from '@/middlewares/auth-middleware.js'
import { FoodRepository } from '@/repositories/food-repository.js'
import { foodUseCaseFactory } from '@/factories/food-usecase-factory.js'
import { foodSchema, type Food } from '@/models/food-types.js'
import { z } from 'zod'

export const foodController = async (server: FastifyTypedInstance) => {
  server.addHook('preHandler', authMiddleware)

  // #region COMMANDS
  server.post(
    '/',
    {
      schema: {
        tags: ['Foods'],
        body: foodSchema,
        response: {
          201: foodSchema,
        },
      },
    },
    async (req, reply) => {
      try {
        const foodUseCase = foodUseCaseFactory(req.user.id)

        const food = await foodUseCase.create(req.body as Food)

        reply.code(201).send(food)
      } catch (error) {
        reply.code(500).send(error)
      }
    },
  )

  server.put(
    '/',
    {
      schema: {
        tags: ['Foods'],
        body: foodSchema,
        response: {
          200: foodSchema,
        },
      },
    },
    async (req, reply) => {
      try {
        const foodUseCase = foodUseCaseFactory(req.user.id)

        const food = await foodUseCase.update(req.body as Food)

        reply.code(200).send(food)
      } catch (error) {
        reply.code(500).send(error)
      }
    },
  )

  server.delete(
    '/:foodId',
    {
      schema: {
        tags: ['Foods'],
        params: z.object({
          foodId: z.coerce.number(),
        }),
      },
    },
    async (req, reply) => {
      try {
        const { foodId } = req.params

        const foodRepository = new FoodRepository(req.user.id)

        await foodRepository.delete(foodId)

        reply.code(204).send()
      } catch (error) {
        reply.code(500).send(error)
      }
    },
  )

  server.post(
    '/:foodId/image-upload',
    {
      schema: {
        tags: ['Foods'],
        params: z.object({
          foodId: z.coerce.number(),
        }),
        response: {
          201: z.string(),
          400: z.string(),
        },
      },
    },
    async (req, reply) => {
      const { foodId } = req.params

      if (!foodId) {
        reply.status(400).send('Parameter foodId is required')
      }

      const data = await req.file()

      if (!data) {
        reply.status(400).send('No file sent')
      }

      const foodUseCase = foodUseCaseFactory(req.user.id)

      const result = await foodUseCase.imageUpload(data)

      if (!result.success) {
        reply.status(500).send('Failed to save image to memory')
      }

      const foodRepository = new FoodRepository(req.user.id)

      await foodRepository.saveImageUrl(foodId, result.imageUrl)

      reply.code(201).send(result.imageUrl)
    },
  )
  // #endregion COMMANDS

  // #region QUERIES
  server.get(
    '/:foodId',
    {
      schema: {
        tags: ['Foods'],
        params: z.object({
          foodId: z.coerce.number(),
        }),
        response: {
          200: foodSchema,
          400: z.string(),
        },
      },
    },
    async (req, reply) => {
      try {
        const { foodId } = req.params

        const foodRepository = new FoodRepository(req.user.id)

        const food = await foodRepository.findById(foodId)

        if (!food) {
          reply.code(400).send(`Food with ID = ${foodId} not found.`)
        }

        reply.code(200).send(food)
      } catch (error) {
        reply.code(500).send(error)
      }
    },
  )

  server.get(
    '/',
    {
      schema: {
        tags: ['Foods'],
        querystring: z.object({
          page: z.coerce.number(),
          pageSize: z.coerce.number(),
        }),
        response: {
          200: z
            .object({
              items: z.array(foodSchema),
              totalCount: z.number(),
              totalPages: z.number(),
              currentPage: z.number(),
            })
            .or(z.array(foodSchema)),
        },
      },
    },
    async (req, reply) => {
      try {
        const foodRepository = new FoodRepository(req.user.id)

        const { page, pageSize } = req.query

        if (page && pageSize) {
          const result = await foodRepository.getAllWithPagination(
            page,
            pageSize,
          )

          reply.code(200).send(result)
        } else {
          const foods = await foodRepository.getAll()

          reply.code(200).send(foods)
        }
      } catch (error) {
        reply.code(500).send(error)
      }
    },
  )
  // #endregion QUERIES
}
