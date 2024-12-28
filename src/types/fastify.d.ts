import 'fastify'
import type { User } from '@/models/user-types.ts'

declare module 'fastify' {
  interface FastifyRequest {
    user: User
  }
}
