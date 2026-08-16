const RentalOrder = require('../models/rentalOrder');
const Product = require('../models/product');
const calculateLateFee = require('../utils/lateFeeCalculator');

// Create a new rental order / quotation
exports.createRentalOrder = async (req, res) => {
  const { items, startDate, expectedReturnDate, fulfillmentType } = req.body;

  try {
    let rentalFee = 0;
    let totalSecurityDeposit = 0;

    // Calculate rental duration in days (minimum 1 day)
    const start = new Date(startDate);
    const end = new Date(expectedReturnDate);
    const diffTime = Math.abs(end - start);
    const durationDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    // Verify stock and calculate totals
    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.product} not found` });
      }
      if (product.availableStock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      rentalFee += product.basePricePerDay * item.quantity * durationDays;
      totalSecurityDeposit += product.securityDeposit * item.quantity;

      // Deduct stock
      product.availableStock -= item.quantity;
      await product.save();
    }

    const order = new RentalOrder({
      user: req.user.id,
      items,
      rentalPeriod: { startDate, expectedReturnDate },
      fulfillmentType,
      financials: {
        rentalFee,
        securityDeposit: totalSecurityDeposit
      },
      status: 'active'
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all user rental orders
exports.getUserRentals = async (req, res) => {
  try {
    const rentals = await RentalOrder.find({ user: req.user.id })
      .populate('items.product')
      .sort({ createdAt: -1 });
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Process item return and settle security deposit
exports.processReturn = async (req, res) => {
  const { orderId } = req.params;
  const { actualReturnDate } = req.body;

  try {
    const order = await RentalOrder.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Rental order not found' });

    const returnTime = actualReturnDate ? new Date(actualReturnDate) : new Date();
    order.rentalPeriod.actualReturnDate = returnTime;

    // Calculate late fee penalty
    const lateFee = calculateLateFee(
      order.rentalPeriod.expectedReturnDate,
      returnTime
    );

    const deposit = order.financials.securityDeposit;
    const refundedAmount = Math.max(0, deposit - lateFee);

    order.financials.lateFee = lateFee;
    order.financials.refundedDeposit = refundedAmount;
    order.financials.isDepositSettled = true;
    order.status = 'completed';

    await order.save();

    // Restock items
    for (let item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { availableStock: item.quantity }
      });
    }

    res.json({
      message: 'Return processed and deposit settled successfully',
      securityDepositHeld: deposit,
      lateFeeDeducted: lateFee,
      refundedAmount
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};