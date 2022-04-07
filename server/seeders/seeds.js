//This needs to be reconfigured

const mongo = require('../config/connection');
const { Products } = require('../models');
const productSeeds = require('../seeders/productSeeds.json');

mongo.once('open', async () => {
  try {
    await Products.deleteMany({});
    await Products.create(productSeeds);


    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
