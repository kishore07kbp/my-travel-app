import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { loginUser } from '../services/api'

function LoginPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
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
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      try {
        const user = await loginUser(formData.email, formData.password)
        login({
          _id: user._id,
          name: user.name,
          email: user.email,
        })
        navigate('/')
      } catch (err) {
        const msg = err.message || 'Login failed'
        if (msg.toLowerCase().includes('password')) {
          setErrors({ password: msg })
        } else if (msg.toLowerCase().includes('not found')) {
          setErrors({ email: msg })
        } else {
          setErrors({ api: msg })
        }
      }
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-neutral-50 flex flex-col justify-center py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-card overflow-hidden"
          >
            <div className="p-6 sm:p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-neutral-800">Welcome Back</h1>
                <p className="text-neutral-600 mt-2">
                  Sign in to continue to your account
                </p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="name" className="form-label">Name</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-control ${errors.name ? 'border-error focus:border-error focus:ring-error' : ''}`}
                        placeholder="Name"
                      />
                    </div>
                    {errors.name && <p className="form-error">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-control ${errors.email ? 'border-error focus:border-error focus:ring-error' : ''}`}
                        placeholder="Email Address"
                      />
                    </div>
                    {errors.email && <p className="form-error">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`form-control pr-10 ${errors.password ? 'border-error focus:border-error focus:ring-error' : ''}`}
                        placeholder="Password"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-neutral-400 hover:text-neutral-600 focus:outline-none"
                        >
                          {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                    {errors.password && <p className="form-error">{errors.password}</p>}
                  </div>
                  {errors.api && <p className="form-error">{errors.api}</p>}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-600">
                        Remember me
                      </label>
                    </div>
                    
                    <div className="text-sm">
                      <a href="#" className="text-primary-600 hover:text-primary-700 font-semibold">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full btn btn-primary py-2"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-neutral-600">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-semibold">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage