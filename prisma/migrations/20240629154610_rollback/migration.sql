/*
  Warnings:

  - The primary key for the `DailyMeal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `DailyMeal` table. All the data in the column will be lost.
  - The primary key for the `DailyRoutine` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `DailyRoutine` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DailyMeal" DROP CONSTRAINT "DailyMeal_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "DailyMeal_pkey" PRIMARY KEY ("routineId", "mealId", "time");

-- AlterTable
ALTER TABLE "DailyRoutine" DROP CONSTRAINT "DailyRoutine_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "DailyRoutine_pkey" PRIMARY KEY ("planId", "routineId");
