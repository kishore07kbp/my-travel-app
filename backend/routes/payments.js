const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// Create a new payment
router.post('/', async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get payment by booking ID
router.get('/booking/:bookingId', async (req, res) => {
  try {
    const payment = await Payment.findOne({ bookingId: req.params.bookingId });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update payment status
router.patch('/:id/status', async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      {
        paymentStatus: req.body.status,
        paidAmount: req.body.paidAmount || 0,
        remainingAmount: req.body.remainingAmount || 0,
        paymentDate: req.body.status === 'completed' ? new Date() : null,
        upiTransactionId: req.body.upiTransactionId || ''
      },
      { new: true }
    );
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all payments
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 