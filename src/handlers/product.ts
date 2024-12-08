import { Request, Response } from "express";
import Product from "../models/Product";

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const products = await Product.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  res.json({ data: products });
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const productById = await Product.findByPk(id); //Pk=primary key

  if (!productById) {
    res.status(404).json({
      error: "Product not found",
    });
    return;
  }

  res.json({ data: productById });
};

export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const product = await Product.create(req.body); //Te crea el objeto del product
  res.status(201).json({ data: product });
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const productById = await Product.findByPk(id);

  if (!productById) {
    res.status(404).json({
      error: "Product not found",
    });
    return;
  }

  //Update
  const updatedProduct = await productById.update(req.body);
  await updatedProduct.save();
  res.json({ data: updatedProduct });
};

export const updateAvailability = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const productById = await Product.findByPk(id);

  if (!productById) {
    res.status(404).json({
      error: "Product not found",
    });
    return;
  }

  //Update
  productById.availability = !productById.dataValues.availability;
  await productById.save();
  res.json({ data: productById });
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const productById = await Product.findByPk(id);

  if (!productById) {
    res.status(404).json({
      error: "Product not found",
    });
    return;
  }

  //Update
  const deletedProduct = await productById.destroy();
  res.json({ data: "Product removed" });
};
