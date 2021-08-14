const express = require('express')
const Category = require('../models/category')

const router = express.Router()

router.get(`/`, async (req, res) => {
  const categoryList = await Category.find()
  if (!categoryList) {
    res.status(500).json({ message: 'The categories cannot found.' })
  }
  res.status(200).json(categoryList)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const category = await Category.findById(id)
  if (!category) {
    return res.status(500).json({ message: 'The category cannot found.' })
  }
  res.status(200).json(category)
})

router.post('/', async (req, res) => {
  const { name, icon, color } = req.params
  const category = await Category.create({ name, icon, color })
  if (!category) {
    res.status(400).json({ message: 'the category cannot be created!' })
  }
  res.status(200).json(category)
})

router.put('/:id', async (req, res) => {
  const { id, name, icon, color } = req.params
  const category = await Category.findByIdAndUpdate(id, { name, icon, color }, { new: true })
  if (!category) {
    res.status(400).json({ message: 'the category cannot be updated!' })
  }
  res.status(200).json(category)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const category = await Category.findByIdAndRemove(id)
  if (!category) {
    return res.status(404).json({ message: 'category not found!' })
  }
  res.status(200).json(category)
})

module.exports = router
