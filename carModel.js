const mongoose = require('mongoose');
const CarSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    date:{
        type: String,
        require: true
    },
    brand:{
        type: String,
        require: true
    },
    price:{
        type: Number
    },
    image:{
        type: String,
        require: true
    },
    
});
const CarModel = new mongoose.model('fkid', CarSchema);

module.exports = CarModel;