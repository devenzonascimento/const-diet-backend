export type User = {
  id: number
  name: string
  email: string
  password: string
}

export type UserStats = {
  age?: number
  height?: number
  weight?: number
  sex?: string
  activityLevel?: string
}

export type UserSummary = Omit<User, 'password'> & UserStats
