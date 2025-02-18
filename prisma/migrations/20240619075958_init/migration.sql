-- AlterTable
ALTER TABLE `order` ADD COLUMN `Material` VARCHAR(191) NULL,
    ADD COLUMN `customerName` VARCHAR(191) NULL,
    ADD COLUMN `homeOrOffice` VARCHAR(191) NULL,
    ADD COLUMN `receiverAddress` INTEGER NULL,
    ADD COLUMN `receiverName` VARCHAR(191) NULL,
    ADD COLUMN `telephoneNumber` INTEGER NULL;
