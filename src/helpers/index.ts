import crypto from "crypto";
import multer from "multer";
import path from "path";
import bcrypt from "bcrypt";

const SECRET = process.env.SECRET;
export const filepath = path.join(__dirname, "../storage");

export const random = () => crypto.randomBytes(128).toString("base64");
export const encrypted = (salt: string, password: string) => {
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
};
export const hashedPwd = (password: string) => bcrypt.hashSync(password, 2);
export const validPassword = (password: string, pwdDB: string) => {
  return bcrypt.compareSync(password, pwdDB);
};
export const getExtension = (filename: string) => {
  return filename.split(".").pop();
};
export const generateSpecificFilename = (_filename: string) => {
  return Date.now() + "--" + _filename;
};
export const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, filepath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
