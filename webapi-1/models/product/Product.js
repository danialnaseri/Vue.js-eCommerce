const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({

    _id:                mongoose.Schema.Types.ObjectId,
    name:               { type: String, required: true },
    desc:               { type: String, required: true },
    image:              { type: String, required: true },    
    price:              { type: Number, required: true },

    created:            { type: Date, default: Date.now },
    modified:           { type: Date, default: Date.now }    
    
})

module.exports = mongoose.model("Product", productSchema)