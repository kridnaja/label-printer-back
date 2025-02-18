/*
  Warnings:

  - You are about to drop the column `Material` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `Material`,
    ADD COLUMN `material` VARCHAR(191) NULL;
