/*
  Warnings:

  - The primary key for the `DailyMeal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DailyRoutine` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "DailyMeal" DROP CONSTRAINT "DailyMeal_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "DailyMeal_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "DailyRoutine" DROP CONSTRAINT "DailyRoutine_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "DailyRoutine_pkey" PRIMARY KEY ("id");
