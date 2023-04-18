import mongoose from './connection.js'

import users from './createUsers.js'
import User from '../models/user.js';

import items from './items.json'  assert { type: "json" }
import Product from '../models/products.js'

// await User.deleteMany();
await User.insertMany(users);

// await Product.deleteMany();

for (const item of items) {
  const userId = await User.findOne({ username: users[Math.round(Math.random() * (users.length - 1))].username })
  item.author = { "_id": userId._id }
  await Product.create(item)
}

mongoose.disconnect();