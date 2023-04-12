/*
  Warnings:

  - You are about to alter the column `readAt` on the `notifications` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Made the column `userId` on table `course_reviews` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `course_reviews` DROP FOREIGN KEY `course_reviews_userId_foreign`;

-- AlterTable
ALTER TABLE `course_reviews` ADD COLUMN `title` TEXT NULL,
    MODIFY `userId` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `notifications` MODIFY `readAt` DATETIME NULL;

-- AddForeignKey
ALTER TABLE `course_reviews` ADD CONSTRAINT `course_reviews_userId_foreign` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
