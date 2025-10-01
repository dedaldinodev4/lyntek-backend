/*
  Warnings:

  - You are about to alter the column `bluetooth` on the `_products_details` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.
  - You are about to alter the column `noise_cancelling` on the `_products_details` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.
  - You are about to alter the column `sound_isolating` on the `_products_details` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `_products_details` MODIFY `bluetooth` BOOLEAN NULL,
    MODIFY `noise_cancelling` BOOLEAN NULL,
    MODIFY `sound_isolating` BOOLEAN NULL;
