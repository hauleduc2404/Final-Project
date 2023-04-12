/*
  Warnings:

  - You are about to drop the column `summerization` on the `course_sections` table. All the data in the column will be lost.
  - You are about to alter the column `readAt` on the `notifications` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `summarization` to the `course_sections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `course_sections` DROP COLUMN `summerization`,
    ADD COLUMN `summarization` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `courses` MODIFY `title` VARCHAR(255) NOT NULL,
    MODIFY `slug` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `lectures` MODIFY `content` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `notifications` MODIFY `readAt` DATETIME NULL;
