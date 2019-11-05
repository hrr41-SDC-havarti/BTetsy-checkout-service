/* eslint-disable no-plusplus */
const fs = require('fs');
const faker = require('faker');
const dataGenerator = require('../seed.js');

const file = fs.createWriteStream('./productDetails.csv');
const generator = new dataGenerator(101);


const generateProductDetails = function generateProductDetails(idx) {
  const product =
};


const generateManyRecords = function generateManyRecords(writer, numberOfRecords, encoding, cb) {
  let i = 1;

  function write() {
    let ok = true;
    let newLine = faker.lorem.text() + '\n';

    do {
      i++;
      if (i === numberOfRecords) {
        // Last time!
        newLine = generateProductDetails(i);
        writer.write(newLine, encoding, cb);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        newLine = generateProductDetails(i);
        ok = writer.write(newLine, encoding);
      }
    } while (i < numberOfRecords && ok);
    if (i < numberOfRecords) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
  write();
};

generateManyRecords(file, 1000, 'utf8', console.log);
