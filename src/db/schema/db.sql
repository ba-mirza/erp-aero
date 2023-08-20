CREATE DATABASE erp_aero;
USE erp_aero;

CREATE TABLE files (
  id integer PRIMARY KEY AUTO_INCREMENT,
  title TEXT NOT NULL,
  format TEXT NOT NULL,
  mimetype TEXT NOT NULL,
  size integer,
  date_downloaded DATETIME NOT NULL DEFAULT NOW()
)

INSERT INTO files (title, format, mimetype, size, date_downloaded)
VALUES
("backgrounddesktop", ".png", "backgrounddesktop/png", 143540),


CREATE TABLE users (
  userId integer PRIMARY KEY AUTO_INCREMENT,
  id integer,
  _password TEXT NOT NULL
)
