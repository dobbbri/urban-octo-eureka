const mongoose = require('mongoose')

const clientDetailSchema = new mongoose.Schema(
  {
    birthday: { type: Date },
    phone: { type: String, default: '' },
    socialSecurity: { type: String, default: '' },
    description: { type: String, default: '' }
  },
  { autoIndex: false }
)

clientDetailSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

clientDetailSchema.set('toJSON', { virtuals: true })

module.exports = mongoose.model('ClientDetail', clientDetailSchema)
