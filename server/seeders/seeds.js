const mongo = require('../config/connection');
const { Product, Category} = require('../models');


mongo.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Uesless' },
    { name: 'Really Useless' },
    { name: 'You Dont Need This' },
    { name: 'You Really Dont Need This' },
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  await Product.insertMany([
    {
      name: 'Smore Maker',
      description:
        'This is a great thing when you want a s`more but don`t want to start a fire!',
      image: 'smoresmaker.jpg',
      category: categories[0]._id,
      price: 11.99,
      quantity: 500
    },
    {
      name: 'Mini Desk Vacuum',
      description:
        'No excuses to have your workspace dirty.',
      image: 'minivacuum.jpg',
      category: categories[0]._id,
      price: 13.99,
      quantity: 500
    },
    {
      name: 'Egg Counter',
      category: categories[1]._id,
      description:
        'Have your smartphone notify you when you are running low on eggs or when your eggs are going bad!',
      image: 'eggcounter.jpg',
      price: 10.99,
      quantity: 20
    },
    {
      name: 'Mini Donut Factory',
      category: categories[1]._id,
      description:
        'Why struggle making big batches of donuts when you can just make up to 30 mini donuts?!',
      image: 'donutfactory.jpeg',
      price: 113.00,
      quantity: 50
    },
    {
      name: 'Monogrammed barbecue Branding Iron',
      category: categories[1]._id,
      description:
        'Let your friends and loved ones know who made that delicious piece of steak! Great buy for a grilling fan.',
      image: 'ironbrander.jpg',
      price: 16.99,
      quantity: 100
    },
    {
      name: 'Musical Toilet Roll Device',
      category: categories[2]._id,
      description:
        'Can`t get enough of Christmas decorations? Have a little fun and sing a long some Christmas tunes!',
      image: 'toiletpaperdispenser.jpg',
      price: 7.99,
      quantity: 30
    },
    {
      name: 'Wifi Scent Dispenser',
      category: categories[2]._id,
      description:
        'Your phone can do so much now. So why not give it the ability to make any room in your house smell instantly like watermelon Jolly Rancher or sizzling bacon?',
      image: 'wifiscentdispenser.jpg',
      price: 99.99,
      quantity: 30
    },
    {
      name: 'Musical Cake Server',
      category: categories[3]._id,
      description:
        'Perfect for eating a birthday cake alone and wishing somebody,even a piece of cutlery, would sing `Happy Birthday` to you.',
      image: 'musicalcakeserver.jpg',
      price: 9.99,
      quantity: 100
    },
    {
      name: 'Soft Pretzel Maker with Cheese Drip Warmer',
      category: categories[3]._id,
      description: 'Makes 5 soft pretzels at home with you SuperPretzel brand Soft Pretzel Maker.',
      image: 'pretzelmaker.jpg',
      price: 24.99,
      quantity: 1000
    },
    {
      name: 'Smartphone Controlled Kitty Water Fountain',
      category: categories[3]._id,
      description:
        'In order to prevent diseases and dehydration caused by water intake, we consider that managing your pets` water intake can improve their  health, prevent illness and insure proper hydration.',
      image: 'waterfountain.jpg',
      price: 2.99,
      quantity: 1000
    },
  ]);

  console.log('products seeded');

  process.exit();
});
