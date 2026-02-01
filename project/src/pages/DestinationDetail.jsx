import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaRupeeSign, FaArrowLeft, FaPlus, FaMinus, FaCheck } from 'react-icons/fa'
import { getDestinationById } from '../data/destinations'
import { useTrip } from '../context/TripContext'

function DestinationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [destination, setDestination] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdded, setIsAdded] = useState(false)
  
  const { 
    selectedDestinations,
    setSelectedDestinations,
  } = useTrip()

  useEffect(() => {
    const fetchData = () => {
      const dest = getDestinationById(id)
      if (dest) {
        setDestination(dest)
        // Check if this destination is already in the selected list
        setIsAdded(selectedDestinations.some(d => d.id === dest.id))
      } else {
        // Destination not found
        navigate('/destinations')
      }
      setIsLoading(false)
    }
    
    fetchData()
  }, [id, navigate, selectedDestinations])

  const handleAddDestination = () => {
    if (isAdded) {
      // Remove from selected destinations
      setSelectedDestinations(prev => prev.filter(d => d.id !== destination.id))
      setIsAdded(false)
    } else {
      // Add to selected destinations
      setSelectedDestinations(prev => [...prev, destination])
      setIsAdded(true)
    }
  }

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-neutral-50">
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 overflow-hidden">
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold text-white mb-4"
              >
                {destination.name}
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex items-center text-white text-opacity-90"
              >
                <FaMapMarkerAlt className="mr-2" />
                <span>{destination.state}, India</span>
              </motion.div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-4 left-4">
          <Link 
            to="/destinations"
            className="bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full text-neutral-700 transition-all"
          >
            <FaArrowLeft />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-card p-6"
            >
              <h2 className="text-2xl font-bold mb-4">About {destination.name}</h2>
              <p className="text-neutral-700 mb-6">
                {destination.description}
              </p>
              
              <h3 className="text-xl font-bold mb-3">Highlights</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                {destination.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center text-neutral-700">
                    <span className="text-primary-500 mr-2">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
              
              <h3 className="text-xl font-bold mb-3">Best Time to Visit</h3>
              <p className="text-neutral-700 mb-6">
                The ideal time to visit {destination.name} is between October and March when the weather is pleasant and perfect for sightseeing and outdoor activities.
              </p>
              
              <h3 className="text-xl font-bold mb-3">Local Cuisine</h3>
              <p className="text-neutral-700">
                Don't miss the opportunity to try the local delicacies during your visit to {destination.name}. The region is known for its rich and flavorful traditional dishes that will leave you craving for more.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-card p-6 mt-6"
            >
              <h2 className="text-2xl font-bold mb-4">Travel Tips</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2 mt-1">•</span>
                  <p className="text-neutral-700">Carry light, comfortable clothing and a hat for sun protection.</p>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2 mt-1">•</span>
                  <p className="text-neutral-700">Keep a bottle of water handy to stay hydrated during sightseeing.</p>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2 mt-1">•</span>
                  <p className="text-neutral-700">Don't forget to carry some local currency for small purchases.</p>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2 mt-1">•</span>
                  <p className="text-neutral-700">Respect the local customs and traditions, especially when visiting temples.</p>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-500 mr-2 mt-1">•</span>
                  <p className="text-neutral-700">Try local street food, but make sure it's from a clean and popular vendor.</p>
                </li>
              </ul>
            </motion.div>
          </div>
          
          {/* Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-lg shadow-card p-6 sticky top-24"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <FaRupeeSign className="text-primary-600" />
                  <span className="text-2xl font-bold text-neutral-800 ml-1">{destination.price}</span>
                </div>
                <div className="text-sm text-neutral-500">per person</div>
              </div>
              
              <button
                onClick={handleAddDestination}
                className={`w-full py-3 px-4 rounded-md font-medium transition-colors flex items-center justify-center ${
                  isAdded
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-primary-500 hover:bg-primary-600 text-white'
                }`}
              >
                {isAdded ? (
                  <>
                    <FaCheck className="mr-2" />
                    Added to Itinerary
                  </>
                ) : (
                  <>
                    <FaPlus className="mr-2" />
                    Add to Itinerary
                  </>
                )}
              </button>
              
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-3">Package Includes:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-neutral-700">Guided tours to all major attractions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-neutral-700">Entrance fees to monuments and parks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-neutral-700">Local experiences and cultural activities</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold text-lg mb-3">Not Included:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-error mr-2">✗</span>
                    <span className="text-neutral-700">Personal expenses and gratuities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-error mr-2">✗</span>
                    <span className="text-neutral-700">Meals not mentioned in the itinerary</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-error mr-2">✗</span>
                    <span className="text-neutral-700">Travel insurance</span>
                  </li>
                </ul>
              </div>
              
              {selectedDestinations.length > 0 && (
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <Link 
                    to="/cab-selection"
                    className="w-full py-3 px-4 bg-secondary-500 hover:bg-secondary-600 text-white rounded-md font-medium transition-colors flex items-center justify-center"
                  >
                    Continue to Cab Selection
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DestinationDetail