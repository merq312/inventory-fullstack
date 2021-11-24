/*
  Warnings:

  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "role" TEXT,
ADD COLUMN     "username" TEXT;

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnStores" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "storeId" INTEGER NOT NULL,

    CONSTRAINT "UsersOnStores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "MenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuItemsOnStores" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION,
    "menuItemId" INTEGER NOT NULL,
    "storeId" INTEGER NOT NULL,

    CONSTRAINT "MenuItemsOnStores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCount" (
    "id" SERIAL NOT NULL,
    "day" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "overnightCount" INTEGER NOT NULL DEFAULT 0,
    "morningCount" INTEGER NOT NULL DEFAULT 0,
    "afternoonCount" INTEGER NOT NULL DEFAULT 0,
    "leftoverCountOne" INTEGER NOT NULL DEFAULT 0,
    "leftoverCountTwo" INTEGER NOT NULL DEFAULT 0,
    "menuItemOnStoreId" INTEGER NOT NULL,

    CONSTRAINT "ProductCount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_name_key" ON "Store"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MenuItem_name_key" ON "MenuItem"("name");

-- AddForeignKey
ALTER TABLE "UsersOnStores" ADD CONSTRAINT "UsersOnStores_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnStores" ADD CONSTRAINT "UsersOnStores_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItemsOnStores" ADD CONSTRAINT "MenuItemsOnStores_menuItemId_fkey" FOREIGN KEY ("menuItemId") REFERENCES "MenuItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItemsOnStores" ADD CONSTRAINT "MenuItemsOnStores_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCount" ADD CONSTRAINT "ProductCount_menuItemOnStoreId_fkey" FOREIGN KEY ("menuItemOnStoreId") REFERENCES "MenuItemsOnStores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
