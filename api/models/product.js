const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    price: { type: Number, default: 0 },
    costPrice: { type: Number, default: 0 },
    image: { type: String, default: '' },
    brand: { type: String, default: '' },
    hasStockControl: { type: Boolean, default: false },
    countInStock: { type: Number, min: 0, max: 500 },
    description: { type: String, default: '' },
    createdIn: { type: Date, default: Date.now }
  },
  { autoIndex: false }
)

productSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

productSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('Product', productSchema)
