import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { fastify } from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { fastifyCors } from '@fastify/cors'
import { fastifyStatic } from '@fastify/static'
import { fastifyMultipart } from '@fastify/multipart'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'

import { apiRoutes } from './routes.js'

// Define __dirname para módulos ESM
export const __dirname = dirname(fileURLToPath(import.meta.url))
export const BASE_URL = 'http://192.168.0.109:3333'

export const server = fastify().withTypeProvider<ZodTypeProvider>()

server.setValidatorCompiler(validatorCompiler)
server.setSerializerCompiler(serializerCompiler)

server.register(fastifyCors, { origin: '*' })


server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'CONST DIET API',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

server.register(fastifyMultipart)

server.register(fastifyStatic, {
  root: `${__dirname}/uploads`, // Diretório de arquivos estáticos
  prefix: '/uploads/', // Prefixo da URL para acessar os arquivos
})

server.register(apiRoutes)

const start = async () => {
  try {
    await server.listen({ port: 3333, host: '0.0.0.0' })
    
    console.log(`🔥 Server is running on ${BASE_URL} 🔥`)
    console.log(`📘 See the document on ${BASE_URL}/docs 📘`)
  } catch (err) {
    console.log(err)
    server.log.error(err)
    process.exit(1)
  }
}

start()
