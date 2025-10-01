-- CreateTable
CREATE TABLE `_products_details` (
    `id` VARCHAR(191) NOT NULL,
    `height` VARCHAR(191) NULL,
    `width` VARCHAR(191) NULL,
    `thickness` VARCHAR(191) NULL,
    `processor` VARCHAR(191) NULL,
    `screen` VARCHAR(191) NULL,
    `operating_system` VARCHAR(191) NULL,
    `ram` VARCHAR(191) NULL,
    `ssd` VARCHAR(191) NULL,
    `ports` VARCHAR(191) NULL,
    `graphic` VARCHAR(191) NULL,
    `back_camera` VARCHAR(191) NULL,
    `front_camera` VARCHAR(191) NULL,
    `battery` VARCHAR(191) NULL,
    `frequency_response` VARCHAR(191) NULL,
    `microphone` BOOLEAN NULL,
    `wireless` BOOLEAN NULL,
    `wireless_standby_time` BOOLEAN NULL,
    `connectionType` VARCHAR(191) NULL,
    `connectors` VARCHAR(191) NULL,
    `bluetooth` VARCHAR(191) NULL,
    `noise_cancelling` VARCHAR(191) NULL,
    `sound_isolating` VARCHAR(191) NULL,
    `warranty` VARCHAR(191) NULL,
    `storage` VARCHAR(191) NULL,
    `productId` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_products_details` ADD CONSTRAINT `_products_details_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `_products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
