import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
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
  const public_id = `uploads/${fileName.split(".")[0]}`;
  cloudinary.uploader.destroy(public_id, (err, result) => {});
};

export { upload, removeImgCloudinary };
