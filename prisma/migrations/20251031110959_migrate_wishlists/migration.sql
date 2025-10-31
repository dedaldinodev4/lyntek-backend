-- CreateTable
CREATE TABLE `_wishlists` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `_wishlists_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_wishlists_items` (
    `id` VARCHAR(191) NOT NULL,
    `wishlistId` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_wishlists` ADD CONSTRAINT `_wishlists_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `_users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_wishlists_items` ADD CONSTRAINT `_wishlists_items_wishlistId_fkey` FOREIGN KEY (`wishlistId`) REFERENCES `_wishlists`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_wishlists_items` ADD CONSTRAINT `_wishlists_items_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `_products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
