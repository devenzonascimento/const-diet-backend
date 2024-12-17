import 'fastify'
import type { User } from '../interfaces/user-interface'

declare module 'fastify' {
  interface FastifyRequest {
    user: User
  }
}
