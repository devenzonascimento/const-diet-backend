import fs from 'node:fs'
import path from 'node:path'
import { __dirname, BASE_URL } from '@/server.js'
import type { MultipartFile } from '@fastify/multipart'
import type { IFoodRepository } from '@/interfaces/food-repository-interface.js'
import type { Food } from '@/models/food-types.js'

export class FoodUseCase {
  private foodRepository: IFoodRepository

  constructor(foodRepository: IFoodRepository) {
    this.foodRepository = foodRepository
  }

  private async existsFoodWithSameName(foodName: string) {
    const foodWithSameName = await this.foodRepository.findByName(foodName)

    return foodWithSameName !== null
  }

  public async create(food: Food) {
    const existsFoodName = await this.existsFoodWithSameName(food.name)

    if (existsFoodName) {
      throw new Error('This food name already exists')
    }

    return await this.foodRepository.create(food)
  }

  public async update(food: Food) {
    const foodWithSameName = await this.foodRepository.findByName(food.name)

    if (foodWithSameName && foodWithSameName.id !== food.id) {
      throw new Error('This food name already exists')
    }

    return await this.foodRepository.update(food)
  }

  public async imageUpload({
    filename,
    mimetype,
    file,
  }: MultipartFile): Promise<{ success: boolean; imageUrl: string }> {
    if (!mimetype.startsWith('image/')) {
      // return reply
      //   .status(400)
      //   .send({ error: 'Apenas arquivos de imagem são permitidos' })
      throw new Error('Apenas arquivos de imagem são permitidos')
    }

    const uploadDir = path.join(__dirname, 'uploads')

    const filePath = path.join(uploadDir, filename)

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    try {
      const stream = fs.createWriteStream(filePath)
      await file.pipe(stream)

      const imageUrl = `${BASE_URL}/uploads/${filename}`

      return { success: true, imageUrl: imageUrl }
    } catch (error) {
      console.log({ error: error })
      return { success: false, imageUrl: '' }
    }
  }
}
