const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  selectedDestinations: [{
    id: String,
    name: String,
    price: Number
  }],
  selectedCab: {
    id: String,
    name: String,
    pricePerDay: Number
  },
  passengerCount: {
    type: Number,
    required: true
  },
  tripDays: {
    type: Number,
    required: true
  },
  travelDate: {
    type: Date,
    required: true
  },
  pickupLocation: {
    type: String,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  bookingStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'confirmed'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: false,
    transform: (doc, ret) => {
      // Ensure nested objects serialize as plain JSON so destination/cab show properly, not [object Object]
      if (ret.selectedDestinations && Array.isArray(ret.selectedDestinations)) {
        ret.selectedDestinations = ret.selectedDestinations.map(d => ({
          id: d && d.id,
          name: d && d.name,
          price: d && d.price
        }));
      }
      if (ret.selectedCab && typeof ret.selectedCab === 'object') {
        ret.selectedCab = {
          id: ret.selectedCab.id,
          name: ret.selectedCab.name,
          pricePerDay: ret.selectedCab.pricePerDay
        };
      }
      return ret;
    }
  }
});

module.exports = mongoose.model('Booking', bookingSchema); 