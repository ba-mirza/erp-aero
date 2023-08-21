CREATE DATABASE erp_aero;
USE erp_aero;

CREATE TABLE files (
  id INT PRIMARY KEY AUTO_INCREMENT,
  file_name VARCHAR(255) NOT NULL,
  extension VARCHAR(20) NOT NULL,
  mime_type VARCHAR(255),
  size INT,
  upload_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO files (file_name, extension, mime_type, size, upload_date)
VALUES
("desktop", "png", "backgrounddesktop/png", 143540, NOW());


CREATE TABLE users (
  userId INT PRIMARY KEY AUTO_INCREMENT,
  id VARCHAR(255) NOT NULL,
  _password VARCHAR(255) NOT NULL
);

INSERT INTO users (id, _password)
VALUES
("admin", "admin");
