/*
  Warnings:

  - You are about to drop the column `type` on the `enrollclass` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `enrollclass` DROP COLUMN `type`,
    ADD COLUMN `payment` ENUM('stripe', 'sslcommerze', 'paypal', 'razorpay') NOT NULL DEFAULT 'sslcommerze';

-- CreateTable
CREATE TABLE `purchasePackage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `packageId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `status` ENUM('paid', 'failed', 'pending', 'cancel') NOT NULL DEFAULT 'pending',
    `transactionId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sessionkey` VARCHAR(191) NULL,
    `payment` ENUM('stripe', 'sslcommerze', 'paypal', 'razorpay') NOT NULL DEFAULT 'sslcommerze',

    UNIQUE INDEX `purchasePackage_userId_key`(`userId`),
    UNIQUE INDEX `purchasePackage_transactionId_key`(`transactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `purchasePackage` ADD CONSTRAINT `purchasePackage_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `Package`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `purchasePackage` ADD CONSTRAINT `purchasePackage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
