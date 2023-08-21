import express from "express";
import multer from "multer";

import {
  getFile,
  getFileForDownload,
  getListFiles,
  uploadFile,
  deleteFileById,
  updateFileById,
} from "../controllers/file";
import { fileStorageEngine } from "../helpers";

import { isAuthenticated } from "../middlewares";

const upload = multer({ storage: fileStorageEngine });

export default (router: express.Router) => {
  router.get("/file/list", getListFiles);
  router.get("/file/:id", getFile);
  router.get("/file/download/:id", getFileForDownload);
  router.post("/file/upload", upload.single("storage"), uploadFile);
  router.post("/file/delete/:id", deleteFileById);
  router.put("/file/update/:id", upload.single("storage"), updateFileById);
};
