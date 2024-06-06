export interface Food {
  id: string;
  name: string;
  calories: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
  sodiums: number;
  fibers: number;
}

export interface FoodCreate {
  userId: string;
  name: string;
  calories: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
  sodiums: number;
  fibers: number;
}

export interface FoodUpdate {
  name: string;
  calories: number;
  carbohydrates: number;
  proteins: number;
  fats: number;
  sodiums: number;
  fibers: number;
}

export interface FoodRepository {
  create(data: FoodCreate): Promise<Food>;
  findById(foodId: string): Promise<Food | null>;
  findByName(userId: string, foodName: string): Promise<Food | null>;
  getAllFoods(foodId: string): Promise<Food[]>;
  update(foodId: string, data: FoodUpdate): Promise<Food>;
  delete(foodId: string): Promise<Food>;
}
