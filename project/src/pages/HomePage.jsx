import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaMapMarkedAlt, FaCar, FaWallet, FaRegSmile } from 'react-icons/fa'
import { useTrip } from '../context/TripContext'
import { useEffect } from 'react'

function HomePage() {
  const { resetTrip } = useTrip()

  useEffect(() => {
    resetTrip()
  }, [])

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-screen">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/photo/4k.jpg')",
            backgroundPosition: "center 25%"
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Discover the Paradise in South India
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Explore breathtaking destinations in Tamil Nadu, Kerala, and Karnataka
            </p>
            <Link 
              to="/destinations" 
              className="btn btn-primary btn-lg"
            >
              Explore Destinations
            </Link>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center">
            <motion.div 
              className="w-1 h-2 bg-white rounded-full mt-2"
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </div>
        </motion.div>
      </div>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">How It Works</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Booking your perfect getaway is easy with our simple 4-step process
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-card text-center"
            >
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaMapMarkedAlt size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Choose Destinations</h3>
              <p className="text-neutral-600">
                Select from our curated list of beautiful destinations across South India
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-card text-center"
            >
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCar size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Select Transportation</h3>
              <p className="text-neutral-600">
                Choose from our fleet of comfortable cars, vans, and buses
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-card text-center"
            >
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaWallet size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Payment</h3>
              <p className="text-neutral-600">
                Secure payment methods with full or partial payment options
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white p-6 rounded-lg shadow-card text-center"
            >
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaRegSmile size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Enjoy Your Trip</h3>
              <p className="text-neutral-600">
                Relax and enjoy your perfectly planned vacation
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Destination Highlights */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">Popular Destinations</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Explore the most captivating places across Tamil Nadu, Kerala, and Karnataka
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <motion.div variants={item} className="overflow-hidden rounded-lg shadow-card group">
              <Link to="/destinations/tamil-nadu">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src="/photo/kanya.jpg" 
                    alt="Tamil Nadu" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white">Tamil Nadu</h3>
                      <p className="text-white text-opacity-80">8 Destinations</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={item} className="overflow-hidden rounded-lg shadow-card group">
              <Link to="/destinations/kerala">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src="/photo/mun.jpg" 
                    alt="Kerala" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white">Kerala</h3>
                      <p className="text-white text-opacity-80">8 Destinations</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div variants={item} className="overflow-hidden rounded-lg shadow-card group">
              <Link to="/destinations/karnataka">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src="/photo/train.jpg" 
                    alt="Karnataka" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white">Karnataka</h3>
                      <p className="text-white text-opacity-80">8 Destinations</p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>

          <div className="text-center mt-12">
            <Link to="/destinations" className="btn btn-outline btn-lg">
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary-500 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ffffff" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,192C1248,192,1344,128,1392,96L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready for an Unforgettable Adventure?</h2>
            <p className="text-xl mb-8">
              Start planning your perfect South Indian getaway today with Trip to Paradise and create memories that last a lifetime.
            </p>
            <Link to="/destinations" className="btn bg-white text-primary-600 hover:bg-neutral-100 btn-lg">
              Plan Your Trip Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HomePage