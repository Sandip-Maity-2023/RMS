const mongoose = require('mongoose');

const rentalOrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 },
    dailyRate: Number
  }],
  rentalPeriod: {
    startDate: { type: Date, required: true },
    expectedReturnDate: { type: Date, required: true },
    actualReturnDate: Date
  },
  fulfillmentType: { type: String, enum: ['delivery', 'store_pickup'], default: 'store_pickup' },
  financials: {
    rentalFee: Number,
    securityDeposit: Number,
    lateFee: { type: Number, default: 0 },
    refundedDeposit: { type: Number, default: 0 },
    isDepositSettled: { type: Boolean, default: false }
  },
  status: { 
    type: String, 
    enum: ['quotation', 'active', 'due_today', 'overdue', 'completed', 'cancelled'], 
    default: 'quotation' 
  }
}, { timestamps: true });

module.exports = mongoose.model('RentalOrder', rentalOrderSchema);

