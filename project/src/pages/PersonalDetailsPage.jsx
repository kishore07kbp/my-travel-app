import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { useTrip } from '../context/TripContext'

function PersonalDetailsPage() {
  const navigate = useNavigate()
  const { personalDetails, setPersonalDetails, selectedDestinations, selectedCab } = useTrip()
  
  const [errors, setErrors] = useState({})
  
  // Redirect if no destinations or cab selected
  useEffect(() => {
    if (selectedDestinations.length === 0 || !selectedCab) {
      navigate('/destinations')
    }
  }, [selectedDestinations, selectedCab, navigate])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setPersonalDetails(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Name validation
    if (!personalDetails.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    // Email validation
    if (!personalDetails.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(personalDetails.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    // Phone validation
    if (!personalDetails.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(personalDetails.phone)) {
      newErrors.phone = 'Phone number must be 10 digits'
    }
    
    // Address validation
    if (!personalDetails.address.trim()) {
      newErrors.address = 'Address is required'
    }
    
    // Pickup location validation
    if (!personalDetails.pickupLocation.trim()) {
      newErrors.pickupLocation = 'Pickup location is required'
    }
    
    // Travel date validation
    if (!personalDetails.travelDate) {
      newErrors.travelDate = 'Travel date is required'
    } else {
      const selectedDate = new Date(personalDetails.travelDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (selectedDate < today) {
        newErrors.travelDate = 'Travel date cannot be in the past'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      navigate('/payment')
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-neutral-50 pb-16">
      {/* Header */}
      <div className="bg-primary-600 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <Link to="/cab-selection" className="text-white flex items-center hover:underline">
              <FaArrowLeft className="mr-2" />
              Back to Transportation
            </Link>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white"
          >
            Personal Details
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white text-opacity-90 mt-2"
          >
            Please provide your information to complete your booking
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-card p-6 md:p-8"
          >
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                </div>
                
                <div>
                  <label htmlFor="name" className="form-label flex items-center">
                    <FaUser className="mr-2 text-primary-500" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={personalDetails.name}
                    onChange={handleChange}
                    className={`form-control ${errors.name ? 'border-error focus:border-error focus:ring-error' : ''}`}
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="form-label flex items-center">
                    <FaEnvelope className="mr-2 text-primary-500" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={personalDetails.email}
                    onChange={handleChange}
                    className={`form-control ${errors.email ? 'border-error focus:border-error focus:ring-error' : ''}`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="phone" className="form-label flex items-center">
                    <FaPhone className="mr-2 text-primary-500" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={personalDetails.phone}
                    onChange={handleChange}
                    className={`form-control ${errors.phone ? 'border-error focus:border-error focus:ring-error' : ''}`}
                    placeholder="1234567890"
                  />
                  {errors.phone && <p className="form-error">{errors.phone}</p>}
                </div>
                
                <div>
                  <label htmlFor="travelDate" className="form-label flex items-center">
                    <FaCalendarAlt className="mr-2 text-primary-500" />
                    Travel Date
                  </label>
                  <input
                    type="date"
                    id="travelDate"
                    name="travelDate"
                    value={personalDetails.travelDate}
                    onChange={handleChange}
                    className={`form-control ${errors.travelDate ? 'border-error focus:border-error focus:ring-error' : ''}`}
                  />
                  {errors.travelDate && <p className="form-error">{errors.travelDate}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <h2 className="text-xl font-bold mb-4 mt-4">Address Details</h2>
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="address" className="form-label flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-primary-500" />
                    Residential Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={personalDetails.address}
                    onChange={handleChange}
                    rows="3"
                    className={`form-control ${errors.address ? 'border-error focus:border-error focus:ring-error' : ''}`}
                    placeholder="Enter your full address"
                  ></textarea>
                  {errors.address && <p className="form-error">{errors.address}</p>}
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="pickupLocation" className="form-label flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-primary-500" />
                    Pickup Location
                  </label>
                  <textarea
                    id="pickupLocation"
                    name="pickupLocation"
                    value={personalDetails.pickupLocation}
                    onChange={handleChange}
                    rows="3"
                    className={`form-control ${errors.pickupLocation ? 'border-error focus:border-error focus:ring-error' : ''}`}
                    placeholder="Where should we pick you up from?"
                  ></textarea>
                  {errors.pickupLocation && <p className="form-error">{errors.pickupLocation}</p>}
                </div>
                
                <div className="md:col-span-2 mt-4">
                  <button
                    type="submit"
                    className="w-full md:w-auto float-right btn btn-primary btn-lg flex items-center"
                  >
                    Proceed to Payment
                    <FaArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Add missing useEffect import
import { useEffect } from 'react'

export default PersonalDetailsPage