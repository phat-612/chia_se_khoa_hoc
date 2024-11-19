// uploadMiddleware.js
import multer from "multer";
import path from "path";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv/config";
const { v2: cloudinary } = require("cloudinary");

const configCloudinary = cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: configCloudinary,
  params: {
    folder: "uploads",
    format: async (req, file) => {
      const parts = file.originalname.split(".");
      return parts[parts.length - 1];
    },
    public_id: (req, file) =>
      `${Date.now()}-${file.originalname.split(".")[0]}`,
  },
});
const upload = multer({ storage: storage });
const removeImgCloudinary = (fileName) => {
  public_id = `uploads/${fileName.split(".")[0]}`;
  cloudinary.uploader.destroy(public_id, (err, result) => {});
};
export { upload, removeImgCloudinary };
