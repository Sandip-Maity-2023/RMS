// const mongoose =require('mongoose');

// const userSchema = new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: true
//     },
//     lastName: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     role:{type:String,enum:['client','admin'],default:'client'},
//     profileImage: {
//         type: String,
//         default: ''
//     },
//     shippingAddress: {
//         type: String,
//         default: 'String',
//     state:String,
//     city:String,
//     zipCode:String

//     }
// },{timestamps:true});

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['client', 'vendor', 'admin'], default: 'client' },
  // Vendor specific fields
  companyName: { type: String },
  productCategory: { type: String }, // e.g., Electronics, Furniture
  gstNo: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);