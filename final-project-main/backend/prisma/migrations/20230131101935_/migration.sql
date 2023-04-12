/*
  Warnings:

  - You are about to drop the column `created_at` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `read_at` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `notifications` table. All the data in the column will be lost.
  - You are about to drop the column `course_id` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `desciption` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `question` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `email_verified_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `remember_token` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `course_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_question` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[courseSectionId]` on the table `questions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `categories` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `slug` to the `courses` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `courses` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseSectionId` to the `questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prompt` to the `questions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `course_category` DROP FOREIGN KEY `course_category_category_id_foreign`;

-- DropForeignKey
ALTER TABLE `course_category` DROP FOREIGN KEY `course_category_course_id_foreign`;

-- DropForeignKey
ALTER TABLE `notifications` DROP FOREIGN KEY `notifications_user_id_foreign`;

-- DropForeignKey
ALTER TABLE `questions` DROP FOREIGN KEY `questions_course_id_foreign`;

-- DropForeignKey
ALTER TABLE `user_course` DROP FOREIGN KEY `user_course_course_id_foreign`;

-- DropForeignKey
ALTER TABLE `user_course` DROP FOREIGN KEY `user_course_user_id_foreign`;

-- DropForeignKey
ALTER TABLE `user_question` DROP FOREIGN KEY `user_question_question_id_foreign`;

-- DropForeignKey
ALTER TABLE `user_question` DROP FOREIGN KEY `user_question_user_id_foreign`;

-- AlterTable
ALTER TABLE `categories` ADD COLUMN `slug` VARCHAR(255) NOT NULL,
    MODIFY `title` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `courses` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `slug` VARCHAR(45) NOT NULL,
    MODIFY `title` VARCHAR(45) NOT NULL,
    MODIFY `description` TEXT NULL;

-- AlterTable
ALTER TABLE `notifications` DROP COLUMN `created_at`,
    DROP COLUMN `read_at`,
    DROP COLUMN `user_id`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `readAt` DATETIME NULL,
    ADD COLUMN `userId` BIGINT NOT NULL;

-- AlterTable
ALTER TABLE `questions` DROP COLUMN `course_id`,
    DROP COLUMN `desciption`,
    DROP COLUMN `question`,
    DROP COLUMN `title`,
    ADD COLUMN `courseSectionId` BIGINT NOT NULL,
    ADD COLUMN `keysExplanation` TINYTEXT NULL,
    ADD COLUMN `options` TEXT NULL,
    ADD COLUMN `prompt` TEXT NOT NULL,
    ADD COLUMN `type` TINYINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `email_verified_at`,
    DROP COLUMN `remember_token`,
    ADD COLUMN `emailVerifiedAt` DATETIME(0) NULL,
    ADD COLUMN `rememberToken` VARCHAR(100) NULL;

-- DropTable
DROP TABLE `course_category`;

-- DropTable
DROP TABLE `user_course`;

-- DropTable
DROP TABLE `user_question`;

-- CreateTable
CREATE TABLE `course_categories` (
    `courseId` BIGINT NOT NULL,
    `categoryId` BIGINT NOT NULL,

    PRIMARY KEY (`categoryId`, `courseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course_sections` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `order` TINYINT UNSIGNED NULL,
    `courseId` BIGINT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `summerization` VARCHAR(255) NOT NULL,
    `type` TINYINT UNSIGNED NOT NULL,

    INDEX `course_sections_courseId_idx`(`courseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course_reviews` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NULL,
    `courseId` BIGINT NOT NULL,
    `rating` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `review` TEXT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `course_reviews_courseId_idx`(`courseId`),
    INDEX `course_reviews_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lectures` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `courseSectionId` BIGINT NOT NULL,
    `content` TEXT NOT NULL,

    UNIQUE INDEX `courseSectionId_unique`(`courseSectionId`),
    INDEX `lectures_id_idx`(`id`),
    INDEX `lectures_courseSectionId_idx`(`courseSectionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_courses` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `courseId` BIGINT NOT NULL,
    `status` TINYINT NOT NULL,
    `isBookmarked` BOOLEAN NOT NULL,
    `isRegisterd` BOOLEAN NOT NULL,

    INDEX `user_courses_courseId_idx`(`courseId`),
    INDEX `user_courses_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_course_sections` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userCourseId` BIGINT NOT NULL,
    `courseSectionId` BIGINT NOT NULL,
    `isCompleted` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_questions` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `userId` BIGINT NOT NULL,
    `questionId` BIGINT NOT NULL,
    `isCorrect` BOOLEAN NOT NULL,
    `answer` VARCHAR(100) NULL,

    INDEX `user_questions_questionId_idx`(`questionId`),
    INDEX `user_questions_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `categories_slug_key` ON `categories`(`slug`);

-- CreateIndex
CREATE INDEX `notifications_userId_idx` ON `notifications`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `courseSectionId_unique` ON `questions`(`courseSectionId`);

-- CreateIndex
CREATE INDEX `questions_courseSectionId_idx` ON `questions`(`courseSectionId`);

-- AddForeignKey
ALTER TABLE `course_categories` ADD CONSTRAINT `course_categories_categoryId_foreign` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `course_categories` ADD CONSTRAINT `course_categories_courseId_foreign` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `course_sections` ADD CONSTRAINT `course_sections_courseId_foreign` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `course_reviews` ADD CONSTRAINT `course_reviews_userId_foreign` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `course_reviews` ADD CONSTRAINT `course_reviews_courseId_foreign` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_userId_foreign` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `questions` ADD CONSTRAINT `questions_courseSectionId_foreign` FOREIGN KEY (`courseSectionId`) REFERENCES `course_sections`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lectures` ADD CONSTRAINT `lectures_courseSectionId_foreign` FOREIGN KEY (`courseSectionId`) REFERENCES `course_sections`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_courses` ADD CONSTRAINT `user_courses_courseId_foreign` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_courses` ADD CONSTRAINT `user_courses_userId_foreign` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_course_sections` ADD CONSTRAINT `user_course_sections_userCourseId_foreign` FOREIGN KEY (`userCourseId`) REFERENCES `user_courses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_course_sections` ADD CONSTRAINT `user_course_sections_courseId_foreign` FOREIGN KEY (`courseSectionId`) REFERENCES `course_sections`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_questions` ADD CONSTRAINT `user_questions_questionId_foreign` FOREIGN KEY (`questionId`) REFERENCES `questions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_questions` ADD CONSTRAINT `user_questions_userId_foreign` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- RenameIndex
ALTER TABLE `questions` RENAME INDEX `questions_id_foreign_idx` TO `questions_id_idx`;

-- RenameIndex
ALTER TABLE `users` RENAME INDEX `email_UNIQUE` TO `email_unique`;
