import express from "express";

import {
  getFile,
  getFileForDownload,
  getListFiles,
  uploadFile,
  deleteFileById,
  updateFileById,
} from "controllers/file";

export default (router: express.Router) => {
  router.get("/file/list", getListFiles);
  router.get("/file/:id", getFile);
  router.get("/file/download/:id", getFileForDownload);
  router.post("/file/upload", uploadFile);
  router.post("/file/delete/:id", deleteFileById);
  router.put("/file/update/:id", updateFileById);
};
