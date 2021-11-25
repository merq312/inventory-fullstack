/*
  Warnings:

  - A unique constraint covering the columns `[menuItemId,storeId]` on the table `MenuItemsOnStores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MenuItemsOnStores_menuItemId_storeId_key" ON "MenuItemsOnStores"("menuItemId", "storeId");
