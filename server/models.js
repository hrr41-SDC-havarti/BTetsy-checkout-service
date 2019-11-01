const mongoose = require('mongoose');
const productDetails = require('../db/index.js');

class ProductDetailsModel {
  constructor() {
    this.model = productDetails;
  }

  async getProduct(productId) {
    const productData = await this.model.findOne({ productId });
    if (!productData) {
      throw new Error('product not found');
    }
    return productData;
  }

  async createProduct(productData) {
    try {
      const newProduct = await this.model.create(productData);
      return newProduct;
    } catch (error) {
      console.error(error);
    }
  }

  async updateProduct(productId, productData) {
    try {
      const updatedProduct = await this.model.update(
        { productId },
        productData,
        { new: true },
      );
      return updatedProduct;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteProduct(productId) {
    const deleted = await this.model.deleteOne({ productId });
    if (!deleted) {
      throw new Error('product not found');
    }
    return deleted;
  }
}


module.exports = new ProductDetailsModel();
