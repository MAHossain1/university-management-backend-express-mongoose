import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import config from '../config';
import fs from 'fs';

export const sendImageToCloudinary = async (
  imageName: string,
  path: string,
) => {
  // Configuration
  cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.api_key,
    api_secret: config.api_secret, //
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(path, {
      public_id: imageName,
    })
    .catch((error) => {
      console.log(error);
    });

  // Optimize delivery by resizing and applying auto-format and auto-quality
  cloudinary.url(imageName, {
    fetch_format: 'auto',
    quality: 'auto',
  });

  // Transform the image: auto-crop to square aspect_ratio
  cloudinary.url(imageName, {
    crop: 'auto',
    gravity: 'auto',
    width: 500,
    height: 500,
  });

  fs.unlink(path, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log('file deleted.');
    }
  });

  return uploadResult;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
