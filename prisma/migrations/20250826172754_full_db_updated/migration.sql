/*
  Warnings:

  - You are about to drop the column `method` on the `_payments` table. All the data in the column will be lost.
  - You are about to drop the column `carrier` on the `_shipments` table. All the data in the column will be lost.
  - Added the required column `methodId` to the `_payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerId` to the `_payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `_payments` DROP COLUMN `method`,
    ADD COLUMN `currency` VARCHAR(191) NOT NULL DEFAULT 'AKZ',
    ADD COLUMN `methodId` VARCHAR(191) NOT NULL,
    ADD COLUMN `providerId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `_shipments` DROP COLUMN `carrier`,
    ADD COLUMN `carrierId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `_payments_providers` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `_payments_providers_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_payments_methods` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `providerId` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_carrier` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `_carrier_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_payments` ADD CONSTRAINT `_payments_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `_payments_providers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_payments` ADD CONSTRAINT `_payments_methodId_fkey` FOREIGN KEY (`methodId`) REFERENCES `_payments_methods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_payments_methods` ADD CONSTRAINT `_payments_methods_providerId_fkey` FOREIGN KEY (`providerId`) REFERENCES `_payments_providers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_shipments` ADD CONSTRAINT `_shipments_carrierId_fkey` FOREIGN KEY (`carrierId`) REFERENCES `_carrier`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
