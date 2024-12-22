import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { fastifyMultipart } from '@fastify/multipart'
import { fastifyStatic } from '@fastify/static'

import { authRoutes } from '@/routes/auth-route.js'
import { userRoutes } from '@/routes/user-route.js'
import { foodRoutes } from '@/routes/food-route.js'
import { mealRoutes } from '@/routes/meal-route.js'
import { routineRoutes } from '@/routes/routine-route.js'
import { planRoutes } from '@/routes/plan-route.js'
import { dailyRoutineRoutes } from '@/routes/daily-routine-route.js'

// Define __dirname para módulos ESM
export const __dirname = dirname(fileURLToPath(import.meta.url))
export const BASE_URL = 'http://192.168.0.109:3333'

export const server = fastify()

server.register(fastifyCors, {
  origin: true,
})

server.register(fastifyMultipart)

server.register(fastifyStatic, {
  root: `${__dirname}/uploads`, // Diretório de arquivos estáticos
  prefix: '/uploads/', // Prefixo da URL para acessar os arquivos
})

server.get('/', () => {
  return 'SERVER ON!'
})

server.register(authRoutes, {
  prefix: '/auth',
})

server.register(userRoutes, {
  prefix: '/',
})

server.register(foodRoutes, {
  prefix: '/foods',
})

server.register(mealRoutes, {
  prefix: 'users/:userId/meals',
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

const start = async () => {
  try {
    await server.listen({ port: 3333, host: '0.0.0.0' })
    console.log(`🔥 Server is running on ${BASE_URL} 🔥`)
  } catch (err) {
    console.log(err)
    server.log.error(err)
    process.exit(1)
  }
}

start()
