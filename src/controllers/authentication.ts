import express from "express";

import { createUser, getInfo, existingUserDB } from "../db";
import { hashedPwd, validPassword } from "../helpers";
import { generateTokens } from "../middlewares";

export const signIn = async (req: express.Request, res: express.Response) => {
  try {
    const { id, password } = req.body;
    const user: any = await existingUserDB(id);

    if (!user.length) {
      return res.status(400).json({ error: "User not found", user: user });
    }

    const valid = validPassword(password, user[0]._password);

    if (!valid) {
      return res.status(400).json({
        error: "Password is wrong",
      });
    }

    res.cookie("auth", user[0].token, {
      domain: "localhost",
      path: "/",
    });
    return res.json({ success: "Successfully Signed In" }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const signUp = async (req: express.Request, res: express.Response) => {
  try {
    const { id, password } = req.body;

    if (!id || !password) {
      return res.json({ error: "Error with id or password" });
    }

    const isUser: any = await existingUserDB(id);

    if (isUser.length) {
      return res.json({
        error: "User with this name is busy",
      });
    }

    const token = await generateTokens(id);
    const user = await createUser(id, {
      token: token.refreshToken,
      password: hashedPwd(password),
    });
    return res.status(200).json({ user: user, token: token }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getUserInfo = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userId = await getInfo();
    res.send(userId);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
