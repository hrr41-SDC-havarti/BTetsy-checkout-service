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

  async addProduct(productId) {
    const productData = await this.model.findOne({ productId });
    if (productData) {
      throw new Error('Product with that ID already in DB');
    }
    return productData;
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
