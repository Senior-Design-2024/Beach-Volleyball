CREATE DATABASE flask_app;
USE flask_app;
CREATE TABLE `team`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL
);
ALTER TABLE
    `team` ADD INDEX `team_user_id_index`(`user_id`);
CREATE TABLE `player`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `team_id` BIGINT UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL
);
CREATE TABLE `match_set`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `match_id` BIGINT UNSIGNED NOT NULL,
    `match_set_data` JSON NOT NULL
);
CREATE TABLE `match`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `team_id` BIGINT UNSIGNED NOT NULL,
    `player1` BIGINT UNSIGNED NOT NULL,
    `player2` BIGINT UNSIGNED NOT NULL,
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
    `match_date` DATE,
    `sched_start_time` TIME,
    `strategy` VARCHAR(100)
);
CREATE TABLE `user`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `user` ADD UNIQUE `user_email_unique`(`email`);
ALTER TABLE
    `match` ADD CONSTRAINT `match_player2_foreign` FOREIGN KEY(`player2`) REFERENCES `player`(`id`);
ALTER TABLE
    `match` ADD CONSTRAINT `match_player1_foreign` FOREIGN KEY(`player1`) REFERENCES `player`(`id`);
ALTER TABLE
    `team` ADD CONSTRAINT `team_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `user`(`id`);
ALTER TABLE
    `player` ADD CONSTRAINT `player_team_id_foreign` FOREIGN KEY(`team_id`) REFERENCES `team`(`id`);
ALTER TABLE
    `match` ADD CONSTRAINT `match_team_id_foreign` FOREIGN KEY(`team_id`) REFERENCES `team`(`id`);
ALTER TABLE
    `match_set` ADD CONSTRAINT `match_set_match_id_foreign` FOREIGN KEY(`match_id`) REFERENCES `match`(`id`);