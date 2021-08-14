const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, index: true },
    phone: { type: String, default: '' },
    socialSecurity: { type: String, default: '' },
    image: { type: String, default: '' },
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
    createdIn: { type: Date, default: Date.now }
  },
  { autoIndex: false }
)

userSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

userSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('User', userSchema)
