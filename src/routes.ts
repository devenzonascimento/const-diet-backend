import type { FastifyInstance } from 'fastify'
import { authRoutes } from '@/routes/auth-route.js'
import { userRoutes } from '@/routes/user-route.js'
// import { foodRoutes } from '@/routes/food-route.js'
import { mealRoutes } from '@/routes/meal-route.js'
import { routineRoutes } from '@/routes/routine-route.js'
import { planRoutes } from '@/routes/plan-route.js'
import { dailyRoutineRoutes } from '@/routes/daily-routine-route.js'

import { foodController } from './controllers/food-controller.js'

export const apiRoutes = async (server: FastifyInstance) => {
  server.get('/', () => {
    return 'SERVER ON!'
  })

  server.register(authRoutes, {
    prefix: '/auth',
  })

  server.register(userRoutes, {
    prefix: '/',
  })

  server.register(foodController, { prefix: '/foods' })

  server.register(mealRoutes, {
    prefix: 'meals',
  })

  server.register(routineRoutes, {
    prefix: 'users/:userId/routines',
  })

  server.register(planRoutes, {
    prefix: 'users/:userId/plans',
  })

  server.register(dailyRoutineRoutes, {
    prefix: 'users/:userId/daily-routines',
  })
}
