/*
  Warnings:

  - The primary key for the `DailyMeal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `dailyRoutineId` on the `DailyMeal` table. All the data in the column will be lost.
  - The required column `id` was added to the `DailyMeal` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `name` to the `DailyMeal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `routineId` to the `DailyMeal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `DailyRoutine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DailyMeal" DROP CONSTRAINT "DailyMeal_dailyRoutineId_fkey";

-- DropForeignKey
ALTER TABLE "DailyMeal" DROP CONSTRAINT "DailyMeal_mealId_fkey";

-- AlterTable
ALTER TABLE "DailyMeal" DROP CONSTRAINT "DailyMeal_pkey",
DROP COLUMN "dailyRoutineId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "routineId" TEXT NOT NULL,
ADD COLUMN     "totalCalories" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalCarbohydrates" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalFats" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalFibers" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalProteins" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalSodiums" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "mealId" DROP NOT NULL,
ADD CONSTRAINT "DailyMeal_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "DailyRoutine" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "totalCalories" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalCarbohydrates" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalFats" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalFibers" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalProteins" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "totalSodiums" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "water" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "DailyMealFood" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unit" "Unit" NOT NULL DEFAULT 'GRAMS',
    "calories" DOUBLE PRECISION NOT NULL,
    "carbohydrates" DOUBLE PRECISION NOT NULL,
    "proteins" DOUBLE PRECISION NOT NULL,
    "fats" DOUBLE PRECISION NOT NULL,
    "sodiums" DOUBLE PRECISION NOT NULL,
    "fibers" DOUBLE PRECISION NOT NULL,
    "mealId" TEXT NOT NULL,

    CONSTRAINT "DailyMealFood_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DailyMeal" ADD CONSTRAINT "DailyMeal_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "DailyRoutine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyMeal" ADD CONSTRAINT "DailyMeal_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyMealFood" ADD CONSTRAINT "DailyMealFood_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "DailyMeal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
