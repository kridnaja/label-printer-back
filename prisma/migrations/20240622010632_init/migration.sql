/*
  Warnings:

  - You are about to drop the column `addedTime` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `addressDetails` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `adminName` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `artWork` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `customerNumber` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `deliveryMethod` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `homeOrOffice` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `material` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `printStatus` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `addedTime`,
    DROP COLUMN `addressDetails`,
    DROP COLUMN `adminName`,
    DROP COLUMN `artWork`,
    DROP COLUMN `customerName`,
    DROP COLUMN `customerNumber`,
    DROP COLUMN `deliveryMethod`,
    DROP COLUMN `homeOrOffice`,
    DROP COLUMN `material`,
    DROP COLUMN `printStatus`,
    DROP COLUMN `quantity`,
    DROP COLUMN `sku`,
    DROP COLUMN `status`,
    ADD COLUMN `Address` VARCHAR(191) NULL,
    ADD COLUMN `Address_Details` VARCHAR(191) NULL,
    ADD COLUMN `Administrator` VARCHAR(191) NULL,
    ADD COLUMN `CustomerAdded_Time` VARCHAR(191) NULL,
    ADD COLUMN `CustomerCustomer_Code` VARCHAR(191) NULL,
    ADD COLUMN `Delivery_Method` VARCHAR(191) NULL,
    ADD COLUMN `Material` VARCHAR(191) NULL,
    ADD COLUMN `PrintStatus` BOOLEAN NULL,
    ADD COLUMN `Quantity` INTEGER NULL,
    ADD COLUMN `SKU` INTEGER NULL,
    ADD COLUMN `SKUArtwork_Preview` VARCHAR(191) NULL,
    ADD COLUMN `Status` VARCHAR(191) NULL;
