-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 22, 2021 at 12:07 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 5.6.37

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eventdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

CREATE TABLE `book` (
  `book_id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `event_id` int(255) NOT NULL,
  `participant` int(255) NOT NULL,
  `book_time` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`book_id`, `user_id`, `event_id`, `participant`, `book_time`, `status`) VALUES
(11, 1, 5, 4, 'Oct 17 2021', 'Booked'),
(12, 1, 8, 10, 'Nov 25 2021', 'Booked'),
(13, 1, 9, 5, 'Nov 26 2021', 'Canceled'),
(14, 1, 10, 8, 'Nov 26 2021', 'Canceled'),
(15, 1, 11, 10, 'Nov 26 2021', 'Canceled');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `cat_id` int(255) NOT NULL,
  `cats_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`cat_id`, `cats_name`) VALUES
(1, 'Online Event'),
(2, 'Offline Event');

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `event_id` int(255) NOT NULL,
  `event_name` varchar(255) NOT NULL,
  `cats_name` varchar(255) NOT NULL,
  `capacity` int(255) NOT NULL,
  `availability` int(255) NOT NULL,
  `booking` int(255) NOT NULL,
  `event_date` varchar(255) NOT NULL,
  `event_time` varchar(255) NOT NULL,
  `venue` varchar(255) NOT NULL,
  `user_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`event_id`, `event_name`, `cats_name`, `capacity`, `availability`, `booking`, `event_date`, `event_time`, `venue`, `user_id`) VALUES
(5, '1st event', 'Online Event', 100, 101, 4, '2021-10-21', '08:00AM', 'online', 1),
(6, '2nd', 'Online Event', 100, 75, 0, '2021-11-14', '02:00PM', 'MET website', 1),
(7, '3rdd event', 'Offline Event', 100, 100, 0, '2021-10-24', '04:00PM', 'MET website', 1),
(8, 'drawing', 'Online Event', 50, 38, 10, '2021-11-30', '03:00PM', 'online', 1),
(9, 'chess ', 'Online Event', 10, 3, 5, '2021-11-26', '04:00PM', 'online', 2),
(10, 'swimming', 'Offline Event', 10, 12, 8, '2021-11-27', '06:00PM', 'virar west', 3),
(11, 'cooking', 'Online Event', 50, 40, 10, '2021-11-26', '01:00PM', 'online', 4);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact` int(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`name`, `email`, `contact`, `password`, `user_id`) VALUES
('admin', 'sayali@gmail.com', 1234567890, 'admin', 1),
('gargi', 'gargi@gmail.com', 2147483647, 'admin', 2),
('sakshi', 'sakshi@gmail.com', 2147483647, 'sakshi', 3),
('meghna', 'meghna@gmail.com', 2147483647, 'meghna', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`book_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `book`
--
ALTER TABLE `book`
  MODIFY `book_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `cat_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `event_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
