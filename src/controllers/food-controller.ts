import type { FastifyInstance } from 'fastify'

import { authMiddleware } from '@/middlewares/auth-middleware.js'

import { FoodRepository } from '@/repositories/food-repository.js'
import { foodUseCaseFactory } from '@/factories/food-usecase-factory.js'
import type { Food } from '@/models/food-types.js'

type RequestParams = {
  foodId: string
}

export const foodController = async (server: FastifyInstance) => {
  server.addHook('preHandler', authMiddleware)

  // #region COMMANDS
  server.post<{ Body: Food }>('/', async (req, reply) => {
    try {
      const foodUseCase = foodUseCaseFactory(req.user.id)

      const food = await foodUseCase.create(req.body)

      reply.code(201).send(food)
    } catch (error) {
      reply.code(500).send(error)
    }
  })

  server.put<{ Body: Food }>('/', async (req, reply) => {
    try {
      const foodUseCase = foodUseCaseFactory(req.user.id)

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

  server.post<{ Params: RequestParams }>(
    '/:foodId/image-upload',
    async (req, reply) => {
      const foodId = Number(req.params.foodId)

      if (!foodId) {
        reply
          .status(400)
          .send({ error: 'O parâmetro (foodId) é obrigáritorio' })
      }

      const data = await req.file()

      if (!data) {
        reply.status(400).send({ error: 'Nenhum arquivo enviado' })
      }

      const foodUseCase = foodUseCaseFactory(req.user.id)

      const result = await foodUseCase.imageUpload(data)

      if (!result.success) {
        reply.status(500).send({ error: 'Falha ao salvar imagem na memória' })
      }

      const foodRepository = new FoodRepository(req.user.id)

      await foodRepository.saveImageUrl(foodId, result.imageUrl)

      reply.code(201).send(result.imageUrl)
    },
  )
  // #endregion COMMANDS

  // #region QUERIES
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
  // #endregion QUERIES
}
