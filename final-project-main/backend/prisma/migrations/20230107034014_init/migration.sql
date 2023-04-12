-- CreateTable
CREATE TABLE `categories` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `course_category` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `course_id` BIGINT NOT NULL,
    `category_id` BIGINT NOT NULL,

    INDEX `course_category_category_id_foreign_idx`(`category_id`),
    INDEX `course_category_course_id_foreign_idx`(`course_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `courses` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(45) NULL,
    `description` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `title` VARCHAR(45) NULL,
    `message` VARCHAR(255) NULL,
    `read_at` DATETIME(0) NULL,
    `created_at` DATETIME(0) NULL,

    INDEX `notifications_user_id_foreign_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `questions` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `course_id` BIGINT NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `desciption` VARCHAR(255) NOT NULL,
    `question` JSON NOT NULL,
    `keys` VARCHAR(100) NOT NULL,

    INDEX `questions_id_foreign_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_course` (
    `user_id` BIGINT NOT NULL,
    `course_id` BIGINT NOT NULL,
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `status` TINYINT NOT NULL,

    INDEX `course_id_idx`(`course_id`),
    INDEX `user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_question` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT NOT NULL,
    `question_id` BIGINT NOT NULL,
    `status` TINYINT NULL,
    `answer` VARCHAR(100) NULL,

    INDEX `user_question_user_id_foreign`(`question_id`),
    INDEX `user_question_user_id_foreign_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `email_verified_at` DATETIME(0) NULL,
    `phone` VARCHAR(45) NULL,
    `password` VARCHAR(255) NULL,
    `remember_token` VARCHAR(100) NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `course_category` ADD CONSTRAINT `course_category_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `course_category` ADD CONSTRAINT `course_category_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `notifications` ADD CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `questions` ADD CONSTRAINT `questions_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_course` ADD CONSTRAINT `user_course_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_course` ADD CONSTRAINT `user_course_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_question` ADD CONSTRAINT `user_question_question_id_foreign` FOREIGN KEY (`question_id`) REFERENCES `questions`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_question` ADD CONSTRAINT `user_question_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
