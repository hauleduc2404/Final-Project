/*
  Warnings:

  - You are about to alter the column `readAt` on the `notifications` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `isRegisterd` on the `user_courses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `notifications` MODIFY `readAt` DATETIME NULL;

-- AlterTable
ALTER TABLE `user_courses` DROP COLUMN `isRegisterd`,
    ADD COLUMN `isRegistered` BOOLEAN NULL,
    MODIFY `status` TINYINT NOT NULL DEFAULT 0,
    MODIFY `isBookmarked` BOOLEAN NULL;
