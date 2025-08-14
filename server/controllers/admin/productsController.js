import { imageUploadUtil } from "../../helpers/cloudinary.js";

const imageUploadHandler = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64" + b64;
    const result = await imageUploadUtil();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error uploading image",
    });
  }
};

export { imageUploadHandler };
