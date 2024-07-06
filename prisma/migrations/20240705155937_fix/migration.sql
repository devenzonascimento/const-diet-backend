/*
  Warnings:

  - You are about to drop the column `mealId` on the `DailyMeal` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "DailyMeal" DROP CONSTRAINT "DailyMeal_mealId_fkey";

-- AlterTable
ALTER TABLE "DailyMeal" DROP COLUMN "mealId";
