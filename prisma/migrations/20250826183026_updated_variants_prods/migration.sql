/*
  Warnings:

  - You are about to drop the `_variants` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_variants` DROP FOREIGN KEY `_variants_productId_fkey`;

-- DropTable
DROP TABLE `_variants`;

-- CreateTable
CREATE TABLE `_products_variants` (
    `id` VARCHAR(191) NOT NULL,
    `sku` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `stock` INTEGER NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'AKZ',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `_products_variants_sku_key`(`sku`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_products_variants` ADD CONSTRAINT `_products_variants_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `_products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
