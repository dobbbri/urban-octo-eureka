const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema(
  {
    postalCode: { type: String, default: '' },
    street: { type: String, default: '' },
    number: { type: String, default: '' },
    neighbourhood: { type: String, default: '' },
    city: { type: String, default: '' },
    stateCode: { type: String, default: '' }
  },
  { autoIndex: false }
)

addressSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

addressSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('ClientAddress', addressSchema)
