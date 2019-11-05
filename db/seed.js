/* eslint-disable class-methods-use-this */
const mongoose = require('mongoose');
const faker = require('faker');
const productDetails = require('./index.js');
const dataSources = require('./fakeDataSources.js');


class dataGenerator {
  constructor(seed) {
    // defining valid inputs to pull fake data from
    // this.sellerNames = dataSources.sellerNames;
    // this.productNames = dataSources.productNames;
    this.badges = ['Bestseller', 'Badseller', null];
    this.productOptions = dataSources.productOptions;
    faker.seed(seed);
  }

  generateProduct(idx) {
    let product = {
      productId: idx,
      sellerId: this.generateSellerId(),
      sellerName: this.generateSellerName(),
      averageReviewScore: this.generateAverageReviewScore(),
      numberReviews: this.generateNumReviews(),
      itemName: this.generateProductName(),
      badge: this.generateBadge(),
      itemPrice: this.generatePriceInCents(1000, 30000),
      freeShipping: this.generateBoolean(),
      productOptions: idx,
      personalization: this.generateBoolean(),
      availableQuantity: this.generateAvailableQuantity(),
      onOrder: this.generateOnOrderQuantity(),
    };
    return product;
  }

  getRandomInt(lowerLimit, upperLimit) { // returns integer between lower limit and upper limit
    return faker.random.number(upperLimit - lowerLimit) + lowerLimit;
  }

  generateSellerId() {
    return this.getRandomInt(1, 1000);
  }

  generateSellerName() {
    return faker.name.firstName() + ' ' + faker.name.lastName();
  }

  generateAverageReviewScore() {
    return this.getRandomInt(1, 5);
  }

  generateNumReviews() {
    return this.getRandomInt(0, 5000);
  }

  generateProductName() {
    return faker.commerce.productName();
  }

  generateBadge() {
    const badgeIdx = this.getRandomInt(0, this.badges.length);
    return this.badges[badgeIdx];
  }

  generatePriceInCents(lowerLimit, upperLimit) {
    return this.getRandomInt(lowerLimit, upperLimit);
  }

  generateBoolean() {
    return faker.random.boolean();
  }

  generateProductOptions() {
    let numOptions = this.getRandomInt(1, 3);
    let optionIdxs = [];
    let idx = this.getRandomInt(0, this.productOptions.length);
    optionIdxs.push(idx);
    while (optionIdxs.length < numOptions) {
      do {
        idx = this.getRandomInt(0, this.productOptions.length);
      } while (optionIdxs.includes(idx));
      optionIdxs.push(idx);
    }
    let options = optionIdxs.map((idx) => this.productOptions[idx]);
    options.forEach((option) => {
      if (option.optionName === 'Size' || option.optionName === 'Material') {
        option.choices.forEach((choice) => {
          choice.adjustedPrice = this.generatePriceInCents(1000, 30000);
        });
      }
    });
    return options;
  }

  generateAvailableQuantity() {
    return this.getRandomInt(1, 200);
  }

  generateOnOrderQuantity() {
    return this.getRandomInt(0, 25);
  }
}

// generate products to populate db
let generator = new dataGenerator();
let products = [];
let product;
for (let i = 0; i < 150; i++) {
  product = generator.generateProduct();
  product.productId = i + 1;
  products.push(product);
}
productDetails.create(products)
  .then(() => mongoose.connection.close())
  .catch((err) => console.log(err));

module.exports = dataGenerator;
