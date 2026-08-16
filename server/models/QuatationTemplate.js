const mongoose = require('mongoose');

const quotationTemplateSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Template name is required'],
    trim: true 
  },
  description: { 
    type: String 
  },
  defaultRentalPeriodDays: { 
    type: Number, 
    default: 1 
  },
  items: [{
    product: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product',
      required: true 
    },
    defaultQuantity: { 
      type: Number, 
      default: 1 
    },
    notes: String
  }],
  termsAndConditions: { 
    type: String, 
    default: 'Standard rental terms apply. Security deposit is refundable upon undamaged item return.' 
  },
  lateFeePolicy: {
    gracePeriodHours: { 
      type: Number, 
      default: 1 
    },
    hourlyLateRate: { 
      type: Number, 
      default: 10 
    },
    maxLateFee: { 
      type: Number, 
      default: 200 
    }
  },
  isDefault: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

module.exports = mongoose.model('QuotationTemplate', quotationTemplateSchema);
