import express from "express";

import {
  createProduct,
  updateProduct,
  getProducts,
  imageUploadHandler,
  getProduct,
  deleteProduct,
} from "../controllers/admin/productsController.js";
import { upload } from "../helpers/cloudinary.js";

const router = express.Router();

router.post("/upload-image", upload.single("my_file"), imageUploadHandler);
router.route("/").post(createProduct).get(getProducts);
router.get("/get/:productId", getProduct);
router.patch("/update/:productId", updateProduct);
router.delete("/delete/:productId", deleteProduct);

export default router;
