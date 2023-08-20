import { signIn, getUserInfo } from "controllers/authentication";
import { signUp } from "controllers/signUp";
import express from "express";

export default (router: express.Router) => {
  router.post("/signin", signIn);
  router.post("/signup", signUp);
  router.get("/info", getUserInfo);
};
