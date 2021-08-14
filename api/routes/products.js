const express = require('express')
const mongoose = require('mongoose')
const Product = require('../models/product')
const Category = require('../models/category')
const upload = require('../helpers/upload')

const router = express.Router()

router.get(`/`, async (req, res) => {
  const { categories } = req.query
  let filter = {}
  if (categories) {
    filter = { category: categories.split(',') }
  }
  const productList = await Product.find(filter).populate('category')
  if (!productList) {
    return res.status(500).json({ success: false })
  }
  res.send(productList)
})

router.get(`/:id`, async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id).populate('category')
  if (!product) {
    return res.status(500).json({ success: false })
  }
  res.send(product)
})

router.post(`/`, upload.single('image'), async (req, res) => {
  const category = await Category.findById(req.body.category)
  if (!category) {
    return res.status(400).send('Invalid Category')
  }

  const file = req.file
  if (!file) {
    return res.status(400).send('No image in the request')
  }
  // o host sera adicionado no frontend para nao ter problema
  // ao trocar de host e o gravado na imagem ser o host antigo
  // const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`

  const filename = `/public/uploads/${file.filename}`
  const product = await Product.create({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: filename, // "/public/upload/image-2323232"
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured
  })
  if (!product) {
    return res.status(500).send('The product cannot be created')
  }
  res.send(product)
})

router.put('/:id', upload.single('image'), async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) res.status(400).send('Invalid Product Id')

  const category = await Category.findById(req.body.category)
  if (!category) {
    return res.status(400).send('Invalid Category')
  }

  const product = await Product.findById(req.params.id)
  if (!product) {
    return res.status(400).send('Invalid Product!')
  }

  const file = req.file
  let imagepath
  if (file) imagepath = `/public/uploads/${file.filename}`
  else imagepath = product.image

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: imagepath,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured
    },
    { new: true }
  )

  if (!updatedProduct) {
    return res.status(500).send('the product cannot be updated!')
  }
  res.send(updatedProduct)
})

router.delete('/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        res.status(200).json({ success: true, message: 'the product is deleted!' })
      } else {
        res.status(404).json({ success: false, message: 'product not found!' })
      }
    })
    .catch((err) => res.status(500).json({ success: false, error: err }))
})

router.get(`/get/count`, async (req, res) => {
  const productCount = await Product.countDocuments((count) => count)

  if (!productCount) {
    return res.status(500).json({ success: false })
  }
  res.send({ productCount })
})

router.get(`/featured/:count`, async (req, res) => {
  const count = req.params.count ? req.params.count : 0
  const products = await Product.find({ isFeatured: true }).limit(+count)
  if (!products) {
    return res.status(500).json({ success: false })
  }
  res.send(products)
})

router.put('/gallery/:id', upload.array('images', 10), async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) res.status(400).send('Invalid Product Id')

  const files = req.files
  const imagesPaths = []
  if (files) {
    files.forEach((file) => imagesPaths.push(`/public/uploads/${file.filename}`))
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { images: imagesPaths },
    { new: true }
  )

  if (!product) {
    return res.status(500).send('the gallery cannot be updated!')
  }
  res.send(product)
})

module.exports = router
