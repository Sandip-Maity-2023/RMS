const mongoose = require('mongoose');

const pricelistSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Pricelist name is required'],
    trim: true 
  },
  description: { 
    type: String, 
    trim: true 
  },
  pricingType: {
    type: String,
    enum: ['standard', 'seasonal', 'tiered', 'custom'],
    default: 'standard'
  },
  currency: {
    type: String,
    default: 'INR'
  },
  rules: [{
    product: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product', 
      required: true 
    },
    // Duration constraints for rule application (e.g., 1 to 7 days)
    minDurationDays: { 
      type: Number, 
      default: 1 
    },
    maxDurationDays: { 
      type: Number 
    },
    // Pricing calculation strategy
    pricePerDay: { 
      type: Number, 
      required: true 
    },
    discountPercentage: { 
      type: Number, 
      default: 0 
    }
  }],
  validFrom: { 
    type: Date 
  },
  validTo: { 
    type: Date 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('Pricelist', pricelistSchema);
