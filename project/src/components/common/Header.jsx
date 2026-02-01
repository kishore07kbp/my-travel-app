import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBars, FaTimes, FaUser } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const location = useLocation()
  const { user, logout } = useAuth()

  // Update scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const isTransparent = scrollY < 50 && location.pathname === '/'
  
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isTransparent ? 'bg-transparent' : 'bg-white shadow-md'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <img src="/photo/Logo.png" alt="Logo" className="h-10 mr-3" />
              <span className={`text-2xl font-display font-bold ${isTransparent ? 'text-white' : 'text-primary-600'}`}>
                Trip to <span className="text-secondary-500">Paradise</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <NavLink 
                to="/" 
                onClick={() => window.scrollTo(0, 0)}
                className={({ isActive }) => `${isTransparent ? 'text-white hover:text-white/80' : 'text-neutral-700 hover:text-primary-600'} ${isActive ? 'font-semibold' : 'font-medium'}`}
              >
                Home
              </NavLink>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <NavLink 
                to="/destinations" 
                className={({ isActive }) => `${isTransparent ? 'text-white hover:text-white/80' : 'text-neutral-700 hover:text-primary-600'} ${isActive ? 'font-semibold' : 'font-medium'}`}
              >
                Destinations
              </NavLink>
            </motion.div>
            
            {user ? (
              <>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex items-center"
                >
                  <div className={`flex items-center ${isTransparent ? 'text-white' : 'text-neutral-700'}`}>
                    <FaUser className="mr-2" />
                    <span>Welcome, {user.name}</span>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <button 
                    onClick={logout}
                    className="btn btn-primary btn-sm"
                  >
                    Logout
                  </button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <NavLink 
                    to="/login" 
                    className={({ isActive }) => `${isTransparent ? 'text-white hover:text-white/80' : 'text-neutral-700 hover:text-primary-600'} ${isActive ? 'font-semibold' : 'font-medium'}`}
                  >
                    Login
                  </NavLink>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <NavLink 
                    to="/signup" 
                    className="btn btn-primary btn-sm"
                  >
                    Sign Up
                  </NavLink>
                </motion.div>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`${isTransparent ? 'text-white' : 'text-neutral-700'} focus:outline-none`}
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          height: isOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
        className={`md:hidden overflow-hidden bg-white`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <NavLink 
            to="/" 
            onClick={() => window.scrollTo(0, 0)}
            className={({ isActive }) => `py-2 ${isActive ? 'text-primary-600 font-semibold' : 'text-neutral-700'}`}
          >
            Home
          </NavLink>
          <NavLink 
            to="/destinations" 
            className={({ isActive }) => `py-2 ${isActive ? 'text-primary-600 font-semibold' : 'text-neutral-700'}`}
          >
            Destinations
          </NavLink>
          
          {user ? (
            <>
              <div className="py-2 text-neutral-700 flex items-center">
                <FaUser className="mr-2" />
                Welcome, {user.name}
              </div>
              <button 
                onClick={logout}
                className="btn btn-primary w-full text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink 
                to="/login" 
                className={({ isActive }) => `py-2 ${isActive ? 'text-primary-600 font-semibold' : 'text-neutral-700'}`}
              >
                Login
              </NavLink>
              <NavLink 
                to="/signup" 
                className="btn btn-primary w-full text-center"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </motion.div>
    </header>
  )
}

export default Header