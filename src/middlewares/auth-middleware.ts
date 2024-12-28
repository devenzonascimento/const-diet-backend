import jwt from 'jsonwebtoken'
import { UserRepository } from '@/repositories/user-repository.js'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { User } from '@/models/user-types.js'

export const authMiddleware = async (
  req: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    if (!req.headers.authorization) {
      throw new Error('Authorization header is required')
    }

    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      throw new Error('Token is required')
    }

    const JWT_SECRET = process.env.JWT_SECRET
    if (!JWT_SECRET) {
      throw new Error('JWT Secret is not defined.')
    }

    const decoded = jwt.verify(token, JWT_SECRET) as User
    if (!decoded) {
      throw new Error('Invalid token')
    }

    const userRepository = new UserRepository()

    const user = await userRepository.findById(decoded.id)

    req.user = user
  } catch (error) {
    reply.code(401).send({
      message: error.message,
    })
  }
}
