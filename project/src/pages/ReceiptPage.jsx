import { useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaDownload, FaPrint, FaHome, FaRupeeSign, FaCheckCircle, FaInfoCircle } from 'react-icons/fa'
import { useTrip } from '../context/TripContext'
import ToPDF from 'react-to-pdf'

function ReceiptPage() {
  const navigate = useNavigate()
  const receiptRef = useRef(null)
  const { 
    selectedDestinations, 
    passengerCount, 
    selectedCab, 
    tripDays, 
    personalDetails,
    paymentDetails,
    resetTrip
  } = useTrip()
  
  // Redirect if necessary information is missing
  useEffect(() => {
    if (
      selectedDestinations.length === 0 || 
      !selectedCab || 
      !personalDetails.name || 
      !personalDetails.email || 
      !personalDetails.phone
    ) {
      navigate('/')
    }
  }, [selectedDestinations, selectedCab, personalDetails, navigate])
  
  const handleDownloadPDF = () => {
    const options = {
      filename: `Trip_to_Paradise_Receipt_${new Date().toISOString().split('T')[0]}.pdf`,
      page: { margin: 20 }
    }
    
    ToPDF(receiptRef, options)
  }
  
  const handlePrint = () => {
    window.print()
  }
  
  const handleBookAnother = () => {
    resetTrip()
    navigate('/destinations')
  }

  return (
    <div className="pt-20 min-h-screen bg-neutral-50 pb-16">
      {/* Header */}
      <div className="bg-primary-600 py-12">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white text-center"
          >
            Your Booking Receipt
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white text-opacity-90 mt-2 text-center"
          >
            Thank you for booking with Trip to Paradise!
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-card p-6 md:p-8 mb-8"
          >
            {/* Receipt Actions */}
            <div className="flex flex-wrap gap-4 justify-end mb-6">
              <button
                onClick={handleDownloadPDF}
                className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded flex items-center transition-colors"
              >
                <FaDownload className="mr-2" />
                Download PDF
              </button>
              
              <button
                onClick={handlePrint}
                className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-2 px-4 rounded flex items-center transition-colors"
              >
                <FaPrint className="mr-2" />
                Print
              </button>
            </div>
            
            {/* Receipt Content */}
            <div 
              ref={receiptRef}
              className="border border-neutral-200 rounded-lg p-6 md:p-8"
            >
              <div className="text-center border-b border-neutral-200 pb-6 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-primary-600 mb-1">
                  Trip to Paradise
                </h2>
                <p className="text-neutral-500">
                  123, Kinathukadavu, Coimbatore – 641202, Tamil Nadu, India
                </p>
                <p className="text-neutral-500">
                  Phone: +91 6369941808 | Email: info@triptoparadise.com
                </p>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold mb-1">Booking Details</h3>
                  <p className="text-neutral-600">
                    Booking Date: {new Date().toLocaleDateString()}
                  </p>
                  <p className="text-neutral-600">
                    Booking ID: TTP-{Math.floor(100000 + Math.random() * 900000)}
                  </p>
                </div>
                
                <div className="bg-green-100 px-4 py-2 rounded-full flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2" />
                  <span className="text-green-700 font-medium">Payment {paymentDetails.paymentMethod === 'full' ? 'Completed' : 'Partial'}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-neutral-500">Name:</p>
                    <p className="font-medium">{personalDetails.name}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500">Email:</p>
                    <p className="font-medium">{personalDetails.email}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500">Phone:</p>
                    <p className="font-medium">{personalDetails.phone}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500">Travel Date:</p>
                    <p className="font-medium">{personalDetails.travelDate}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3">Trip Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-neutral-500">Destinations:</p>
                    <p className="font-medium">
                      {selectedDestinations.map(dest => dest.name).join(', ')}
                    </p>
                  </div>
                  <div>
                    <p className="text-neutral-500">Number of Passengers:</p>
                    <p className="font-medium">{passengerCount}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500">Transportation:</p>
                    <p className="font-medium">{selectedCab.name}</p>
                  </div>
                  <div>
                    <p className="text-neutral-500">Trip Duration:</p>
                    <p className="font-medium">{tripDays} days</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-neutral-200 pt-6 mb-6">
                <h3 className="text-lg font-bold mb-3">Payment Summary</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Destinations Total:</span>
                    <span className="font-medium flex items-center">
                      <FaRupeeSign className="text-xs mr-1" />
                      {selectedDestinations.reduce((sum, dest) => sum + dest.price, 0) * passengerCount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Transportation ({tripDays} days):</span>
                    <span className="font-medium flex items-center">
                      <FaRupeeSign className="text-xs mr-1" />
                      {selectedCab.pricePerDay * tripDays}
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total Amount:</span>
                    <span className="font-bold text-primary-600 flex items-center">
                      <FaRupeeSign className="mr-1" />
                      {paymentDetails.totalAmount}
                    </span>
                  </div>
                  
                  <div className="flex justify-between mt-2">
                    <span className="font-medium">Amount Paid:</span>
                    <span className="font-medium text-green-600 flex items-center">
                      <FaRupeeSign className="text-xs mr-1" />
                      {paymentDetails.paidAmount}
                    </span>
                  </div>
                  
                  {paymentDetails.paymentMethod === 'advance' && (
                    <div className="flex justify-between">
                      <span className="font-medium">Balance Due:</span>
                      <span className="font-medium text-secondary-600 flex items-center">
                        <FaRupeeSign className="text-xs mr-1" />
                        {paymentDetails.totalAmount - paymentDetails.paidAmount}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {paymentDetails.paymentMethod === 'advance' && (
                <div className="bg-neutral-100 p-4 rounded-lg flex items-start mb-6">
                  <FaInfoCircle className="text-neutral-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium">Payment Note:</h4>
                    <p className="text-neutral-600 text-sm">
                      You have paid 25% of the total amount. The remaining balance of ₹{paymentDetails.totalAmount - paymentDetails.paidAmount} must be paid at least 3 days before your trip starts on {personalDetails.travelDate}.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="text-center text-neutral-500 text-sm">
                <p>Thank you for choosing Trip to Paradise for your travel needs.</p>
                <p>We look forward to providing you with an unforgettable experience!</p>
              </div>
            </div>
          </motion.div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleBookAnother}
              className="bg-primary-500 hover:bg-primary-600 text-white py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
            >
              Book Another Trip
            </button>
            
            <Link 
              to="/"
              className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
            >
              <FaHome className="mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReceiptPage