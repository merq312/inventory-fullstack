/*
  Warnings:

  - A unique constraint covering the columns `[day,menuItemOnStoreId]` on the table `ProductCount` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductCount_day_menuItemOnStoreId_key" ON "ProductCount"("day", "menuItemOnStoreId");
