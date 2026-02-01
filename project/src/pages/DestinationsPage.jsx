import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaRupeeSign } from 'react-icons/fa'
import { destinations, getAllDestinations } from '../data/destinations'

function DestinationsPage() {
  const { state } = useParams()
  const navigate = useNavigate()
  const [activeState, setActiveState] = useState(state || 'all')
  const [destinationsToShow, setDestinationsToShow] = useState([])
  
  // Set destinations based on selected state
  useEffect(() => {
    if (state) {
      setActiveState(state)
    }
    
    if (activeState === 'all') {
      setDestinationsToShow(getAllDestinations())
    } else {
      setDestinationsToShow(destinations[activeState] || [])
    }
  }, [activeState, state])

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
    <div className="pt-20 bg-neutral-50">
      {/* Hero Section */}
      <div className="relative py-20 bg-primary-600 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40L40 0H20L0 20M40 40V20L20 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Explore Beautiful Destinations
            </h1>
            <p className="text-xl text-white text-opacity-90 mb-0">
              Discover the gems of South India with our curated selection of premium destinations
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex overflow-x-auto pb-2 justify-center flex-wrap gap-4">
          <button
            onClick={() => { setActiveState('all'); navigate('/destinations/all', { replace: true }) }}
            className={`px-4 py-2 rounded-full ${
              activeState === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-neutral-700 hover:bg-neutral-100'
            } transition-colors whitespace-nowrap shadow-sm`}
          >
            All Destinations
          </button>
          <button
            onClick={() => { setActiveState('tamil-nadu'); navigate('/destinations/tamil-nadu', { replace: true }) }}
            className={`px-4 py-2 rounded-full ${
              activeState === 'tamil-nadu'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-neutral-700 hover:bg-neutral-100'
            } transition-colors whitespace-nowrap shadow-sm`}
          >
            Tamil Nadu
          </button>
          <button
            onClick={() => { setActiveState('kerala'); navigate('/destinations/kerala', { replace: true }) }}
            className={`px-4 py-2 rounded-full ${
              activeState === 'kerala'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-neutral-700 hover:bg-neutral-100'
            } transition-colors whitespace-nowrap shadow-sm`}
          >
            Kerala
          </button>
          <button
            onClick={() => { setActiveState('karnataka'); navigate('/destinations/karnataka', { replace: true }) }}
            className={`px-4 py-2 rounded-full ${
              activeState === 'karnataka'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-neutral-700 hover:bg-neutral-100'
            } transition-colors whitespace-nowrap shadow-sm`}
          >
            Karnataka
          </button>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="container mx-auto px-4 py-8 pb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {destinationsToShow.map((destination) => (
            <motion.div 
              key={destination.id} 
              variants={item}
              className="card overflow-hidden group"
            >
              <Link to={`/destination/${destination.id}`}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded text-sm font-medium text-primary-600 flex items-center">
                    <FaRupeeSign size={14} className="mr-1" />
                    {destination.price} per person
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center text-sm text-neutral-500 mb-2">
                    <FaMapMarkerAlt className="mr-1 text-secondary-500" />
                    {destination.state}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-neutral-800 group-hover:text-primary-600 transition-colors">
                    {destination.name}
                  </h3>
                  <p className="text-neutral-600 text-sm line-clamp-2 mb-4">
                    {destination.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights.slice(0, 2).map((highlight, index) => (
                      <span 
                        key={index}
                        className="inline-block bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded"
                      >
                        {highlight}
                      </span>
                    ))}
                    {destination.highlights.length > 2 && (
                      <span className="inline-block bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded">
                        +{destination.highlights.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export default DestinationsPage