const Theater = require ('./theater')
const Shop = require ('./shop')
const mongoose = require('mongoose')

const PersonSchema = new mongoose.Schema({
  name: String,
  age: Number,
  shopped : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop'
  }]
})

module.exports = mongoose.model('Person',PersonSchema)
