const mongoose = require ('mongoose')

const ShopSchema = new mongoose.Schema({
  name: String,
  price: Number
})

module.exports = mongoose.model('Shop',ShopSchema)

