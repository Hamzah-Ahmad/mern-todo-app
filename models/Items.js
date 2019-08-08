const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = Item = mongoose.model('Item', ItemSchema);