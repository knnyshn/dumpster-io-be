import Product from '../models/products.js'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'

export async function showProducts(req, res) {
  const allProducts = await Product.find();
  return res.json(allProducts)
}

export async function showProduct(req, res) {
  const searchResult = await Product.findOne({ "_id": req.params.id });
  return res.json(searchResult)
}

export async function createProduct(req, res) {

  try {
    const product = new Product(req.body)
    await product.save()
    res.status(200).json(product)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }


  // const { title, author, description, tags, img, location, dateUploaded } = req.body

  // if (!title || !author || !description) {
  //   res.status(418).json({
  //     message: "im here but not working"
  //   })
  // } else {
  //   const newProduct = await Product.create({
  //     title,
  //     author: req.id,
  //     description,
  //     tags,
  //     img,
  //     location,
  //     dateUploaded
  //   })
  // }
}

export async function editProduct(req, res) {
  let productId = req.params.id
  const { title, description, tags, img, location, dateUploaded } = req.body

  let productFound = Product.findByIdAndUpdate({ _id: productId }, {
    title,
    author: req.id,
    description,
    tags,
    img,
    location,
    dateUploaded
  })
  return res.json({
    ...productFound.toJSON()
  })
}

