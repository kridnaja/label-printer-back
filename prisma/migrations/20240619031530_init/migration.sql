-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `artWork` VARCHAR(191) NULL,
    `sku` INTEGER NULL,
    `customerNumber` INTEGER NULL,
    `deliveryMethod` VARCHAR(191) NULL,
    `addedTime` VARCHAR(191) NULL,
    `quantity` INTEGER NULL,
    `status` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
