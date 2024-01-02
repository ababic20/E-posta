CREATE TABLE `user` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `private_dh_key` TEXT NOT NULL,
  `public_dh_key` TEXT NOT NULL
);

CREATE TABLE `message` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `sender` INT NOT NULL,
  `recipient` INT NOT NULL,
  `read` TINYINT NOT NULL,
  CONSTRAINT `fk_message_user`
    FOREIGN KEY (`sender`)
    REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_message_user1`
    FOREIGN KEY (`recipient`)
    REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);



INSERT INTO `user` (`name`, `last_name`, `email`, `password`, `private_dh_key`, `public_dh_key`)
VALUES ('John', 'Doe', 'test1@gmail.com', '123', 'private_key', 'public_key');
INSERT INTO `user` (`name`, `last_name`, `email`, `password`, `private_dh_key`, `public_dh_key`)
VALUES ('John', 'Doe', 'test2@gmail.com', '123', 'private_key', 'public_key');

-- Assuming user IDs 1, 2, and 3 exist in the 'user' table

-- Inserting three messages
INSERT INTO `message` (`title`, `content`, `sender`, `recipient`, `read`)
VALUES
  ('Hello', 'Hi there!', 1, 2, 0),
  ('Meeting', 'Lets meet tomorrow.', 2, 1, 0),
  ('Important Update', 'Please check the latest update.',1, 2, 0),
  ('Alooo', 'Sta ima', 2, 1, 0);

SELECT * FROM user;

SELECT * FROM message;

DELETE FROM message WHERE id=10

