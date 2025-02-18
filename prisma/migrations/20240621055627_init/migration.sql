/*
  Warnings:

  - You are about to drop the column `receiverAddress` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `receiverName` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `telephoneNumber` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `receiverAddress`,
    DROP COLUMN `receiverName`,
    DROP COLUMN `telephoneNumber`,
    ADD COLUMN `addressDetails` VARCHAR(191) NULL,
    ADD COLUMN `adminName` VARCHAR(191) NULL;
