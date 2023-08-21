import mysql from "mysql2";

import dotenv from "dotenv";
dotenv.config();

import { getExtension } from "../helpers";

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export const uploadFileToDB = async (file: any) => {
  // FIX THIS TYPEOF ANY
  const [fileRow]: any = await pool.query(
    `INSERT INTO files (file_name, extension, mime_type, size, upload_date) VALUES (?, ?, ?, ?, NOW())`,
    [
      file.originalname,
      getExtension(file.originalname),
      file.mimetype,
      file.size,
    ]
  );
  const id = await fileRow.insertId;
  return id;
};

export const getFileForDownloadDB = async (filename: string, id: string) => {
  const [fileRow] = await pool.query(
    `UPDATE files SET file_name = ? WHERE id = ?`,
    [filename, id]
  );
  return fileRow;
};

export const getFileByIdDB = async (id: string) => {
  const [fileRow]: any = await pool.query(`SELECT * FROM files WHERE id = ?`, [
    id,
  ]);
  const fileId = fileRow[0].id;
  return { fileId, fileRow };
};

export const deleteFileByIdFromDB = async (id: string) => {
  const [fileRow] = await pool.query(`DELETE FROM files WHERE id = ?`, [id]);
  return fileRow;
};

export const createUser = async (id: string, auth: any) => {
  const [fileRow] = await pool.query(
    `INSERT INTO users (id, _password) VALUES (?, ?)`,
    [id, auth.password]
  );
};

export const getInfo = async () => {
  const [fileRow] = await pool.query(`SELECT * FROM users WHERE userId = 1`);
  return fileRow;
};
