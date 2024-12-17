import type { FastifyInstance } from 'fastify'
import { UserRepository } from '@/repositories/user-repository.js'
import { UserUseCase } from '@/usecases/user-usecase.js'
import type {
  UserCreate,
  UserUpdate,
  UserLogin,
  UserStats,
} from '@/interfaces/user-interface.js'

export const userRoutes = async (server: FastifyInstance) => {
  const userUseCase = new UserUseCase()
  const userRepository = new UserRepository()

  server.post<{ Body: UserCreate }>('/register', async (req, reply) => {
    try {
      const { name, email, password } = req.body

      if (!name || !email || !password) {
        reply.code(400).send({
          message: 'Fields name, email and password are required.',
        })
      }

      const user = await userUseCase.create({ name, email, password })

      reply.code(201).send(user)
    } catch (error) {
      reply.code(500).send(error)
    }
  })

  server.post<{ Body: UserLogin }>('/login', async (req, reply) => {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        reply.code(400).send({
          message: 'Fields email and password are required.',
        })
      }

      const user = await userUseCase.login({ email, password })

      reply.code(200).send(user)
    } catch (error) {
      reply.code(500).send(error)
    }
  })

  server.patch<{ Body: UserStats }>('/stats', async (req, reply) => {
    try {
      const user = req.user

      const { age, height, weight, sex, activityLevel } = req.body

      if (!age || !height || !weight || !sex || !activityLevel) {
        reply.code(400).send({
          message:
            'Fields age, height, weight, sex and activityLevel are required.',
        })
      }

      const userData = await userRepository.addStats(user.id, {
        age,
        height,
        weight,
        sex,
        activityLevel,
      })

      reply.code(200).send(userData)
    } catch (error) {
      reply.code(500).send(error)
    }
  })

  server.put<{ Body: UserUpdate }>('/:userId', async (req, reply) => {
    try {
      const user = req.user

      const data = req.body

      const userData = await userRepository.update(user.id, data)

      reply.code(200).send(userData)
    } catch (error) {
      reply.status(500).send(error)
    }
  })

  // server.delete("/:userId", async (req, reply) => {
  // 	try {
  // 		const user = req.user;

  // 		await userRepository.delete(user.id);

  // 		reply.code(204).send();
  // 	} catch (error) {
  // 		reply.status(500).send(error);
  // 	}
  // });
}
