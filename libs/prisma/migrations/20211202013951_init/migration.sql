-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "role" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

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
    "price" DOUBLE PRECISION NOT NULL,
    "menuItemId" INTEGER NOT NULL,
    "storeId" INTEGER NOT NULL,

    CONSTRAINT "MenuItemsOnStores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCount" (
    "id" SERIAL NOT NULL,
    "day" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
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

-- CreateIndex
CREATE UNIQUE INDEX "MenuItemsOnStores_menuItemId_storeId_key" ON "MenuItemsOnStores"("menuItemId", "storeId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCount_day_menuItemOnStoreId_key" ON "ProductCount"("day", "menuItemOnStoreId");

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
