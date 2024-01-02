CREATE TABLE `user` (
  `id` INT NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `private_dh_key` TEXT NOT NULL,
  `public_dh_key` TEXT NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `message` (
  `id` INT NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `content` TEXT NOT NULL,
  `sender` INT NOT NULL,
  `recipient` INT NOT NULL,
  `read` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
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
