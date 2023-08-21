import crypto from "crypto";
import multer from "multer";
import path from "path";

const SECRET = process.env.SECRET;
export const filepath = path.join(__dirname, "../storage");

export const random = () => crypto.randomBytes(128).toString("base64");
export const encrypted = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
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
