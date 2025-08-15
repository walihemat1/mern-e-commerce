import cloudinary from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: "dhe7wxbjd",
  api_key: "835587861336285",
  api_secret: "hwYqX5qrQjrYfHR4I8PN2o5qTnw",
});

const storage = new multer.memoryStorage();

async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

const upload = multer({ storage });

export { upload, imageUploadUtil };
