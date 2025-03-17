-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: wedding_music
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `banquet`
--

DROP TABLE IF EXISTS `banquet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banquet` (
  `banquet_id` int NOT NULL AUTO_INCREMENT,
  `entrance_banquet` varchar(255) NOT NULL,
  `type_music` enum('jazz','chillout','instrumental','contemporary') NOT NULL,
  `cuting_cake` varchar(255) DEFAULT NULL,
  `toast` varchar(255) DEFAULT NULL,
  `wedding_wedding_id` int NOT NULL,
  PRIMARY KEY (`banquet_id`,`wedding_wedding_id`),
  KEY `fk_banquet_wedding1_idx` (`wedding_wedding_id`),
  CONSTRAINT `fk_banquet_wedding1` FOREIGN KEY (`wedding_wedding_id`) REFERENCES `wedding` (`wedding_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banquet`
--

LOCK TABLES `banquet` WRITE;
/*!40000 ALTER TABLE `banquet` DISABLE KEYS */;
/*!40000 ALTER TABLE `banquet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ceremony`
--

DROP TABLE IF EXISTS `ceremony`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ceremony` (
  `ceremony_id` int NOT NULL,
  `entrance_spouse_one` varchar(255) NOT NULL,
  `entrance_spouse_two` varchar(255) NOT NULL,
  `end_ceremony` varchar(255) NOT NULL,
  `wedding_wedding_id` int NOT NULL,
  PRIMARY KEY (`ceremony_id`,`wedding_wedding_id`),
  KEY `fk_ceremony_wedding1_idx` (`wedding_wedding_id`),
  CONSTRAINT `fk_ceremony_wedding1` FOREIGN KEY (`wedding_wedding_id`) REFERENCES `wedding` (`wedding_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ceremony`
--

LOCK TABLES `ceremony` WRITE;
/*!40000 ALTER TABLE `ceremony` DISABLE KEYS */;
/*!40000 ALTER TABLE `ceremony` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cocktail`
--

DROP TABLE IF EXISTS `cocktail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cocktail` (
  `cocktail_id` int NOT NULL AUTO_INCREMENT,
  `type_music` enum('jazz','chillout','instrumental') NOT NULL,
  `wedding_wedding_id` int NOT NULL,
  PRIMARY KEY (`cocktail_id`,`wedding_wedding_id`),
  KEY `fk_cocktail_wedding1_idx` (`wedding_wedding_id`),
  CONSTRAINT `fk_cocktail_wedding1` FOREIGN KEY (`wedding_wedding_id`) REFERENCES `wedding` (`wedding_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cocktail`
--

LOCK TABLES `cocktail` WRITE;
/*!40000 ALTER TABLE `cocktail` DISABLE KEYS */;
/*!40000 ALTER TABLE `cocktail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `party`
--

DROP TABLE IF EXISTS `party`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `party` (
  `party_id` int NOT NULL AUTO_INCREMENT,
  `first_dance` varchar(255) DEFAULT NULL,
  `type_music` enum('latin','electrinic','dance','80s90s2000s','rock','free') DEFAULT 'free',
  `song1` varchar(255) DEFAULT NULL,
  `song2` varchar(255) DEFAULT NULL,
  `song3` varchar(255) DEFAULT NULL,
  `song4` varchar(255) DEFAULT NULL,
  `song5` varchar(255) DEFAULT NULL,
  `song6` varchar(255) DEFAULT NULL,
  `song7` varchar(255) DEFAULT NULL,
  `wedding_wedding_id` int NOT NULL,
  PRIMARY KEY (`party_id`,`wedding_wedding_id`),
  KEY `fk_party_wedding_idx` (`wedding_wedding_id`),
  CONSTRAINT `fk_party_wedding` FOREIGN KEY (`wedding_wedding_id`) REFERENCES `wedding` (`wedding_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `party`
--

LOCK TABLES `party` WRITE;
/*!40000 ALTER TABLE `party` DISABLE KEYS */;
/*!40000 ALTER TABLE `party` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarias`
--

DROP TABLE IF EXISTS `usuarias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) NOT NULL,
  `password` varchar(32) NOT NULL,
  `wedding_wedding_id` int NOT NULL,
  PRIMARY KEY (`id`,`wedding_wedding_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_usuarias_wedding1_idx` (`wedding_wedding_id`),
  CONSTRAINT `fk_usuarias_wedding1` FOREIGN KEY (`wedding_wedding_id`) REFERENCES `wedding` (`wedding_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarias`
--

LOCK TABLES `usuarias` WRITE;
/*!40000 ALTER TABLE `usuarias` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wedding`
--

DROP TABLE IF EXISTS `wedding`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wedding` (
  `wedding_id` int NOT NULL AUTO_INCREMENT,
  `localitation` varchar(255) NOT NULL,
  `spouse_one_name` varchar(255) NOT NULL,
  `spouse_two_name` varchar(255) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`wedding_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wedding`
--

LOCK TABLES `wedding` WRITE;
/*!40000 ALTER TABLE `wedding` DISABLE KEYS */;
/*!40000 ALTER TABLE `wedding` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-17 20:03:04
