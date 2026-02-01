const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking({
      userId: req.body.userId,
      selectedDestinations: req.body.selectedDestinations,
      selectedCab: req.body.selectedCab,
      passengerCount: req.body.passengerCount,
      tripDays: req.body.tripDays,
      travelDate: req.body.travelDate,
      pickupLocation: req.body.pickupLocation,
      totalAmount: req.body.totalAmount,
      bookingStatus: 'confirmed'
    });
    await booking.save();
    res.status(201).json(booking.toJSON ? booking.toJSON() : booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get bookings by user ID (use .lean() so destination/cab show as proper JSON, not [object Object])
router.get('/user/:userId', async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId }).lean();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update booking status
router.patch('/:id/status', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { bookingStatus: req.body.status },
      { new: true }
    ).lean();
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().lean();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 