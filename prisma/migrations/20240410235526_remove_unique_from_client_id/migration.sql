/*
  Warnings:

  - Added the required column `id` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Subscription_clientId_key` ON `Subscription`;

-- AlterTable
ALTER TABLE `Subscription` ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
