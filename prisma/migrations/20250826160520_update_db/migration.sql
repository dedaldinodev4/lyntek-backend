/*
  Warnings:

  - You are about to drop the column `brand` on the `_products` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `_products` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `_products` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `_products` table. All the data in the column will be lost.
  - Added the required column `brandId` to the `_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `_categories` ADD COLUMN `cover` VARCHAR(191) NULL,
    ADD COLUMN `slug` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `_products` DROP COLUMN `brand`,
    DROP COLUMN `description`,
    DROP COLUMN `price`,
    DROP COLUMN `stock`,
    ADD COLUMN `brandId` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `_variants` (
    `id` VARCHAR(191) NOT NULL,
    `sku` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `stock` INTEGER NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `currency` VARCHAR(191) NOT NULL DEFAULT 'AKZ',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `_variants_sku_key`(`sku`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_brands` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `_brands_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_products` ADD CONSTRAINT `_products_brandId_fkey` FOREIGN KEY (`brandId`) REFERENCES `_brands`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_variants` ADD CONSTRAINT `_variants_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `_products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
