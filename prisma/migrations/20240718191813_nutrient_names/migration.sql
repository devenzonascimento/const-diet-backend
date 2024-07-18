/*
  Warnings:

  - You are about to drop the column `totalCalories` on the `DailyMeal` table. All the data in the column will be lost.
  - You are about to drop the column `totalCarbohydrates` on the `DailyMeal` table. All the data in the column will be lost.
  - You are about to drop the column `totalFats` on the `DailyMeal` table. All the data in the column will be lost.
  - You are about to drop the column `totalFibers` on the `DailyMeal` table. All the data in the column will be lost.
  - You are about to drop the column `totalProteins` on the `DailyMeal` table. All the data in the column will be lost.
  - You are about to drop the column `totalSodiums` on the `DailyMeal` table. All the data in the column will be lost.
  - You are about to drop the column `sodiums` on the `DailyMealFood` table. All the data in the column will be lost.
  - You are about to drop the column `totalCalories` on the `DailyRoutine` table. All the data in the column will be lost.
  - You are about to drop the column `totalCarbohydrates` on the `DailyRoutine` table. All the data in the column will be lost.
  - You are about to drop the column `totalFats` on the `DailyRoutine` table. All the data in the column will be lost.
  - You are about to drop the column `totalFibers` on the `DailyRoutine` table. All the data in the column will be lost.
  - You are about to drop the column `totalProteins` on the `DailyRoutine` table. All the data in the column will be lost.
  - You are about to drop the column `totalSodiums` on the `DailyRoutine` table. All the data in the column will be lost.
  - You are about to drop the column `sodiums` on the `Food` table. All the data in the column will be lost.
  - You are about to drop the column `totalCalories` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `totalCarbohydrates` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `totalFats` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `totalFibers` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `totalProteins` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `totalSodiums` on the `Meal` table. All the data in the column will be lost.
  - You are about to drop the column `totalCalories` on the `Routine` table. All the data in the column will be lost.
  - You are about to drop the column `totalCarbohydrates` on the `Routine` table. All the data in the column will be lost.
  - You are about to drop the column `totalFats` on the `Routine` table. All the data in the column will be lost.
  - You are about to drop the column `totalFibers` on the `Routine` table. All the data in the column will be lost.
  - You are about to drop the column `totalProteins` on the `Routine` table. All the data in the column will be lost.
  - You are about to drop the column `totalSodiums` on the `Routine` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DailyMeal" DROP COLUMN "totalCalories",
DROP COLUMN "totalCarbohydrates",
DROP COLUMN "totalFats",
DROP COLUMN "totalFibers",
DROP COLUMN "totalProteins",
DROP COLUMN "totalSodiums",
ADD COLUMN     "calories" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "carbohydrates" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "fats" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "fibers" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "proteins" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "sodium" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "DailyMealFood" DROP COLUMN "sodiums",
ADD COLUMN     "sodium" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "calories" SET DEFAULT 0,
ALTER COLUMN "carbohydrates" SET DEFAULT 0,
ALTER COLUMN "proteins" SET DEFAULT 0,
ALTER COLUMN "fats" SET DEFAULT 0,
ALTER COLUMN "fibers" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "DailyRoutine" DROP COLUMN "totalCalories",
DROP COLUMN "totalCarbohydrates",
DROP COLUMN "totalFats",
DROP COLUMN "totalFibers",
DROP COLUMN "totalProteins",
DROP COLUMN "totalSodiums",
ADD COLUMN     "calories" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "carbohydrates" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "fats" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "fibers" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "proteins" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "sodium" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Food" DROP COLUMN "sodiums",
ADD COLUMN     "sodium" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "calories" SET DEFAULT 0,
ALTER COLUMN "carbohydrates" SET DEFAULT 0,
ALTER COLUMN "proteins" SET DEFAULT 0,
ALTER COLUMN "fats" SET DEFAULT 0,
ALTER COLUMN "fibers" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Meal" DROP COLUMN "totalCalories",
DROP COLUMN "totalCarbohydrates",
DROP COLUMN "totalFats",
DROP COLUMN "totalFibers",
DROP COLUMN "totalProteins",
DROP COLUMN "totalSodiums",
ADD COLUMN     "calories" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "carbohydrates" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "fats" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "fibers" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "proteins" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "sodium" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Routine" DROP COLUMN "totalCalories",
DROP COLUMN "totalCarbohydrates",
DROP COLUMN "totalFats",
DROP COLUMN "totalFibers",
DROP COLUMN "totalProteins",
DROP COLUMN "totalSodiums",
ADD COLUMN     "calories" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "carbohydrates" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "fats" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "fibers" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "proteins" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "sodium" DOUBLE PRECISION NOT NULL DEFAULT 0;
