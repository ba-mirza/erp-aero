import express from "express";
import authentication from "./authentication";
import file from "./file";

const router = express.Router();

export default (): express.Router => {
  file(router);
  authentication(router);
  return router;
};
