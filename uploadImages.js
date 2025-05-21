require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const folderPath = path.join(__dirname, "images"); // replace with your image folder
const uploadImages = async () => {
  try {
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const result = await cloudinary.uploader.upload(filePath, {
        folder: process.env.FOLDER_NAME,
        upload_preset: process.env.UPLOAD_PRESET,
      });
      console.log(`Uploaded: ${file} → ${result.secure_url}`);
    }
  } catch (err) {
    console.error("Error uploading images:", err);
  }
};

uploadImages();
