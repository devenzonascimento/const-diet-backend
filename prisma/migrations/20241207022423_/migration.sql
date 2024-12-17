-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'COMPLETED', 'MISSED');

-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('GRAMS', 'MILILITERS');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER,
    "height" INTEGER,
    "weight" DOUBLE PRECISION,
    "sex" TEXT,
    "activityLevel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyRoutine" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "mealsStatus" JSONB,
    "planId" INTEGER NOT NULL,
    "routineId" INTEGER NOT NULL,

    CONSTRAINT "DailyRoutine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Routine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "water" INTEGER NOT NULL DEFAULT 0,
    "calories" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "carbohydrates" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "proteins" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fats" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fibers" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sodium" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Routine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoutineMeal" (
    "routineId" INTEGER NOT NULL,
    "mealId" INTEGER NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "RoutineMeal_pkey" PRIMARY KEY ("routineId","mealId","time")
);

-- CreateTable
CREATE TABLE "Meal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "calories" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "carbohydrates" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "proteins" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fats" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fibers" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sodium" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Meal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealFood" (
    "mealId" INTEGER NOT NULL,
    "foodId" INTEGER NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "MealFood_pkey" PRIMARY KEY ("mealId","foodId")
);

-- CreateTable
CREATE TABLE "Food" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "unit" "Unit" NOT NULL DEFAULT 'GRAMS',
    "calories" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "carbohydrates" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "proteins" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fats" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fibers" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sodium" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyRoutine" ADD CONSTRAINT "DailyRoutine_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyRoutine" ADD CONSTRAINT "DailyRoutine_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Routine" ADD CONSTRAINT "Routine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineMeal" ADD CONSTRAINT "RoutineMeal_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoutineMeal" ADD CONSTRAINT "RoutineMeal_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meal" ADD CONSTRAINT "Meal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealFood" ADD CONSTRAINT "MealFood_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealFood" ADD CONSTRAINT "MealFood_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
