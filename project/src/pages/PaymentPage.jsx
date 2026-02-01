import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowLeft, FaCreditCard, FaRupeeSign, FaQrcode, FaCheckCircle } from 'react-icons/fa'
import QRCode from 'react-qr-code'
import { useTrip } from '../context/TripContext'
import { createPayment, updatePaymentStatus, createBooking } from '../services/api'
import { useAuth } from '../context/AuthContext'

function PaymentPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { 
    selectedDestinations, 
    passengerCount, 
    selectedCab, 
    tripDays, 
    personalDetails,
    paymentDetails,
    setPaymentDetails,
    calculateTotalAmount
  } = useTrip()
  
  const [countdown, setCountdown] = useState(180) // 3 minutes in seconds
  const [showSuccess, setShowSuccess] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState('pending')
  const [isVerifying, setIsVerifying] = useState(false)
  const [currentPaymentId, setCurrentPaymentId] = useState(null)
  
  // Redirect if necessary information is missing
  useEffect(() => {
    if (
      selectedDestinations.length === 0 || 
      !selectedCab || 
      !personalDetails.name || 
      !personalDetails.email || 
      !personalDetails.phone
    ) {
      navigate('/destinations')
    }
  }, [selectedDestinations, selectedCab, personalDetails, navigate])
  
  // Calculate total amount and set payment details
  useEffect(() => {
    const totalAmount = calculateTotalAmount()
    setPaymentDetails(prev => ({
      ...prev,
      totalAmount,
      paidAmount: prev.paymentMethod === 'full' ? totalAmount : Math.round(totalAmount * 0.25)
    }))
    // eslint-disable-next-line
  }, [selectedDestinations, selectedCab, passengerCount, tripDays])
  
  // Countdown timer for QR code expiration
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])
  
  // Format seconds to MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  
  const handlePaymentMethodChange = (method) => {
    setPaymentDetails(prev => {
      const newPaymentMethod = method
      const newPaidAmount = method === 'full' 
        ? prev.totalAmount 
        : Math.round(prev.totalAmount * 0.25)
      
      return {
        ...prev,
        paymentMethod: newPaymentMethod,
        paidAmount: newPaidAmount
      }
    })
  }
  
  const handlePaymentSuccess = async () => {
    try {
      setIsVerifying(true);
      
      // First create a booking
      const bookingData = {
        userId: user._id,
        selectedDestinations: selectedDestinations.map(dest => ({
          id: dest.id,
          name: dest.name,
          price: dest.price
        })),
        selectedCab: {
          id: selectedCab.id,
          name: selectedCab.name,
          pricePerDay: selectedCab.pricePerDay
        },
        passengerCount: Number(passengerCount),
        tripDays: Number(tripDays),
        travelDate: new Date(personalDetails.travelDate),
        pickupLocation: personalDetails.pickupLocation,
        totalAmount: Number(paymentDetails.totalAmount)
      };

      const bookingResponse = await createBooking(bookingData);
      if (!bookingResponse._id) {
        throw new Error('Failed to create booking');
      }

      // Then create payment record with the booking ID
      const paymentData = {
        bookingId: bookingResponse._id,
        userId: user._id,
        amount: Number(paymentDetails.totalAmount),
        paymentMethod: paymentDetails.paymentMethod,
        paidAmount: Number(paymentDetails.paidAmount),
        remainingAmount: Number(paymentDetails.totalAmount - paymentDetails.paidAmount)
      };

      const paymentResponse = await createPayment(paymentData);
      if (!paymentResponse._id) {
        throw new Error('Failed to create payment');
      }

      // Update payment status
      await updatePaymentStatus(paymentResponse._id, {
        status: 'completed',
        paidAmount: Number(paymentDetails.paidAmount),
        remainingAmount: Number(paymentDetails.totalAmount - paymentDetails.paidAmount),
        upiTransactionId: 'UPI' + Date.now()
      });

      setPaymentDetails(prev => ({
        ...prev,
        paymentStatus: 'completed'
      }));
      setShowSuccess(true);
      
      // Navigate to receipt page after a short delay
      setTimeout(() => {
        navigate('/receipt');
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment verification failed: ' + error.message);
      setIsVerifying(false);
    }
  };
  
  const handlePaymentCancel = async () => {
    try {
      if (currentPaymentId) {
        await updatePaymentStatus(currentPaymentId, {
          status: 'failed',
          paidAmount: 0,
          remainingAmount: paymentDetails.totalAmount
        });
      }

      setPaymentDetails(prev => ({
        ...prev,
        paymentStatus: 'failed'
      }));
      
      alert('Payment was cancelled. Returning to previous page.');
      navigate('/personal-details'); // Navigate back to personal details page
    } catch (error) {
      console.error('Payment cancellation error:', error);
      alert('Error cancelling payment. Please try again.');
    }
  };

  // Modify verifyPayment to be called only when user clicks verify
  const verifyPayment = () => {
    if (!user || !user._id) {
      alert('You must be logged in to make a payment');
      return;
    }
    handlePaymentSuccess();
  };

  // Add function to check if payment is not completed
  const checkPaymentStatus = () => {
    if (countdown === 0 && paymentStatus === 'pending') {
      setPaymentDetails(prev => ({
        ...prev,
        paymentStatus: 'failed'
      }))
      setIsVerifying(false)
      alert('Payment not completed. The QR code has expired. Please try again.')
    }
  };

  // Add useEffect to check payment status when countdown reaches 0
  useEffect(() => {
    checkPaymentStatus();
  }, [countdown]);

  return (
    <div className="pt-20 min-h-screen bg-neutral-50 pb-16">
      {/* Success Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg p-8 max-w-md w-full flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <FaCheckCircle className="text-green-500 text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-800 mb-2">Payment Successful!</h2>
            <p className="text-neutral-600 text-center mb-4">
              Your payment has been processed successfully. Redirecting to your receipt...
            </p>
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-500"></div>
          </motion.div>
        </div>
      )}
      
      {/* Header */}
      <div className="bg-primary-600 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <Link to="/personal-details" className="text-white flex items-center hover:underline">
              <FaArrowLeft className="mr-2" />
              Back to Personal Details
            </Link>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white"
          >
            Payment
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white text-opacity-90 mt-2"
          >
            Complete your booking by making a secure payment
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Options */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-card p-6 md:p-8"
            >
              <h2 className="text-xl font-bold mb-6">Payment Method</h2>
              
              <div className="space-y-4 mb-8">
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    paymentDetails.paymentMethod === 'full' 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-neutral-200 hover:border-primary-300'
                  }`}
                  onClick={() => handlePaymentMethodChange('full')}
                >
                  <div className="flex items-start">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 mt-0.5 flex items-center justify-center ${
                      paymentDetails.paymentMethod === 'full' ? 'border-primary-500' : 'border-neutral-300'
                    }`}>
                      {paymentDetails.paymentMethod === 'full' && (
                        <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-neutral-800">Pay Full Amount</h3>
                      <p className="text-neutral-600 text-sm mt-1">
                        Pay the complete amount to secure your booking. No additional payments needed later.
                      </p>
                      <div className="mt-2 text-lg font-bold text-primary-600 flex items-center">
                        <FaRupeeSign className="mr-1" />
                        {paymentDetails.totalAmount}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div 
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    paymentDetails.paymentMethod === 'advance' 
                      ? 'border-primary-500 bg-primary-50' 
                      : 'border-neutral-200 hover:border-primary-300'
                  }`}
                  onClick={() => handlePaymentMethodChange('advance')}
                >
                  <div className="flex items-start">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 mt-0.5 flex items-center justify-center ${
                      paymentDetails.paymentMethod === 'advance' ? 'border-primary-500' : 'border-neutral-300'
                    }`}>
                      {paymentDetails.paymentMethod === 'advance' && (
                        <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-neutral-800">Pay 25% Advance</h3>
                      <p className="text-neutral-600 text-sm mt-1">
                        Pay 25% now to secure your booking. The remaining amount can be paid 3 days before your trip.
                      </p>
                      <div className="mt-2 text-lg font-bold text-primary-600 flex items-center">
                        <FaRupeeSign className="mr-1" />
                        {Math.round(paymentDetails.totalAmount * 0.25)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <h2 className="text-xl font-bold mb-6">UPI Payment</h2>
              
              <div className="border rounded-lg p-6 flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                  <QRCode 
                    value={`upi://pay?pa=6369941808-2@ybl&pn=TripToParadise&am=${paymentDetails.paidAmount}&cu=INR&tn=Booking Payment`}
                    size={200}
                    className="mx-auto"
                  />
                </div>
                
                <p className="text-neutral-600 text-center mb-4">
                  Scan the QR code with any UPI app to pay <strong>₹{paymentDetails.paidAmount}</strong>
                </p>
                
                <div className="flex items-center justify-center mb-4">
                  <div className="h-px bg-neutral-200 w-full"></div>
                  <span className="px-4 text-neutral-500 whitespace-nowrap">or pay to</span>
                  <div className="h-px bg-neutral-200 w-full"></div>
                </div>
                
                <div className="bg-neutral-50 p-3 rounded flex items-center mb-4">
                  <FaQrcode className="text-neutral-500 mr-2" />
                  <span className="font-mono">6369941808-2@ybl</span>
                </div>
                
                <div className="w-full flex flex-col sm:flex-row gap-4 mt-2">
                  <button
                    onClick={handlePaymentCancel}
                    className="flex-1 py-2 px-4 border border-neutral-300 text-neutral-700 rounded-md font-medium transition-colors hover:bg-neutral-50"
                  >
                    Cancel
                  </button>
                  
                  {isVerifying ? (
                    <div className="flex-1 py-2 px-4 bg-neutral-100 text-neutral-600 rounded-md font-medium flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary-500 mr-2"></div>
                      Verifying Payment...
                    </div>
                  ) : (
                    <button
                      onClick={verifyPayment}
                      className="flex-1 py-2 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-md font-medium transition-colors flex items-center justify-center"
                    >
                      <FaCheckCircle className="mr-2" />
                      Verify Payment
                    </button>
                  )}
                </div>
                
                <div className="mt-4 text-neutral-500 text-sm flex items-center">
                  <FaCreditCard className="mr-2" />
                  QR code expires in {formatTime(countdown)}
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right Column - Trip Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-card p-6 sticky top-24"
            >
              <h2 className="text-xl font-bold mb-4">Trip Summary</h2>
              
              <div className="border-b border-neutral-200 pb-4 mb-4">
                <h3 className="font-semibold mb-2">Selected Destinations</h3>
                <ul className="space-y-2">
                  {selectedDestinations.map((dest) => (
                    <li key={dest.id} className="flex justify-between">
                      <span className="text-neutral-700">{dest.name}</span>
                      <span className="font-medium flex items-center">
                        <FaRupeeSign className="text-xs mr-1" />
                        {dest.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-b border-neutral-200 pb-4 mb-4">
                <h3 className="font-semibold mb-2">Transportation</h3>
                <div className="flex justify-between mb-1">
                  <span className="text-neutral-700">{selectedCab.name}</span>
                  <span className="font-medium flex items-center">
                    <FaRupeeSign className="text-xs mr-1" />
                    {selectedCab.pricePerDay} × {tripDays} days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-700">Total for transportation</span>
                  <span className="font-medium flex items-center">
                    <FaRupeeSign className="text-xs mr-1" />
                    {selectedCab.pricePerDay * tripDays}
                  </span>
                </div>
              </div>
              
              <div className="border-b border-neutral-200 pb-4 mb-4">
                <h3 className="font-semibold mb-2">Details</h3>
                <div className="flex justify-between mb-1">
                  <span className="text-neutral-700">Number of passengers</span>
                  <span className="font-medium">{passengerCount}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-neutral-700">Trip duration</span>
                  <span className="font-medium">{tripDays} days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-700">Travel date</span>
                  <span className="font-medium">{personalDetails.travelDate}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total Amount</span>
                  <span className="font-bold text-primary-600 flex items-center">
                    <FaRupeeSign className="mr-1" />
                    {paymentDetails.totalAmount}
                  </span>
                </div>
                
                {paymentDetails.paymentMethod === 'advance' && (
                  <div className="mt-2">
                    <div className="flex justify-between">
                      <span className="text-neutral-700">Pay now (25%)</span>
                      <span className="font-medium flex items-center">
                        <FaRupeeSign className="text-xs mr-1" />
                        {paymentDetails.paidAmount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-700">Balance due</span>
                      <span className="font-medium flex items-center">
                        <FaRupeeSign className="text-xs mr-1" />
                        {paymentDetails.totalAmount - paymentDetails.paidAmount}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-primary-50 p-4 rounded-lg">
                <h4 className="font-semibold text-primary-700 mb-2">Note:</h4>
                <p className="text-primary-600 text-sm">
                  {paymentDetails.paymentMethod === 'full'
                    ? 'You are paying the full amount. Your booking will be confirmed immediately after successful payment.'
                    : 'You are paying 25% of the total amount. The remaining balance must be paid at least 3 days before your trip starts.'
                  }
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage