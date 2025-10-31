-- AlterTable
ALTER TABLE `_orders` ADD COLUMN `couponCode` VARCHAR(191) NULL,
    ADD COLUMN `discountAmount` DOUBLE NULL DEFAULT 0,
    ADD COLUMN `discountType` VARCHAR(191) NULL,
    ADD COLUMN `discountValue` DOUBLE NULL,
    ADD COLUMN `finalTotal` DOUBLE NULL;

-- AlterTable
ALTER TABLE `_products_variants` ADD COLUMN `discountPercent` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `offerExpires_at` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `_coupons` (
    `id` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT 'percent',
    `value` DOUBLE NOT NULL,
    `minValue` DOUBLE NOT NULL DEFAULT 0,
    `expires_at` DATETIME(3) NOT NULL,
    `usage_limit` INTEGER NULL,
    `perUser_limit` INTEGER NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `description` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `_coupons_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_coupon_usages` (
    `id` VARCHAR(191) NOT NULL,
    `couponId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `count` INTEGER NOT NULL DEFAULT 1,
    `last_used` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `_coupon_usages_couponId_userId_key`(`couponId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_coupon_usages` ADD CONSTRAINT `_coupon_usages_couponId_fkey` FOREIGN KEY (`couponId`) REFERENCES `_coupons`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
