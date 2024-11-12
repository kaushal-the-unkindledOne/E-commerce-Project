import { Product } from "../models/Product.js";
import { rm } from "fs";

export const createProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({
        message: "Only admin can create products",
      });

    const { title, description, category, price, stock } = req.body;

    const image = req.file;
    if (!image)
      return res.status(400).json({
        message: "Image is required",
      });

    const product = await Product.create({
      title,
      description,
      category,
      price,
      stock,
      image: image.path,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const fetchProducts = async (req, res) => {
  try {
    const { search, category, price, page } = req.query;

    const filter = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    if (price) {
      filter.price = { $gte: Number(price) };
    }

    if (category) {
      filter.category = category;
    }

    const countProudct = await Product.countDocuments();

    const limit = 4;

    const skip = (page - 1) * limit;

    const totalPages = Math.ceil(countProudct / limit);

    const products = await Product.find(filter)
      .sort("-createdAt")
      .limit(limit)
      .skip(skip);

    const categories = await Product.distinct("category");

    const mostSelling = await Product.find().sort({ sold: -1 }).limit(3);

    res.json({ products, totalPages, categories, mostSelling });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const fetchProductsAdmin = async (req, res) => {
  try {
    const products = await Product.find();

    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const fetchSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStock = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({
        message: "Only admin can update Stock",
      });

    const product = await Product.findById(req.params.id);

    if (req.body.stock) {
      product.stock = req.body.stock;
      await product.save();
      return res.json({ message: "Stock updated successfully" });
    }

    res.status(400).json({
      message: "Please provide Stock value",
    });
  } catch(error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({
        message: "Only admin can delete products",
      });

    const product = await Product.findById(req.params.id);

    rm(product.image, () => {
      console.log("Image deleted");
    });

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
