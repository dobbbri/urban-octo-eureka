const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const generateToken = require('../helpers/token')

router.post('/register', async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country
  })
  if (!user) {
    return res.status(400).send('O usuário não pode ser criado!')
  }

  const { _id, name, email, isAdmin } = user
  const token = generateToken({ id: _id, isAdmin })
  res.status(200).send({ email, name, token })
})

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user) {
    return res.status(400).send('Não foi possivel encontrar sua conta.')
  }

  const equals = bcrypt.compareSync(req.body.password, user.passwordHash)
  if (!equals) {
    return res.status(400).send('Senha incorreta.')
  }

  const { _id, name, email, isAdmin } = user
  const token = generateToken({ id: _id, isAdmin })
  res.status(200).send({ email, name, token })
})

router.get(`/`, async (req, res) => {
  const user = await User.find().select('-passwordHash')
  res.status(200).send({ user })
})

router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).select('-passwordHash')
  if (!user) {
    return res.status(500).send('Usuário não encontrado.')
  }
  res.status(200).send({ user })
})

router.put('/:id', async (req, res) => {
  const userExist = await User.findById(req.params.id)
  if (!userExist) {
    return res.status(500).send('Usuário não encontrado.')
  }

  const newPassword = req.body.password
    ? bcrypt.hashSync(req.body.password, 10)
    : userExist.passwordHash

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      passwordHash: newPassword,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country
    },
    { new: true }
  )
  if (!user) {
    return res.status(400).send('O usuário não pode ser alterado!')
  }
  res.status(200).send({ user })
})

router.delete('/:id', async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id)
  if (!user) {
    return res.status(404).send('user not found!')
  }
  res.status(200).send({ user })
})

router.get('/count', async (req, res) => {
  const count = await User.countDocuments((count) => count)
  if (!count) {
    return res.status(500).send('Sem resgistros')
  }
  res(200).send({ count })
})

module.exports = router
