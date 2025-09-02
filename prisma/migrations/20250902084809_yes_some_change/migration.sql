-- DropIndex
DROP INDEX `conversation_person_key` ON `conversation`;

-- AlterTable
ALTER TABLE `enrollclass` ADD COLUMN `sessionkey` VARCHAR(191) NULL,
    ADD COLUMN `type` ENUM('stripe', 'sslcommerze', 'paypal', 'razorpay') NOT NULL DEFAULT 'sslcommerze';
