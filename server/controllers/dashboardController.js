const RentalOrder = require('../models/rentalOrder');
const Product = require('../models/product');
const User = require('../models/user');

// Admin Dashboard Summary Metrics
exports.getAdminDashboard = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // Active Rentals
    const activeRentalsCount = await RentalOrder.countDocuments({ status: 'active' });

    // Returns Due Today
    const dueTodayCount = await RentalOrder.countDocuments({
      status: 'active',
      'rentalPeriod.expectedReturnDate': { $gte: startOfToday, $lte: endOfToday }
    });

    // Overdue Rentals
    const overdueCount = await RentalOrder.countDocuments({
      status: 'active',
      'rentalPeriod.expectedReturnDate': { $lt: startOfToday }
    });

    // Total Revenue Calculation
    const completedOrders = await RentalOrder.find({ status: 'completed' });
    const totalRevenue = completedOrders.reduce((acc, order) => {
      return acc + (order.financials.rentalFee || 0) + (order.financials.lateFee || 0);
    }, 0);

    // Stock Warnings
    const lowStockProducts = await Product.find({ availableStock: { $lte: 2 } });

    res.json({
      summary: {
        activeRentals: activeRentalsCount,
        dueToday: dueTodayCount,
        overdue: overdueCount,
        totalRevenue
      },
      lowStockAlerts: lowStockProducts
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// User Dashboard Summary Metrics
exports.getUserDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const activeRentals = await RentalOrder.find({ user: userId, status: 'active' })
      .populate('items.product');

    const completedRentals = await RentalOrder.find({ user: userId, status: 'completed' })
      .populate('items.product');

    res.json({
      activeRentals,
      historyCount: completedRentals.length,
      completedRentals
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};