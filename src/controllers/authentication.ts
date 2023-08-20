import { createUser } from "db";
import express from "express";
import { encrypted, random } from "helpers";

export const signIn = async (req: express.Request, res: express.Response) => {};

export const signUp = async (req: express.Request, res: express.Response) => {
  try {
    const { id, password } = req.body;

    if (!id || !password) {
      return res.sendStatus(400);
    }

    const salt = random();
    const user = await createUser(id, {
      salt,
      password: encrypted(salt, password),
    });
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getUserInfo = async (
  req: express.Request,
  res: express.Response
) => {};
