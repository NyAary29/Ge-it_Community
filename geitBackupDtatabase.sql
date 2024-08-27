-- MySQL dump 10.13  Distrib 8.0.37, for Linux (x86_64)
--
-- Host: localhost    Database: Ge_IT_Community
-- ------------------------------------------------------
-- Server version	8.0.37  http://localhost:3000/Ge_It_Community

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */
;

  http://localhost:3000/Ge_It_Community/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */
;
/*!50503 SET NAMES utf8mb4 */
;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */
;
/*!40103 SET TIME_ZONE='+00:00' */
;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */
;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */
;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */
;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */
;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `admin` (
    `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
    `user_name` varchar(250) DEFAULT NULL,
    `email` varchar(250) DEFAULT NULL,
    `password` varchar(250) DEFAULT NULL,
    `image` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */
;

INSERT INTO
    `admin`
VALUES (
        1,
        'admin',
        'admin@gmail.com',
        'admin',
        ''
    );
/*!40000 ALTER TABLE `admin` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `cours`
--

DROP TABLE IF EXISTS `cours`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `cours` (
    `id_cours` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
    `titre_cours` varchar(255) NOT NULL,
    `description` varchar(255) NOT NULL,
    `heure_total` int NOT NULL,
    `level` varchar(255) NOT NULL,
    `id_prof` int NOT NULL,
    `heure_semaine` int NOT NULL COMMENT 'Heure de cours par semaine',
    `heure_effectue` int NOT NULL DEFAULT '4',
    PRIMARY KEY (`id_cours`),
    KEY `matricule_prof` (`id_prof`),
    CONSTRAINT `matricule_prof` FOREIGN KEY (`id_prof`) REFERENCES `teacher` (`N_matricule`)
) ENGINE = InnoDB AUTO_INCREMENT = 9 DEFAULT CHARSET = latin1;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `cours`
--

LOCK TABLES `cours` WRITE;
/*!40000 ALTER TABLE `cours` DISABLE KEYS */
;

INSERT INTO
    `cours`
VALUES (
        1,
        'Python',
        'Introduction Python',
        40,
        'L2',
        2221,
        4,
        4
    ),
    (
        2,
        'Algorithme',
        'Introduction à L\'agorithme',
        40,
        'L2',
        2222,
        2,
        4
    ),
    (
        4,
        'Cyber Sécurite',
        'Introduction aux Fonctionnements des Ordinateurs et des Réseaux',
        40,
        'l1',
        2223,
        8,
        4
    ),
    (
        6,
        'OS Mobile',
        'Intro au intro',
        40,
        'L2',
        2224,
        2,
        4
    ),
    (
        7,
        'Statistique',
        'Apprendre le statistique de base ',
        40,
        'L2',
        2225,
        4,
        0
    ),
    (
        8,
        'System d\'exploitation',
        'INtroduction au système d\'exploitation (linux,windows)',
        40,
        'L1',
        2223,
        40,
        2
    );
/*!40000 ALTER TABLE `cours` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `events` (
    `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
    `title` varchar(255) NOT NULL COMMENT 'Title of the event',
    `description` text NOT NULL COMMENT 'Description of the event',
    `date` date NOT NULL COMMENT 'Date of the event',
    `location` varchar(255)  NOT NULL COMMENT 'Location of the event',
    `start_hour` time DEFAULT NULL COMMENT 'Beginning of the envent',
    `end_hour` time DEFAULT NULL COMMENT 'Ending of the event',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 56 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */
;

INSERT INTO
    `events`
VALUES (
        23,
        'OS Mobile',
        'Introducing in the android system',
        '2024-05-27',
        'S1',
        '08:00:00',
        '12:00:00'
    ),
    (
        24,
        'Francais',
        'Developpement Personnel',
        '2024-05-27',
        'S3',
        '13:00:00',
        '17:00:00'
    ),
    (
        25,
        'Network Management',
        'Introduction in Network Management',
        '2024-05-28',
        'S1',
        '08:00:00',
        '12:00:00'
    ),
    (
        27,
        'JAVA',
        'Introduction in JAVA Web Programming',
        '2024-05-30',
        'S1',
        '08:00:00',
        '12:00:00'
    ),
    (
        28,
        'Mathematics',
        'Probability & Statistics',
        '2024-05-30',
        'S3',
        '15:00:00',
        '17:00:00'
    ),
    (
        29,
        'Operationnal Search',
        'A Fucking LLM Project',
        '2024-05-31',
        'S3',
        '08:00:00',
        '12:00:00'
    ),
    (
        30,
        'Mathematics',
        'Probability & Statistics',
        '2024-05-31',
        'S3',
        '13:00:00',
        '17:00:00'
    ),
    (
        32,
        'OS mobile',
        'Introducing in the android system',
        '2024-06-03',
        'S1',
        '08:00:00',
        '12:00:00'
    ),
    (
        45,
        'azerty',
        'qsdcf',
        '2024-06-10',
        'sa',
        '08:00:00',
        '12:00:00'
    ),
    (
        46,
        'qsd',
        'scv',
        '2024-06-10',
        'azze',
        '13:00:00',
        '17:00:00'
    ),
    (
        48,
        'Anglais',
        'Daily Routines & others fucking Subjects',
        '2024-05-29',
        'S4',
        '08:00:00',
        '12:00:00'
    ),
    (
        49,
        'Mini Projet',
        'Fanaovana Mini Projettttttt',
        '2024-05-29',
        'S4',
        '13:00:00',
        '17:00:00'
    ),
    (
        51,
        'sdfgh',
        'wxcvb',
        '2024-06-17',
        'sqa',
        '08:00:00',
        '12:00:00'
    ),
    (
        52,
        'Algorithme',
        'wxcv',
        '2024-05-28',
        'wxc',
        '13:00:00',
        '17:00:00'
    );
/*!40000 ALTER TABLE `events` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `student` (
    `N_matricule` int NOT NULL,
    `nom` varchar(250) NOT NULL,
    `prenom` varchar(250) NOT NULL,
    `adresse` varchar(250) NOT NULL,
    `birthday` varchar(255) NOT NULL,
    `tel` int NOT NULL,
    `email` varchar(200) NOT NULL,
    `password` varchar(250) NOT NULL,
    `niveau` varchar(255) NOT NULL,
    `sexe` varchar(255) NOT NULL,
    PRIMARY KEY (`N_matricule`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */
;

INSERT INTO
    `student`
VALUES (
        1111,
        '   nyaary',
        '   manana',
        '   ambatolampy',
        '2024-06-12',
        1234567,
        '      nyaary@gmail.com',
        '      1234sdfsdf',
        'L2',
        'Male'
    ),
    (
        1112,
        '   toky',
        '   milanto',
        ' andoharanofosty',
        '2024-06-18',
        98765,
        '      toky@gmail.com',
        '      1234dsfsd',
        'L2',
        'Male'
    ),
    (
        1113,
        '   Sarobidy',
        '   Rasendra',
        '   mahitsy',
        '2024-06-04',
        2828292,
        '      bidy@gmail.com',
        '      bidysdfsdfs',
        '    L2',
        'Male'
    ),
    (
        2232,
        'Natcha',
        'DAniella',
        'Ambohibao',
        '2024-06-04',
        320323423,
        'heriniavotratoky@gmail.com',
        'qwerty',
        'L2',
        'Female'
    ),
    (
        34567,
        'tahina',
        'qwerty',
        'wertyu',
        '2024-06-28',
        567890,
        'wertyu@wert.com',
        'poiu',
        'L2',
        'Male'
    );
/*!40000 ALTER TABLE `student` ENABLE KEYS */
;

UNLOCK TABLES;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;

CREATE TABLE `teacher` (
    `N_matricule` int NOT NULL,
    `nom` varchar(250) NOT NULL,
    `prenom` varchar(250) NOT NULL,
    `adresse` varchar(250) NOT NULL,
    `grade` varchar(255) NOT NULL,
    `tel` int NOT NULL,
    `email` varchar(200) NOT NULL,
    `password` varchar(250) NOT NULL,
    `specialite` varchar(255) NOT NULL,
    PRIMARY KEY (`N_matricule`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
/*!40101 SET character_set_client = @saved_cs_client */
;

--
-- Dumping data for table `teacher`
--

LOCK TABLES `teacher` WRITE;
/*!40000 ALTER TABLE `teacher` DISABLE KEYS */
;

INSERT INTO
    `teacher`
VALUES (
        2221,
        ' houlder',
        'Baka',
        ' tana',
        'Master',
        22323,
        '  houlder@gmail.com',
        '  dfsdfs',
        'Python'
    ),
    (
        2222,
        'tolotra',
        'tolotra',
        'tana',
        'Master 2',
        434333,
        'tolotra@gmail.com',
        'dsdfsfs',
        'Algorithme'
    ),
    (
        2223,
        'paulson',
        'paulson',
        'Nanisana',
        'Master',
        87877,
        'paulson@gmail.com',
        'dfbksdjfks',
        'Cyber Securite'
    ),
    (
        2224,
        'Arnaud',
        'Arnaud',
        'Tana',
        'Coach',
        230203,
        'arnaud@geit.com',
        'azerty',
        'OS Mobile'
    ),
    (
        2225,
        'Tsito',
        'Aina',
        'Analakely',
        'Master',
        345678901,
        'tsito@geit.com',
        'tsitoooooo',
        'Proba et stat'
    );
/*!40000 ALTER TABLE `teacher` ENABLE KEYS */
;

UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */
;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */
;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */
;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */
;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */
;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */
;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */
;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */
;

-- Dump completed on 2024-08-19 10:39:48