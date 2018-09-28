-- MySQL dump 10.13  Distrib 5.7.23, for Win64 (x86_64)
--
-- Host: localhost    Database: bookstore
-- ------------------------------------------------------
-- Server version	5.7.23-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(45) CHARACTER SET latin1 NOT NULL,
  `password` varchar(100) CHARACTER SET latin1 NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'bookstore777','$2b$08$G6pjn2oEAaBpdqET7trrt.uJ093zuFGVdyHdkDL1mLMwbP0huM6C6',NULL,NULL);
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authors` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,'Peter Abelard','2018-09-22 03:25:39','2018-09-22 03:25:39'),(2,'Robert Abernathy ','2018-09-22 03:25:39','2018-09-22 03:25:39'),(3,'Daniel Abraham','2018-09-22 03:25:39','2018-09-22 03:25:39'),(4,'Anna Adams','2018-09-22 03:25:39','2018-09-22 03:25:39'),(5,'Louis Aragon','2018-09-22 03:25:39','2018-09-22 03:25:39'),(6,'Jennifer Archer','2018-09-22 03:25:39','2018-09-22 03:25:39'),(7,'Jay Asher','2018-09-22 03:25:39','2018-09-22 03:25:39'),(8,'Robert Asprin','2018-09-22 03:25:39','2018-09-25 13:21:54'),(15,'Margaret Atwood','2018-09-27 18:26:08','2018-09-27 18:26:08'),(16,'Paulo Coelho','2018-09-27 18:27:28','2018-09-27 18:27:28'),(17,'Chris Voss','2018-09-27 18:27:37','2018-09-27 18:27:37'),(18,'Madeleine L\'Engle','2018-09-27 18:27:46','2018-09-27 18:27:46'),(19,'Phil Knight','2018-09-27 18:30:30','2018-09-27 18:30:30'),(20,'Ann Patchett','2018-09-27 18:30:38','2018-09-27 18:30:38'),(21,'Devin Murphy','2018-09-27 18:30:44','2018-09-27 18:30:44');
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `id_author` int(11) NOT NULL,
  `id_genre` int(11) NOT NULL,
  `image` varchar(45) CHARACTER SET latin1 NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `pubdate` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_books_ba_idx` (`id_author`),
  KEY `fk_books_bg_idx` (`id_genre`),
  CONSTRAINT `fk_books_ba` FOREIGN KEY (`id_author`) REFERENCES `authors` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_books_bg` FOREIGN KEY (`id_genre`) REFERENCES `genres` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Don Quixote',1,2,'/images/books/LsnKwDXc.jpg',NULL,'2018-09-27 19:48:44','2018-08-06'),(2,'Pachinko ',2,3,'/images/books/MRj4zZry.jpg',NULL,'2018-09-27 19:53:51','2018-09-18'),(3,'Nine Perfect Strangers ',6,1,'/images/books/3.jpg',NULL,NULL,'2018-09-01'),(4,'	Fear: Trump in the White House ',4,5,'/images/books/4.jpg',NULL,NULL,'2017-10-27'),(5,'The Silence of the Girls ',1,2,'/images/books/5.jpg',NULL,NULL,'2015-11-22'),(6,'The Storyteller\'s Secret ',2,6,'/images/books/6.jpg',NULL,NULL,'2018-05-05'),(7,'	I Will Never Leave You ',7,4,'/images/books/7.jpg',NULL,NULL,'2018-09-21'),(8,'Transcription ',3,7,'/images/books/8.jpg',NULL,NULL,'2014-04-22'),(9,'Sea Prayer ',8,8,'/images/books/9.jpg',NULL,NULL,'2018-08-22'),(49,'dfgf',1,1,'/images/books/no_photo.jpg','2018-09-26 15:01:48','2018-09-26 15:01:48','2018-09-26'),(50,'The Handmaid\'s Tale',15,21,'/images/books/etJ9I9lR.png','2018-09-27 18:27:04','2018-09-27 18:27:04','2018-09-04'),(51,'Never Split the Difference',17,5,'/images/books/WdjWnP1d.png','2018-09-27 18:28:15','2018-09-27 18:28:15','2018-09-27'),(52,'A Wrinkle in Time Quintet',18,3,'/images/books/9y6v0s9l.png','2018-09-27 18:28:35','2018-09-27 18:28:35','2018-09-27'),(53,'The Alchemist',16,8,'/images/books/tL1gdk1D.png','2018-09-27 18:29:02','2018-09-27 19:42:56','2018-07-31'),(54,'Shoe Dog: A Memoir by the Creator of Nike',19,22,'/images/books/e50cONcw.png','2018-09-27 18:31:20','2018-09-27 18:31:20','2018-09-27'),(55,'Commonwealth',20,20,'/images/books/LsTmNB0n.png','2018-09-27 18:34:26','2018-09-27 18:34:26','2018-07-06'),(56,'The Boat Runner: A Novel',21,7,'/images/books/HHrQy6Hf.png','2018-09-27 18:34:47','2018-09-27 18:34:47','2018-09-27');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genres` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,'Science fiction','2018-09-22 03:25:39','2018-09-25 15:35:49'),(2,'Drama','2018-09-22 03:25:39','2018-09-22 03:25:39'),(3,'Romance','2018-09-22 03:25:39','2018-09-22 03:25:39'),(4,'Horror','2018-09-22 03:25:39','2018-09-22 03:25:39'),(5,'History','2018-09-22 03:25:39','2018-09-22 03:25:39'),(6,'Comics','2018-09-22 03:25:39','2018-09-22 03:25:39'),(7,'Cookbooks','2018-09-22 03:25:39','2018-09-22 03:25:39'),(8,'Fantasy','2018-09-22 03:25:39','2018-09-22 03:25:39'),(20,'Mystery','2018-09-27 18:23:54','2018-09-27 18:23:54'),(21,'Tragedy','2018-09-27 18:24:03','2018-09-27 18:24:03'),(22,'Adventure','2018-09-27 18:24:12','2018-09-27 18:24:12'),(23,'Tragic comedy','2018-09-27 18:24:23','2018-09-27 18:24:23');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(45) CHARACTER SET latin1 NOT NULL,
  `password` varchar(100) CHARACTER SET latin1 NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `forgot_token` varchar(100) CHARACTER SET latin1 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (28,'arkasha9606@gmail.com','$2b$08$G6pjn2oEAaBpdqET7trrt.uJ093zuFGVdyHdkDL1mLMwbP0huM6C6','Arkady','2018-09-22 13:13:41','2018-09-22 06:25:39',NULL),(29,'a1rkasha9606@gmail.com','$2b$08$B.hxoBKgu97wqePe9WQ/R.OZU9Dsz1hVOGSAbDEGoGdXjSOYfCrLa','hgfhgfh','2018-09-22 11:52:13','2018-09-22 11:52:13',NULL),(30,'arkashas9606@gmail.com','$2b$08$FmcoCnJa7HYWm/ec0gmxuepf7RXlEJ2lD.8pD05eaSwAh4MUWy9AK','dsadsa','2018-09-22 12:54:43','2018-09-22 12:54:43',NULL),(31,'ark.origin9606@gmail.com','$2b$08$wiQZEmHozmtr/31hhJ/ZdOId8UaFZUNio5jgp6yJ1pcJ6OI1zrjm.','origin','2018-09-27 18:14:55','2018-09-22 17:56:25','iJbatg5TFb8cyGCCD2VgF2jjCCOYtkkbtGGcVRhEpRnm7oaQOGs8GXuVQh60eBS3'),(32,'liza.tishenko@gmail.com','$2b$08$wFBQailjxxLgNefPZ8lBNOjPVkh0xeNw2Ajsmr1c8YKWM56m39AVW','tester','2018-09-24 15:57:48','2018-09-24 15:53:02','');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-09-27 22:54:44
