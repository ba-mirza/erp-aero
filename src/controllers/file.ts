import express from "express";
import fs from "fs";

import {
  deleteFileByIdFromDB,
  getFileByIdDB,
  getFileForDownloadDB,
  getCountFilesDB,
  uploadFileToDB,
  getListFilesWithPaginationDB,
} from "../db";
import { filepath } from "../helpers";

export const getListFiles = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const list_size = 10 || parseInt(req.body.query.listSize);
    const page = 1 || parseInt(req.body.query.page);

    const countRow: any = await getCountFilesDB();
    const totalCount = countRow[0].total;
    const totalPages = Math.ceil(totalCount / list_size);

    const fileRow = await getListFilesWithPaginationDB(page - 1, list_size);

    res.json({
      files: fileRow,
      totalPages: totalPages,
      totalCount: totalCount,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const getFile = async (req: express.Request, res: express.Response) => {
  try {
    const paramsId = req.params.id;
    const checkFileDB = await getFileByIdDB(paramsId);

    if (!checkFileDB.fileId) {
      return res.sendStatus(404).json({ error: "File not found" }).end();
    }

    return res.status(200).json(checkFileDB.fileRows[0]).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400).json({ error: "Something went wrong" });
  }
};

export const getFileForDownload = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const paramsId = req.params.id;
    const file = await getFileByIdDB(paramsId);

    if (!file.fileId) {
      res.sendStatus(404).json({ error: "File not found" });
    }

    const filename = file.fileRows[0].file_name;
    const fullpath = `${filepath}/${filename}`;

    res.download(fullpath, filename, (err) => {
      if (err) {
        console.log(err);
        res
          .sendStatus(500)
          .json({ error: "Server error while downloading file" });
      }
    });
    res.status(200).json({ success: "Successfully for downloaded!" }).end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400).json({ error: "Something went wrong" });
  }
};

export const uploadFile = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { originalname, mimetype, size } = req.file;
    const uploadedFile = await uploadFileToDB({
      originalname,
      mimetype,
      size,
    });
    res
      .status(200)
      .json({
        success: "single file upload successfully and uploaded to DB",
        file: uploadedFile,
      })
      .end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400).json({ error: "Something went wrong" });
  }
};

export const deleteFileById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const paramsId = req.params.id;
    const checkFileDB = await getFileByIdDB(paramsId);

    if (!checkFileDB.fileId) {
      return res.status(404).json({ error: "File not found" });
    }
    const filename = checkFileDB.fileRows[0].file_name;
    const fullPath = `${filepath}/${filename}`;

    fs.unlink(fullPath, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error when deleting a file" });
      }
    });
    const deletedFile = await deleteFileByIdFromDB(paramsId);
    res
      .status(200)
      .json({ success: "File deleted successfully", file: deletedFile })
      .end();
  } catch (error) {
    console.log(error);
    res.sendStatus(400).json({ error: "Something went wrong" });
  }
};

export const updateFileById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const paramsId = req.params.id;
    const newFile = req.file;

    const checkFileDB = await getFileByIdDB(paramsId);

    if (!checkFileDB.fileId) {
      return res.status(404).json({ error: "File not found" });
    }

    const newFilePath = `${filepath}/${newFile.originalname}`;

    await getFileForDownloadDB(newFile.originalname, paramsId);
    fs.writeFileSync(newFilePath, newFile.buffer);
    res.json({
      success: "The file was successfully updated and written to the DB",
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400).json({ error: "Something went wrong" });
  }
};
