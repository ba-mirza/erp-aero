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
  const [fileRows]: any = await pool.query(
    `INSERT INTO files (file_name, extension, mime_type, size, upload_date) VALUES (?, ?, ?, ?, NOW())`,
    [
      file.originalname,
      getExtension(file.originalname),
      file.mimetype,
      file.size,
    ]
  );
  const id = await fileRows.insertId;
  return id;
};

export const getCountFilesDB = async () => {
  const [fileRows] = await pool.query(`SELECT COUNT(*) AS total FROM files`);
  return fileRows;
};

export const getListFilesWithPaginationDB = async (
  page: number,
  list_size: number
) => {
  const [fileRows] = await pool.query(`SELECT * FROM files LIMIT ?, ?`, [
    page,
    list_size,
  ]);
  return fileRows;
};

export const getFileForDownloadDB = async (filename: string, id: string) => {
  const [fileRows] = await pool.query(
    `UPDATE files SET file_name = ? WHERE id = ?`,
    [filename, id]
  );
  return fileRows;
};

export const getFileByIdDB = async (id: string) => {
  const [fileRows]: any = await pool.query(`SELECT * FROM files WHERE id = ?`, [
    id,
  ]);
  const fileId = fileRows[0].id;
  return { fileId, fileRows };
};

export const deleteFileByIdFromDB = async (id: string) => {
  const [fileRow] = await pool.query(`DELETE FROM files WHERE id = ?`, [id]);
  return fileRow;
};

export const createUser = async (
  id: string,
  auth: { token: string; password: string }
) => {
  const [fileRows] = await pool.query(
    `INSERT INTO users (id, _password, token) VALUES (?, ?, ?)`,
    [id, auth.password, auth.token]
  );
  return fileRows;
};

export const getInfo = async (id?: string) => {
  const [fileRows] = await pool.query(`SELECT * FROM users WHERE userId = ?`, [
    id,
  ]);
  return fileRows;
};

export const existingUserDB = async (id: string) => {
  const [fileRows]: any = await pool.query(`SELECT * FROM users WHERE id = ?`, [
    id,
  ]);
  return fileRows;
};

export const getUserBySession = async (session: string) => {
  const [fileRows]: any = await pool.query(
    `SELECT * FROM users WHERE token = ?`,
    [session]
  );
  return fileRows;
};
