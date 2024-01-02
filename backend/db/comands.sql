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
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_message_user1`
    FOREIGN KEY (`recipient`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);


SELECT * FROM user;

SELECT * FROM message;


DROP TABLE user;
DROP TABLE message;

INSERT INTO `user` (`name`, `last_name`, `email`, `password`, `private_dh_key`, `public_dh_key`)
VALUES ('John', 'Doe', 'test1@gmail.com', '123', 'private_key', 'public_key');
