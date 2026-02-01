import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHome } from 'react-icons/fa'

function NotFoundPage() {
  return (
    <div className="h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-primary-500">404</h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mt-4 mb-2">Page Not Found</h2>
          <p className="text-neutral-600 text-xl max-w-md mx-auto mb-8">
            The page you are looking for might have been removed or is temporarily unavailable.
          </p>
          
          <Link 
            to="/" 
            className="btn btn-primary inline-flex items-center"
          >
            <FaHome className="mr-2" />
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFoundPage