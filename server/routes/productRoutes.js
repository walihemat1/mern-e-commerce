import express from "express";

import { imageUploadHandler } from "../controllers/admin/productsController.js";
import { upload } from "../helpers/cloudinary.js";

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), imageUploadHandler);

export default router;
