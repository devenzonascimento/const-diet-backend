import jwt from 'jsonwebtoken'
import { compareSync, hashSync } from 'bcrypt'
import { UserRepository } from '@/repositories/user-repository.js'
import type {
  IUserRepository,
  UserCreate,
  UserLogin,
} from '@/interfaces/user-interface.js'
import type { User } from '@/models/user-types.js'

interface DecodedToken extends jwt.JwtPayload {
  email: string
}

export class UserUseCase {
  private userRepository: IUserRepository

  constructor() {
    this.userRepository = new UserRepository()
  }

  async create({ name, email, password }: UserCreate) {
    const userExists = await this.userRepository.findByEmail(email)

    if (userExists) {
      throw new Error('User already exists.')
    }

    password = hashSync(password, 10)

    const user = await this.userRepository.create({ name, email, password })

    const token = this.createToken(user)

    return { userId: user.id, token }
  }

  async login({ email, password }: UserLogin) {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error('User not found.')
    }

    const isCorrectPassword = compareSync(password, user.password)

    if (!isCorrectPassword) {
      throw new Error('Invalid password.')
    }

    const token = this.createToken(user)

    return { userId: user.id, token }
  }

  createToken(user: Omit<User, 'name'>) {
    const jwtKey = process.env.JWT_KEY
    if (!jwtKey) {
      throw new Error('JWT key is not defined.')
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        password: user.password,
      },
      jwtKey,
      { expiresIn: 60 * 60 * 24 },
    )

    return token
  }

  async verifyToken(token: string) {
    try {
      const jwtKey = process.env.JWT_KEY
      if (!jwtKey) {
        throw new Error('JWT key is not defined.')
      }

      const decodedToken = jwt.verify(token, jwtKey) as DecodedToken

      return await this.userRepository.findByEmail(decodedToken.email)
    } catch (error) {
      console.log(`Error verifying token: ${error}`)
    }
  }

  async refreshToken(token: string) {
    const user = (await this.verifyToken(token)) as User

    const newToken = this.createToken({
      id: user.id,
      email: user.email,
      password: user.password,
    })

    return newToken
  }
}
