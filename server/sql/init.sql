CREATE DATABASE IF NOT EXISTS `aos_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `aos_db`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nama` VARCHAR(100) NOT NULL,
  `nim` VARCHAR(50) NOT NULL UNIQUE,
  `angkatan` VARCHAR(10) NOT NULL,
  `prodi` VARCHAR(100) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `ktm_path` VARCHAR(255),
  `role` ENUM('admin','user') NOT NULL DEFAULT 'user',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed admin user (password: password)
INSERT INTO users (nama, nim, angkatan, prodi, password_hash, role)
SELECT 'Admin', 'ADM001', '2020', 'Sistem Informasi', '$2a$10$Sg8vj3t8xwJqA1M3y1y8OuM6V7i6a3Yv3mct8oJwA5ZkW78m9fN0W', 'admin'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE nim = 'ADM001');


