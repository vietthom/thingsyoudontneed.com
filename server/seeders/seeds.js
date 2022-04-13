const mongo = require('../config/connection');
const { Products } = require('../models');


mongo.once('open', async () => {
  try {
    await Products.deleteMany({});

    const categories = await Category.insertMany([
      {name: 'Useless'}, 
      {name: 'Really Useless'}, 
      {name: 'You Dont Need This'},
      {name: 'You Really Dont Need This'},
    ]);
    
    await Products.insertMany([
      {
        productName: "S'more Maker",
        description: "This is a great thing when you want a s`more but don`t want to start a fire!",
        image:'smoresmaker.jpg',
        category: categories[0]._id,
        price: 12,
        quantity: 10
      },
      {
        productName: "Mini Desk Vacuum",
        description: "No excuses to have your workspace dirty.",
        image:'minivacuum.jpg',
        category: categories[3]._id,
        price: 14,
        quantity: 7
      },
      {
        productName: "Egg Counter",
        description: "Have your smartphone notify you when you are running low on eggs or when your eggs are going bad!",
        image:'eggcounter.jpg',
        category: categories[3]._id,
        price: 11,
        quantity: 10


      },
      {
        name: 'Mini Donut Factory',
        description: 'Why struggle making big batches of donuts when you can just make up to 30 mini donuts?!',
        image:'donutfactory.jpeg',
        category: categories[1]._id,
        price: 113,
        quantity: 9
      },
      {
        name: 'Monogrammed Barbecue Branding Iron',
        description: 'Let your friends and loved ones know who made that delicious piece of steak! Great buy for a grilling fan.',
        image: 'ironbrander.jpg',
        category: categories[2]._id,
        price: 17,
        quantity: 8
      },
      {
        name: 'Musical Toilet Roll Device',
        description: 'Can`t get enough of Christmas decorations? Have a little fun and sing a long some Christmas tunes!',
        image: 'toiletpaperdispenser.jpg',
        category: categories[2]._id,
        price: 8,
        quantity: 5
      },
      {
        name: 'Wi-Fi Scent Dispenser',
        description: 'Your phone can do so much now. So why not give it the ability to make any room in your house smell instantly like watermelon Jolly Rancher or sizzling bacon?',
        image: 'wifiscentdispenser.jpg',
        category: categories[0]._id,
        price: 108,
        quantity: 15,
      },
      {
        name: 'Musical Cake Server',
        description: 'Perfect for eating a birthday cake alone and wishing somebody,even a piece of cutlery, would sing `Happy Birthday` to you.',
        image: 'musicalcakeserver.jpg',
        category: categories[3]._id,
        price: 20,
        quantity: 11
      },
      {
        name: 'Soft Pretzel Maker With Cheese Dip Warmer',
        description: 'Makes 5 soft pretzels at home with you SuperPretzel brand Soft Pretzel Maker.',
        image: 'pretzelmaker.jpg',
        category: categories[0]._id,
        price: 55,
        quantity: 7
      },
      {
        name: 'Smartphone Controlled Kitty Water Fountain',
        description: 'In order to prevent diseases and dehydration caused by water intake, we consider that managing your pets` water intake can improve their  health, prevent illness and insure proper hydration',
        image: 'waterfountain.jpg',
        category: categories[3]._id,
        price: 27,
        quantity: 9
      },
      
    ]);

    console.log('products seeded');

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});