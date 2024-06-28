/*
  Warnings:

  - You are about to drop the column `scheduledTime` on the `DailyMeal` table. All the data in the column will be lost.
  - Added the required column `time` to the `DailyMeal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DailyMeal" DROP COLUMN "scheduledTime",
ADD COLUMN     "time" TEXT NOT NULL;
