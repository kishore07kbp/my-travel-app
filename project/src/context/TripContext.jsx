import { createContext, useContext, useState, useEffect, useRef } from 'react'

const TripContext = createContext(null)

export function TripContextProvider({ children }) {
  // Initialize state from localStorage if available
  const [selectedDestinations, setSelectedDestinations] = useState(() => {
    const saved = localStorage.getItem('selectedDestinations')
    return saved ? JSON.parse(saved) : []
  })
  
  const [passengerCount, setPassengerCount] = useState(() => {
    const saved = localStorage.getItem('passengerCount')
    return saved ? parseInt(saved) : 1
  })
  
  const [selectedCab, setSelectedCab] = useState(() => {
    const saved = localStorage.getItem('selectedCab')
    return saved ? JSON.parse(saved) : null
  })
  
  const [tripDays, setTripDays] = useState(() => {
    const saved = localStorage.getItem('tripDays')
    return saved ? parseInt(saved) : 1
  })
  
  const [personalDetails, setPersonalDetails] = useState(() => {
    const saved = localStorage.getItem('personalDetails')
    return saved ? JSON.parse(saved) : {
      name: '',
      email: '',
      phone: '',
      address: '',
      pickupLocation: '',
      travelDate: '',
    }
  })
  
  const [paymentDetails, setPaymentDetails] = useState(() => {
    const saved = localStorage.getItem('paymentDetails')
    return saved ? JSON.parse(saved) : {
      totalAmount: 0,
      paidAmount: 0,
      paymentMethod: 'full', // 'full' or 'advance'
      paymentStatus: 'pending', // 'pending', 'completed', 'failed'
    }
  })

  const isFirstRender = useRef(true);

  // Calculate total amount based on selections
  const calculateTotalAmount = () => {
    if (!selectedDestinations.length || !selectedCab) return 0
    
    const destinationsPrice = selectedDestinations.reduce((sum, dest) => sum + dest.price, 0)
    const basePrice = destinationsPrice * passengerCount
    const cabPrice = selectedCab.pricePerDay * tripDays
    
    return basePrice + cabPrice
  }

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('selectedDestinations', JSON.stringify(selectedDestinations))
    localStorage.setItem('passengerCount', passengerCount.toString())
    localStorage.setItem('selectedCab', JSON.stringify(selectedCab))
    localStorage.setItem('tripDays', tripDays.toString())
    localStorage.setItem('personalDetails', JSON.stringify(personalDetails))
    localStorage.setItem('paymentDetails', JSON.stringify(paymentDetails))
  }, [selectedDestinations, passengerCount, selectedCab, tripDays, personalDetails, paymentDetails])

  // Update total amount when selections change, but avoid infinite loop
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const totalAmount = calculateTotalAmount();
    const paymentMethod = paymentDetails.paymentMethod || 'full';
    const newPaidAmount = paymentMethod === 'full'
      ? totalAmount
      : totalAmount * 0.25;
    // Only update if values actually change
    if (
      paymentDetails.totalAmount !== totalAmount ||
      paymentDetails.paidAmount !== newPaidAmount
    ) {
    setPaymentDetails(prev => ({
      ...prev,
      totalAmount,
        paidAmount: newPaidAmount
      }));
    }
  }, [selectedDestinations, passengerCount, selectedCab, tripDays, paymentDetails.paymentMethod]);

  const resetTrip = () => {
    setSelectedDestinations([])
    setPassengerCount(1)
    setSelectedCab(null)
    setTripDays(1)
    setPersonalDetails({
      name: '',
      email: '',
      phone: '',
      address: '',
      pickupLocation: '',
      travelDate: '',
    })
    setPaymentDetails({
      totalAmount: 0,
      paidAmount: 0,
      paymentMethod: 'full',
      paymentStatus: 'pending',
    })
  }

  const value = {
    selectedDestinations,
    setSelectedDestinations,
    passengerCount,
    setPassengerCount,
    selectedCab,
    setSelectedCab,
    tripDays,
    setTripDays,
    personalDetails,
    setPersonalDetails,
    paymentDetails,
    setPaymentDetails,
    calculateTotalAmount,
    resetTrip
  }

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>
}

export function useTrip() {
  const context = useContext(TripContext)
  if (!context) {
    throw new Error('useTrip must be used within a TripContextProvider')
  }
  return context
}