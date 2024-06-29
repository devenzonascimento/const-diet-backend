/*
  Warnings:

  - The primary key for the `DailyMeal` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "DailyMeal" DROP CONSTRAINT "DailyMeal_pkey",
ADD CONSTRAINT "DailyMeal_pkey" PRIMARY KEY ("routineId", "mealId", "time");
