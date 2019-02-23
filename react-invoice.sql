-- Adminer 4.6.2 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `client`;
CREATE TABLE `client` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) COLLATE utf8_czech_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8_czech_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8_czech_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_czech_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

INSERT INTO `client` (`id`, `first_name`, `last_name`, `phone`, `email`) VALUES
(1,	'Jan',	'Novák',	'+420 123 456 789',	'jan@novak.cz'),
(2,	'Karel',	'Svoboda',	'+420 333 666 999',	'karel@svoboda.cz'),
(3,	'František',	'Nový',	'+420 555 888 777',	'frantisek@novy.cz');

DROP TABLE IF EXISTS `invoice`;
CREATE TABLE `invoice` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_client` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_client` (`id_client`),
  CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `client` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

INSERT INTO `invoice` (`id`, `id_client`) VALUES
(57,	1),
(58,	1),
(55,	2);

DROP TABLE IF EXISTS `invoice_item`;
CREATE TABLE `invoice_item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `invoice_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_czech_ci NOT NULL,
  `count` int(11) NOT NULL,
  `price_without_tax` decimal(10,0) NOT NULL,
  `price_with_tax` decimal(10,0) NOT NULL,
  `tax_percent` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `invoice_id` (`invoice_id`),
  CONSTRAINT `invoice_item_ibfk_1` FOREIGN KEY (`invoice_id`) REFERENCES `invoice` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_czech_ci;

INSERT INTO `invoice_item` (`id`, `invoice_id`, `name`, `count`, `price_without_tax`, `price_with_tax`, `tax_percent`) VALUES
(31,	55,	'rtservis',	100,	456,	0,	21),
(33,	57,	'dfsa',	100,	456,	0,	15),
(34,	58,	'dfsa',	100,	456,	0,	15);

-- 2019-02-23 17:23:56
