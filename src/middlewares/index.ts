import express from "express";
import jwt from "jsonwebtoken";
import { merge } from "lodash";

import { getUserBySession } from "../db";

const SECRET = "auth";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies;

    if (!sessionToken) {
      res.sendStatus(403);
    }

    const existingUser: any = await getUserBySession(sessionToken);

    if (existingUser.length) {
      return res.sendStatus(403);
    }

    merge(req, { indentity: existingUser });

    return next();
  } catch (error) {
    console.log(error);
  }
};

export const generateTokens = async (id: string) => {
  const accessToken = jwt.sign({ id: id }, process.env.SECRET, {
    expiresIn: "10m",
  });
  const refreshToken = jwt.sign({ id: id }, process.env.SECRET_REFRESH);
  return { accessToken, refreshToken };
};
