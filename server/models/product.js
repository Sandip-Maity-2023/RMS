const mose = require('mongoose');

const productSchema = new mose.Schema({
name: {
    type:String,required:true},

    category:String,
    variants:
    {
    brand:String,
    color:String,
    size:String,

},
basePricePerDay: {
    type:Number,
    required:true
},
securityDeposit: {
    type:Number,
    required:true
},
totalStock: {
    type:Number,
    required:true
},
availableStock: {
    type:Number,
    required:true,
},
qrCode:String,
},{timestamps:true});

module.exports = mose.model('Product', productSchema);