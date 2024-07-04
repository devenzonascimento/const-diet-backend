/*
  Warnings:

  - The primary key for the `DailyMeal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `routineId` on the `DailyMeal` table. All the data in the column will be lost.
  - The primary key for the `DailyRoutine` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `routineId` on the `DailyRoutine` table. All the data in the column will be lost.
  - Added the required column `dailyRoutineId` to the `DailyMeal` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `DailyRoutine` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "DailyMeal" DROP CONSTRAINT "DailyMeal_routineId_fkey";

-- DropForeignKey
ALTER TABLE "DailyRoutine" DROP CONSTRAINT "DailyRoutine_routineId_fkey";

-- AlterTable
ALTER TABLE "DailyMeal" DROP CONSTRAINT "DailyMeal_pkey",
DROP COLUMN "routineId",
ADD COLUMN     "dailyRoutineId" TEXT NOT NULL,
ADD CONSTRAINT "DailyMeal_pkey" PRIMARY KEY ("dailyRoutineId", "mealId", "time");

-- AlterTable
ALTER TABLE "DailyRoutine" DROP CONSTRAINT "DailyRoutine_pkey",
DROP COLUMN "routineId",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "DailyRoutine_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "RoutineMeal" (
    "routineId" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "RoutineMeal_pkey" PRIMARY KEY ("routineId","mealId","time")
);

-- AddForeignKey
ALTER TABLE "DailyMeal" ADD CONSTRAINT "DailyMeal_dailyRoutineId_fkey" FOREIGN KEY ("dailyRoutineId") REFERENCES "DailyRoutine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineMeal" ADD CONSTRAINT "RoutineMeal_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineMeal" ADD CONSTRAINT "RoutineMeal_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
