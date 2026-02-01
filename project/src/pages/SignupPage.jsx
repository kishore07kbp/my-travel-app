import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaPhone } from 'react-icons/fa'
import { createUser } from '../services/api'
import { useAuth } from '../context/AuthContext'

function SignupPage() {
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [termsError, setTermsError] = useState('')
  const navigate = useNavigate()

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
    
    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits'
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!agreeTerms) {
      setTermsError('You must agree to the Terms and Conditions')
      return
    } else {
      setTermsError('')
    }

    if (validateForm()) {
      try {
        const user = await createUser({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        })
        // Auto-login: store user without password, then go to home
        const { password: _, ...safeUser } = user
        login(safeUser)
        navigate('/')
      } catch (err) {
        const msg = err.message || 'Registration failed'
        const isDuplicateEmail = msg.includes('duplicate key') || msg.includes('E11000')
        setErrors(prev => ({ ...prev, api: isDuplicateEmail ? 'This email is already registered' : msg }))
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
                <h1 className="text-3xl font-bold text-neutral-800">Create Account</h1>
                <p className="text-neutral-600 mt-2">
                  Join us to start planning your perfect trip
                </p>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-control ${errors.name ? 'border-error focus:border-error focus:ring-error' : ''}`}
                        placeholder="Full Name"
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
                    <label htmlFor="phone" className="form-label">Phone Number</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`form-control ${errors.phone ? 'border-error focus:border-error focus:ring-error' : ''}`}
                        placeholder="Phone Number"
                      />
                    </div>
                    {errors.phone && <p className="form-error">{errors.phone}</p>}
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
                  
                  <div>
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`form-control pr-10 ${errors.confirmPassword ? 'border-error focus:border-error focus:ring-error' : ''}`}
                        placeholder="Confirm Password"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="text-neutral-400 hover:text-neutral-600 focus:outline-none"
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </div>
                    {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={e => setAgreeTerms(e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-2 block text-sm text-neutral-600">
                      I agree to the{' '}
                      <a href="#" className="text-primary-600 hover:text-primary-700">
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                  
                  {termsError && <p className="form-error">{termsError}</p>}
                  {errors.api && <p className="form-error">{errors.api}</p>}
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full btn btn-primary py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!agreeTerms}
                      title={!agreeTerms ? 'Please agree to the Terms and Conditions' : ''}
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-neutral-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold">
                    Sign in
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

export default SignupPage