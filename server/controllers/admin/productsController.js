import { imageUploadUtil } from "../../helpers/cloudinary.js";
import Product from "../../models/productModel.js";

const imageUploadHandler = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

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

// add a new product
const createProduct = async (req, res) => {
  const {
    image,
    title,
    description,
    price,
    salePrice,
    totalStock,
    category,
    brand,
  } = req.body;

  if ((!title, !price, !category))
    return res.status(401).json({
      status: false,
      message: "Product's title, price, and category are required!",
    });

  try {
    const product = await Product.create({
      image,
      title,
      description,
      category,
      price,
      salePrice,
      totalStock,
      brand,
    });

    res.status(200).json({
      status: true,
      message: "Product created successfully!",
      data: {
        id: product._id,
        image: product.image,
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        salePrice: product.salePrice,
        totalStock: product.totalStock,
        brand: product.brand,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Error occured while adding product!",
    });
  }
};

// get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().select([
      "_id",
      "image",
      "title",
      "description",
      "price",
      "salePrice",
      "totalStock",
      "brand",
      "category",
    ]);

    res.status(200).json({
      status: true,
      message: "All products!",
      data: products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Something went wrong!",
    });
  }
};

// get a single product
const getProduct = async (req, res) => {
  const productId = req.params.productId;
  if (!productId)
    return res.status(400).json({
      status: false,
      message: "Product id is required!",
    });
  try {
    const product = await Product.findById(productId).select([
      "_id",
      "image",
      "title",
      "description",
      "price",
      "salePrice",
      "totalStock",
      "brand",
      "category",
    ]);
    res.status(200).json({
      status: true,
      message: "Product with id updated!",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Something went wrong!",
    });
  }
};

// edit a product
const updateProduct = async (req, res) => {
  const productId = req.params.productId;

  if (!productId)
    return res.status(400).json({
      status: false,
      message: "Product id is required!",
    });
  try {
    const productTOBeUpdated = await Product.findById(productId);

    if (!productTOBeUpdated)
      return res.status(404).json({
        status: false,
        message: `Product with ${productId} id doesn't exit! `,
      });

    const image = req.body.image || productTOBeUpdated.image;
    const title =
      req.body.title !== "" ? req.body.title : productTOBeUpdated.title;
    const price =
      req.body.price !== "" ? req.body.price : productTOBeUpdated.price;
    const salePrice =
      req.body.salePrice !== ""
        ? req.body.salePrice
        : productTOBeUpdated.salePrice;
    const description =
      req.body.description !== ""
        ? req.body.description
        : productTOBeUpdated.description;
    const totalStock =
      req.body.totalStock !== ""
        ? req.body.totalStock
        : productTOBeUpdated.totalStock;
    const category =
      req.body.category !== ""
        ? req.body.category
        : productTOBeUpdated.category;
    const brand =
      req.body.brand !== "" ? req.body.brand : productTOBeUpdated.brand;

    const updateProduct = await Product.findByIdAndUpdate(productId, {
      image,
      title,
      price,
      salePrice,
      description,
      totalStock,
      category,
      brand,
    });

    res.status(200).json({
      status: true,
      message: `Product with ${productId} id successfully updated!`,
      data: updateProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Something went wrong!",
    });
  }
};

// delete a product
const deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  if (!productId)
    return res.status(400).json({
      status: false,
      message: "Product id is required!",
    });

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    res.status(200).json({
      status: true,
      message: "Product deleted successfully!",
      data: deletedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      message: "Something went wrong!",
    });
  }
};

export {
  imageUploadHandler,
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
