const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    cellPhone: { type: String, default: '' },
    email: { type: String, lowercase: true, default: '' },
    image: { type: String, default: '' },
    detail: { type: mongoose.Schema.Types.ObjectId, ref: 'ClientDetail' },
    address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
    createdIn: { type: Date, default: Date.now }
  },
  { autoIndex: false }
)

clientSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

clientSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Client', clientSchema)
