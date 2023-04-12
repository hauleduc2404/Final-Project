/*
  Warnings:

  - You are about to alter the column `readAt` on the `notifications` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `notifications` MODIFY `readAt` DATETIME NULL;
