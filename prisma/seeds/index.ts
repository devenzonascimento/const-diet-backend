import * as FoodsSeed from "./seed-of-foods"
import * as MealsSeed from "./seed-of-meals"
import * as RoutinesSeed from "./seed-of-routines"

async function startSeed() {
  await FoodsSeed.startSeed()
  await MealsSeed.startSeed()
  await RoutinesSeed.startSeed()
}

startSeed()

