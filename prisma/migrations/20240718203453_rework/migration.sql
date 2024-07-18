/*
  Warnings:

  - You are about to drop the column `calories` on the `DailyRoutine` table. All the data in the column will be lost.
  - You are about to drop the column `carbohydrates` on the `DailyRoutine` table. All the data in the column will be lost.
  - You are about to drop the column `fats` on the `DailyRoutine` table. All the data in the column will be lost.
  - You are about to drop the column `fibers` on the `DailyRoutine` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `DailyRoutine` table. All the data in the column will be lost.
  - You are about to drop the column `proteins` on the `DailyRoutine` table. All the data in the column will be lost.
  - You are about to drop the column `sodium` on the `DailyRoutine` table. All the data in the column will be lost.
  - You are about to drop the column `water` on the `DailyRoutine` table. All the data in the column will be lost.
  - You are about to drop the `DailyMeal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DailyMealFood` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `routineId` to the `DailyRoutine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DailyMeal" DROP CONSTRAINT "DailyMeal_routineId_fkey";

-- DropForeignKey
ALTER TABLE "DailyMealFood" DROP CONSTRAINT "DailyMealFood_mealId_fkey";

-- AlterTable
ALTER TABLE "DailyRoutine" DROP COLUMN "calories",
DROP COLUMN "carbohydrates",
DROP COLUMN "fats",
DROP COLUMN "fibers",
DROP COLUMN "name",
DROP COLUMN "proteins",
DROP COLUMN "sodium",
DROP COLUMN "water",
ADD COLUMN     "routineId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Routine" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "DailyMeal";

-- DropTable
DROP TABLE "DailyMealFood";

-- AddForeignKey
ALTER TABLE "DailyRoutine" ADD CONSTRAINT "DailyRoutine_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
