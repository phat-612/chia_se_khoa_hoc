-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2024 at 10:41 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `online_courses_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Học Front-end', '2024-11-26 09:12:14', '2024-11-26 09:12:14'),
(2, 'Học Back-end', '2024-11-26 09:12:30', '2024-11-26 09:12:30');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `course_url` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`, `description`, `category_id`, `thumbnail_url`, `created_at`, `updated_at`, `course_url`) VALUES
(1, 'Kiến Thức Nhập Môn IT', 'Để theo ngành IT - Phần mềm cần rèn luyện những kỹ năng nào? Bạn đã có sẵn tố chất phù hợp với ngành chưa? Cùng thăm quan các công ty IT và tìm hiểu về văn hóa, tác phong làm việc của ngành này nhé các bạn.\r\n\r\n', 1, 'https://files.fullstack.edu.vn/f8-prod/courses/7.png', '2024-11-26 09:14:40', '2024-11-26 09:14:40', 'https://www.youtube.com/playlist?list=PL_-VfJajZj0WSVCw3lKo2lYifzXekkv6M'),
(2, 'HTML và CSS', 'Để học web Front-end chúng ta luôn bắt đầu với ngôn ngữ HTML và CSS, đây là 2 ngôn ngữ có mặt trong mọi website trên internet. Trong khóa học này F8 sẽ chia sẻ từ những kiến thức cơ bản nhất. Sau khóa học này bạn sẽ tự làm được 2 giao diện websites là The Band và Shopee.', 1, 'https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png', '2024-11-26 09:16:43', '2024-11-26 09:16:43', 'https://www.youtube.com/playlist?list=PL_-VfJajZj0U9nEXa4qyfB4U5ZIYCMPlz'),
(3, 'Lập Trình JavaScript Cơ Bản', 'Học Javascript cơ bản phù hợp cho người chưa từng học lập trình. Với hơn 100 bài học và có bài tập thực hành sau mỗi bài học.', 1, 'https://files.fullstack.edu.vn/f8-prod/courses/1.png', '2024-11-26 09:18:29', '2024-11-26 09:18:29', 'https://www.youtube.com/playlist?list=PL_-VfJajZj0VgpFpEVFzS5Z-lkXtBe-x5'),
(4, 'Lập Trình JavaScript Nâng Cao', 'Hiểu sâu hơn về cách Javascript hoạt động, tìm hiểu về IIFE, closure, reference types, this keyword, bind, call, apply, prototype, ...', 1, 'https://files.fullstack.edu.vn/f8-prod/courses/12.png', '2024-11-26 09:19:48', '2024-11-26 09:19:48', 'https://www.youtube.com/playlist?list=PL_-VfJajZj0U1MSx1IMu13oLJq2nM97ac'),
(5, 'Sử dụng Ubuntu/Linux', 'Sở hữu một Terminal hiện đại, mạnh mẽ trong tùy biến và học cách làm việc với Ubuntu là một bước quan trọng trên con đường trở thành một Web Developer.', 2, 'https://files.fullstack.edu.vn/f8-prod/courses/14/624faac11d109.png', '2024-11-26 09:21:25', '2024-11-26 09:21:25', 'https://www.youtube.com/playlist?list=PL_-VfJajZj0XGfh528VqhlgXUfzw1Y0N7'),
(6, 'Node & ExpressJS', 'Học Back-end với Node & ExpressJS framework, hiểu các khái niệm khi làm Back-end và xây dựng RESTful API cho trang web.', 2, 'https://files.fullstack.edu.vn/f8-prod/courses/6.png', '2024-11-26 09:22:34', '2024-11-26 09:22:34', 'https://www.youtube.com/playlist?list=PL_-VfJajZj0VatBpaXkEHK_UPHL7dW6I3'),
(7, 'Xây Dựng Website với ReactJS', 'Khóa học ReactJS từ cơ bản tới nâng cao, kết quả của khóa học này là bạn có thể làm hầu hết các dự án thường gặp với ReactJS. Cuối khóa học này bạn sẽ sở hữu một dự án giống Tiktok.com, bạn có thể tự tin đi xin việc khi nắm chắc các kiến thức được chia sẻ trong khóa học này.', 1, 'https://files.fullstack.edu.vn/f8-prod/courses/13/13.png', '2024-11-26 09:24:16', '2024-11-26 09:24:16', 'https://www.youtube.com/playlist?list=PL_-VfJajZj0UXjlKfBwFX73usByw3Ph9Q');

-- --------------------------------------------------------

--
-- Table structure for table `enrollments`
--

CREATE TABLE `enrollments` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `enrolled_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `course_id`, `rating`, `comment`, `created_at`, `status`) VALUES
(1, 5, 3, 5, 'Great course, very helpful!', '2024-11-19 17:00:00', 0),
(2, 12, 1, 5, 'Excellent content and instructor.', '2024-11-14 17:00:00', 0),
(3, 8, 4, 4, 'Good, but could use more examples.', '2024-11-17 17:00:00', 0),
(4, 2, 6, 4, 'Average course, needs improvement.', '2024-11-18 17:00:00', 0),
(5, 22, 7, 5, 'Fantastic course, highly recommend!', '2024-11-21 17:00:00', 0),
(6, 11, 2, 3, 'Not bad, but a bit too basic.', '2024-11-15 17:00:00', 0),
(7, 14, 5, 4, 'Well-structured and informative.', '2024-11-20 17:00:00', 0),
(8, 6, 1, 5, 'Loved the detailed explanations!', '2024-11-22 17:00:00', 0),
(9, 19, 3, 4, 'Good content but some sections are confusing.', '2024-11-23 17:00:00', 0),
(10, 3, 4, 5, 'Perfect! Clear and concise.', '2024-11-24 17:00:00', 0),
(11, 25, 7, 5, 'Engaging and practical examples.', '2024-11-19 17:00:00', 0),
(12, 9, 2, 3, 'Could use better visuals.', '2024-11-16 17:00:00', 0),
(13, 1, 5, 4, 'Well done, learned a lot.', '2024-11-17 17:00:00', 0),
(14, 17, 6, 4, 'Interesting but pacing was a bit slow.', '2024-11-18 17:00:00', 0),
(15, 7, 3, 4, 'Good course for beginners.', '2024-11-20 17:00:00', 0),
(16, 4, 1, 4, 'Useful material and clear instructions.', '2024-11-21 17:00:00', 0),
(17, 20, 4, 5, 'Absolutely loved it!', '2024-11-22 17:00:00', 0),
(18, 10, 7, 4, 'Solid course, worth the time.', '2024-11-23 17:00:00', 0),
(19, 23, 6, 4, 'Needs more real-world examples.', '2024-11-24 17:00:00', 0),
(20, 18, 2, 5, 'Great insights and practical advice.', '2024-11-25 17:00:00', 0),
(21, 15, 5, 5, 'Clear content and great examples.', '2024-11-19 17:00:00', 0),
(22, 21, 3, 4, 'Good, but some topics need more depth.', '2024-11-18 17:00:00', 0),
(23, 13, 1, 5, 'Exceptional course, learned a lot!', '2024-11-17 17:00:00', 0),
(24, 2, 6, 3, 'Okay, but needs more interactivity.', '2024-11-21 17:00:00', 0),
(25, 8, 7, 5, 'Very engaging and well-explained.', '2024-11-23 17:00:00', 0),
(26, 24, 4, 4, 'Nice course, good for beginners.', '2024-11-20 17:00:00', 0),
(27, 5, 2, 4, 'Decent course, but lacks advanced content.', '2024-11-24 17:00:00', 0),
(28, 19, 6, 4, 'Comprehensive and easy to follow.', '2024-11-22 17:00:00', 0),
(29, 16, 7, 4, 'Well-structured, but could use more examples.', '2024-11-19 17:00:00', 0),
(30, 9, 1, 5, 'Outstanding! Highly recommend it.', '2024-11-25 17:00:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fullname` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `role`, `created_at`, `updated_at`, `fullname`) VALUES
(1, 'bp', '$2b$10$cG.zk6UmC9uRynVM5BKsnuMLBjM3.QZ6Y0ZVBESGNlOaoQ2L7tD3m', 'lalala@gmail.com', 'admin', '2024-11-26 09:07:17', '2024-11-26 09:07:33', 'Bich Phuong'),
(2, 'user2', '$2b$10$examplepasswordhash1', 'user2@example.com', 'user', '2024-11-23 08:10:00', '2024-11-23 08:10:30', 'Nguyen Van A'),
(3, 'user3', '$2b$10$examplepasswordhash2', 'user3@example.com', 'user', '2024-11-23 08:11:00', '2024-11-23 08:11:30', 'Tran Thi B'),
(4, 'user4', '$2b$10$examplepasswordhash3', 'user4@example.com', 'user', '2024-11-23 08:12:00', '2024-11-23 08:12:30', 'Le Van C'),
(5, 'user5', '$2b$10$examplepasswordhash4', 'user5@example.com', 'user', '2024-11-23 08:13:00', '2024-11-23 08:13:30', 'Pham Thi D'),
(6, 'user6', '$2b$10$examplepasswordhash5', 'user6@example.com', 'user', '2024-11-23 08:14:00', '2024-11-23 08:14:30', 'Hoang Van E'),
(7, 'user7', '$2b$10$examplepasswordhash6', 'user7@example.com', 'user', '2024-11-23 08:15:00', '2024-11-23 08:15:30', 'Do Thi F'),
(8, 'user8', '$2b$10$examplepasswordhash7', 'user8@example.com', 'user', '2024-11-23 08:16:00', '2024-11-23 08:16:30', 'Nguyen Van G'),
(9, 'user9', '$2b$10$examplepasswordhash8', 'user9@example.com', 'user', '2024-11-23 08:17:00', '2024-11-23 08:17:30', 'Tran Thi H'),
(10, 'user10', '$2b$10$examplepasswordhash9', 'user10@example.com', 'user', '2024-11-23 08:18:00', '2024-11-23 08:18:30', 'Le Van I'),
(11, 'user11', '$2b$10$examplepasswordhash10', 'user11@example.com', 'admin', '2024-11-23 08:19:00', '2024-11-23 08:19:30', 'Pham Thi J'),
(12, 'user12', '$2b$10$examplepasswordhash11', 'user12@example.com', 'admin', '2024-11-23 08:20:00', '2024-11-23 08:20:30', 'Hoang Van K'),
(13, 'user13', '$2b$10$examplepasswordhash12', 'user13@example.com', 'user', '2024-11-23 08:21:00', '2024-11-23 08:21:30', 'Do Thi L'),
(14, 'user14', '$2b$10$examplepasswordhash13', 'user14@example.com', 'user', '2024-11-23 08:22:00', '2024-11-23 08:22:30', 'Nguyen Van M'),
(15, 'user15', '$2b$10$examplepasswordhash14', 'user15@example.com', 'admin', '2024-11-23 08:23:00', '2024-11-23 08:23:30', 'Tran Thi N'),
(16, 'user16', '$2b$10$examplepasswordhash15', 'user16@example.com', 'user', '2024-11-23 08:24:00', '2024-11-23 08:24:30', 'Le Van O'),
(17, 'user17', '$2b$10$examplepasswordhash16', 'user17@example.com', 'user', '2024-11-23 08:25:00', '2024-11-23 08:25:30', 'Pham Thi P'),
(18, 'user18', '$2b$10$examplepasswordhash17', 'user18@example.com', 'user', '2024-11-23 08:26:00', '2024-11-23 08:26:30', 'Hoang Van Q'),
(19, 'user19', '$2b$10$examplepasswordhash18', 'user19@example.com', 'admin', '2024-11-23 08:27:00', '2024-11-23 08:27:30', 'Do Thi R'),
(20, 'user20', '$2b$10$examplepasswordhash19', 'user20@example.com', 'user', '2024-11-23 08:28:00', '2024-11-23 08:28:30', 'Nguyen Van S'),
(21, 'user21', '$2b$10$examplepasswordhash20', 'user21@example.com', 'user', '2024-11-23 08:29:00', '2024-11-23 08:29:30', 'Tran Thi T'),
(22, 'user22', '$2b$10$examplepasswordhash21', 'user22@example.com', 'user', '2024-11-23 08:30:00', '2024-11-23 08:30:30', 'Le Thi U'),
(23, 'user23', '$2b$10$examplepasswordhash22', 'user23@example.com', 'user', '2024-11-23 08:31:00', '2024-11-23 08:31:30', 'Pham Van V'),
(24, 'user24', '$2b$10$examplepasswordhash23', 'user24@example.com', 'admin', '2024-11-23 08:32:00', '2024-11-23 08:32:30', 'Nguyen Thi W'),
(25, 'user25', '$2b$10$examplepasswordhash24', 'user25@example.com', 'user', '2024-11-23 08:33:00', '2024-11-23 08:33:30', 'Hoang Van X'),
(26, 'user26', '$2b$10$examplepasswordhash25', 'user26@example.com', 'user', '2024-11-23 08:34:00', '2024-11-23 08:34:30', 'Tran Thi Y');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Constraints for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
