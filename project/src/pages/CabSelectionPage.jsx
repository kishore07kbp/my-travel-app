import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCarSide, FaBus, FaUsers, FaCalendarAlt, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { cars, coachVans, tourBuses, getTransportByPassengerCount } from '../data/transportOptions'
import { useTrip } from '../context/TripContext'

function CabSelectionPage() {
  const navigate = useNavigate()
  const { 
    selectedDestinations,
    passengerCount,
    setPassengerCount,
    selectedCab,
    setSelectedCab,
    tripDays,
    setTripDays
  } = useTrip()
  
  const [activeTab, setActiveTab] = useState('all')
  const [availableTransport, setAvailableTransport] = useState([])
  const [carouselIndexes, setCarouselIndexes] = useState({})
  
  // Redirect if no destinations selected
  useEffect(() => {
    if (selectedDestinations.length === 0) {
      navigate('/destinations')
    }
  }, [selectedDestinations, navigate])
  
  // Filter transport options based on passenger count
  useEffect(() => {
    const filteredOptions = getTransportByPassengerCount(passengerCount)
    
    if (activeTab === 'all') {
      setAvailableTransport(filteredOptions)
    } else if (activeTab === 'car') {
      setAvailableTransport(filteredOptions.filter(option => option.type === 'car'))
    } else if (activeTab === 'van') {
      setAvailableTransport(filteredOptions.filter(option => option.type === 'van'))
    } else if (activeTab === 'bus') {
      setAvailableTransport(filteredOptions.filter(option => option.type === 'bus'))
    }
  }, [activeTab, passengerCount])
  
  // Validate selected cab whenever passenger count changes
  useEffect(() => {
    if (selectedCab && selectedCab.capacity < passengerCount) {
      setSelectedCab(null)
    }
  }, [passengerCount, selectedCab, setSelectedCab])

  const handlePassengerCountChange = (e) => {
    const value = parseInt(e.target.value)
    if (value >= 1 && value <= 52) {
      setPassengerCount(value)
    }
  }

  const handleTripDaysChange = (e) => {
    const value = parseInt(e.target.value)
    if (value >= 1 && value <= 30) {
      setTripDays(value)
    }
  }

  const handleCabSelection = (cab) => {
    setSelectedCab(cab)
  }

  const handleContinue = () => {
    if (selectedCab) {
      navigate('/personal-details')
    }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  }

  return (
    <div className="pt-20 min-h-screen bg-neutral-50 pb-16">
      {/* Header */}
      <div className="bg-primary-600 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <Link to="/destinations" className="text-white flex items-center hover:underline">
              <FaArrowLeft className="mr-2" />
              Back to Destinations
            </Link>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white"
          >
            Choose Your Transportation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white text-opacity-90 mt-2"
          >
            Select the perfect vehicle for your journey
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Filters and Trip Details */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-card p-6 sticky top-24"
            >
              <h2 className="text-xl font-bold mb-4">Trip Details</h2>
              
              <div className="mb-4">
                <label htmlFor="passengerCount" className="form-label flex items-center">
                  <FaUsers className="mr-2 text-primary-500" />
                  Number of Passengers
                </label>
                <input
                  type="number"
                  id="passengerCount"
                  min="1"
                  max="52"
                  value={passengerCount}
                  onChange={handlePassengerCountChange}
                  className="form-control"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="tripDays" className="form-label flex items-center">
                  <FaCalendarAlt className="mr-2 text-primary-500" />
                  Number of Days
                </label>
                <input
                  type="number"
                  id="tripDays"
                  min="1"
                  max="30"
                  value={tripDays}
                  onChange={handleTripDaysChange}
                  className="form-control"
                />
              </div>
              
              <h3 className="font-semibold mb-2">Selected Destinations:</h3>
              <ul className="mb-6 text-sm">
                {selectedDestinations.map((dest) => (
                  <li key={dest.id} className="py-1 border-b border-neutral-100 last:border-b-0">
                    {dest.name}, {dest.state}
                  </li>
                ))}
              </ul>
              
              <h3 className="font-semibold mb-2">Filter by Type:</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    activeTab === 'all'
                      ? 'bg-primary-500 text-white'
                      : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                  }`}
                >
                  All Types
                </button>
                <button
                  onClick={() => setActiveTab('car')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    activeTab === 'car'
                      ? 'bg-primary-500 text-white'
                      : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                  }`}
                >
                  Cars
                </button>
                <button
                  onClick={() => setActiveTab('van')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    activeTab === 'van'
                      ? 'bg-primary-500 text-white'
                      : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                  }`}
                >
                  Coach Vans
                </button>
                <button
                  onClick={() => setActiveTab('bus')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    activeTab === 'bus'
                      ? 'bg-primary-500 text-white'
                      : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                  }`}
                >
                  Tour Buses
                </button>
              </div>
              
              {selectedCab && (
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <h3 className="font-semibold mb-2">Selected Vehicle:</h3>
                  <div className="flex items-center mb-4">
                    <div className="bg-primary-100 p-2 rounded-full text-primary-600 mr-3">
                      {selectedCab.type === 'car' && <FaCarSide />}
                      {selectedCab.type === 'van' && <FaBus />}
                      {selectedCab.type === 'bus' && <FaBus />}
                    </div>
                    <div>
                      <div className="font-medium">{selectedCab.name}</div>
                      <div className="text-sm text-neutral-500">₹{selectedCab.pricePerDay} per day</div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleContinue}
                    className="w-full py-2 px-4 bg-secondary-500 hover:bg-secondary-600 text-white rounded-md font-medium transition-colors flex items-center justify-center"
                  >
                    Continue to Details
                    <FaArrowRight className="ml-2" />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
          
          {/* Right Column - Transport Options */}
          <div className="lg:col-span-2">
            {availableTransport.length > 0 ? (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {availableTransport.map((transport) => {
                  const hasImagesArray = Array.isArray(transport.images)
                  const images = hasImagesArray ? transport.images : [transport.image]
                  const currentImage = carouselIndexes[transport.id] || 0
                  const handlePrev = (id, imagesLength, e) => {
                    e.stopPropagation()
                    setCarouselIndexes(prev => {
                      const currentIdx = prev[id] || 0
                      const totalItems = imagesLength + (transport.video ? 1 : 0)
                      
                      if (currentIdx === 0) {
                        return { ...prev, [id]: totalItems - 1 } // Go to video
                      } else if (currentIdx === imagesLength) {
                        return { ...prev, [id]: imagesLength - 1 } // Go to last image
                      } else {
                        return { ...prev, [id]: currentIdx - 1 } // Go to previous image
                      }
                    })
                  }
                  const handleNext = (id, imagesLength, e) => {
                    e.stopPropagation()
                    setCarouselIndexes(prev => ({
                      ...prev,
                      [id]: prev[id] < imagesLength - 1 ? prev[id] + 1 : 0
                    }))
                  }
                  return (
                    <motion.div
                      key={transport.id}
                      variants={item}
                      className={`bg-white rounded-lg shadow-card overflow-hidden cursor-pointer transition-all ${
                        selectedCab && selectedCab.id === transport.id
                          ? 'ring-2 ring-primary-500 transform scale-[1.02]'
                          : 'hover:shadow-card-hover'
                      }`}
                      onClick={() => handleCabSelection(transport)}
                    >
                      <div className="h-48 overflow-hidden relative flex items-center justify-center">
                        {images.length > 1 && (
                          <button
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 z-10"
                            onClick={e => handlePrev(transport.id, images.length, e)}
                          >
                            <FaArrowLeft />
                          </button>
                        )}
                        <AnimatePresence mode="wait">
                          {currentImage < images.length ? (
                            <motion.img
                              key={images[currentImage]}
                              src={images[currentImage]}
                              alt={transport.name}
                              className={`w-full object-cover object-top${transport.type === 'van' ? '' : ' h-full'}`}
                              style={(transport.name === 'Kaalayan Travels' || transport.name === 'Pettakaran Travels') && currentImage === 0 ? { height: '120%' } : transport.name === 'Komban Travels' && currentImage === 0 ? { height: '113%' } : transport.name === 'Kumaran Travels' && currentImage === 0 ? { height: '153%' } : currentImage === 1 ? { height: '170%' } : {}}                              
                              initial={{ opacity: 0, scale: 0.98 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.98 }}
                              transition={{ duration: 0.1, ease: "linear" }}
                            />
                          ) : transport.video ? (
                            <motion.video
                              key="video"
                              autoPlay
                              loop
                              muted
                              playsInline
                              preload="auto"
                              className="w-full h-full object-cover"
                              initial={{ opacity: 0, scale: 0.98 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.98 }}
                              transition={{ duration: 0.1, ease: "linear" }}
                            >
                              <source src={transport.video} type="video/mp4" />
                            </motion.video>
                          ) : null}
                        </AnimatePresence>
                        {images.length > 1 && (
                          <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 z-10"
                            onClick={e => handleNext(transport.id, images.length + (transport.video ? 1 : 0), e)}
                          >
                            <FaArrowRight />
                          </button>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold">{transport.name}</h3>
                          <div className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                            {transport.type === 'car' ? 'Car' : transport.type === 'van' ? 'Coach Van' : 'Tour Bus'}
                          </div>
                        </div>
                        
                        <div className="flex items-center mb-3">
                          <FaUsers className="text-neutral-500 mr-1" />
                          <span className="text-sm text-neutral-600">Up to {transport.capacity} passengers</span>
                        </div>
                        
                        <div className="font-bold text-lg mb-3">
                          ₹{transport.pricePerDay} <span className="text-neutral-500 text-sm font-normal">per day</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {transport.features.slice(0, 4).map((feature, index) => (
                            <span
                              key={index}
                              className="bg-neutral-100 text-neutral-700 text-xs px-2 py-1 rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                          {transport.features.length > 4 && (
                            <span className="bg-neutral-100 text-neutral-700 text-xs px-2 py-1 rounded-full">
                              +{transport.features.length - 4} more
                            </span>
                          )}
                        </div>
                        
                        <button
                          onClick={() => handleCabSelection(transport)}
                          className={`w-full py-2 text-center rounded transition-colors ${
                            selectedCab && selectedCab.id === transport.id
                              ? 'bg-primary-500 text-white'
                              : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                          }`}
                        >
                          {selectedCab && selectedCab.id === transport.id ? 'Selected' : 'Select'}
                        </button>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            ) : (
              <div className="bg-white rounded-lg shadow-card p-8 text-center">
                <div className="text-neutral-500 mb-4">
                  <FaBus size={48} className="mx-auto mb-4 text-neutral-300" />
                  <p className="text-lg">
                    No vehicles available for {passengerCount} passengers.
                  </p>
                  <p className="mt-2">
                    Please adjust the number of passengers or select a different type.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CabSelectionPage