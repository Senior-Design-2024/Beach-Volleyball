CREATE DATABASE flask_app;
USE flask_app;
CREATE TABLE `user`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `user` ADD UNIQUE `user_email_unique`(`email`);
CREATE TABLE `team`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL,
    CONSTRAINT `team_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `user`(`id`) ON DELETE CASCADE
);
ALTER TABLE
    `team` ADD INDEX `team_user_id_index`(`user_id`);
CREATE TABLE `player`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `team_id` BIGINT UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    CONSTRAINT `player_team_id_foreign` FOREIGN KEY(`team_id`) REFERENCES `team`(`id`) ON DELETE CASCADE
);
CREATE TABLE `pair` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `team_id` BIGINT UNSIGNED NOT NULL,
    `player1_id` BIGINT UNSIGNED NOT NULL,
    `player2_id` BIGINT UNSIGNED NOT NULL,
    CONSTRAINT `pair_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`) ON DELETE CASCADE,
    CONSTRAINT `pair_player1_foreign` FOREIGN KEY (`player1_id`) REFERENCES `player` (`id`) ON DELETE CASCADE,
    CONSTRAINT `pair_player2_foreign` FOREIGN KEY (`player2_id`) REFERENCES `player` (`id`) ON DELETE CASCADE
);
CREATE TABLE `match`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `team_id` BIGINT UNSIGNED NOT NULL,
    `player1_id` BIGINT UNSIGNED NOT NULL,
    `player2_id` BIGINT UNSIGNED NOT NULL,
    `pair_id` BIGINT UNSIGNED NOT NULL,
    `opponent1_name` VARCHAR(100),
    `opponent2_name` VARCHAR(100),
    `opponent1_number` INT UNSIGNED,
    `opponent2_number` INT UNSIGNED,
    `venue` VARCHAR(100),
    `tournament` VARCHAR(100),
    `court_number` VARCHAR(100),
    `flight_number` VARCHAR(100),
    `conference` VARCHAR(100),
    `location` VARCHAR(100),
    `match_date` VARCHAR(100),
    `sched_start_time` VARCHAR(100),
    `strategy` VARCHAR(100),
    CONSTRAINT `match_player2_foreign` FOREIGN KEY(`player2_id`) REFERENCES `player`(`id`),
    CONSTRAINT `match_player1_foreign` FOREIGN KEY(`player1_id`) REFERENCES `player`(`id`),
    CONSTRAINT `match_team_id_foreign` FOREIGN KEY(`team_id`) REFERENCES `team`(`id`) ON DELETE CASCADE,
    CONSTRAINT `match_pair_id_foreign` FOREIGN KEY(`pair_id`) REFERENCES `pair`(`id`) ON DELETE CASCADE
);
CREATE TABLE `match_set`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `match_id` BIGINT UNSIGNED NOT NULL,
    `set_num` TINYINT UNSIGNED NOT NULL,
    `win_state` BOOLEAN,
    CONSTRAINT `match_set_match_id_foreign` FOREIGN KEY(`match_id`) REFERENCES `match`(`id`) ON DELETE CASCADE
);
CREATE TABLE `point`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `match_set_id` BIGINT UNSIGNED NOT NULL,
    `win` BOOLEAN NOT NULL,
    CONSTRAINT `point_match_set_id_foreign` FOREIGN KEY (`match_set_id`) REFERENCES `match_set`(`id`) ON DELETE CASCADE
);
CREATE TABLE `event`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `point_id` BIGINT UNSIGNED NOT NULL,
    `data` INT UNSIGNED NOT NULL,
    `e_index` TINYINT UNSIGNED NOT NULL,
    CONSTRAINT `event_point_id_foreign` FOREIGN KEY (`point_id`) REFERENCES `point`(`id`) ON DELETE CASCADE
);