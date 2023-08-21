import express from "express";

import { signIn, signUp, getUserInfo } from "../controllers/authentication";

export default (router: express.Router) => {
  router.post("/signin", signIn);
  router.post("/signup", signUp);
  router.get("/info", getUserInfo);
};
