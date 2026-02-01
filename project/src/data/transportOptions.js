export const cars = [
  {
    id: 'car-1',
    name: 'Toyota Innova Crysta',
    image: '/photo/Toyota Innova Crysta.jpg.webp',
    capacity: 8,
    pricePerDay: 3500,
    features: ['AC', 'Music System', 'Comfortable Seating', 'Luggage Space'],
    type: 'car'
  },
  {
    id: 'car-2',
    name: 'Maruti Suzuki Ertiga',
    image: '/photo/ertiga.jpg',
    capacity: 8,
    pricePerDay: 2600,
    features: ['AC', 'Music System', 'Comfortable Seating', 'Fuel Efficient'],
    type: 'car'
  },
  {
    id: 'car-3',
    name: 'Maruti Suzuki XL6',
    image: '/photo/xl6.webp',
    capacity: 6,
    pricePerDay: 2500,
    features: ['AC', 'Music System', 'Premium Interiors', 'USB Charging'],
    type: 'car'
  },
  {
    id: 'car-4',
    name: 'Honda City',
    image: '/photo/city.webp',
    capacity: 4,
    pricePerDay: 2200,
    features: ['AC', 'Music System', 'Comfortable Seating', 'Fuel Efficient'],
    type: 'car'
  },
  {
    id: 'car-5',
    name: 'Maruti Suzuki Dzire',
    image: '/photo/dzire2.jpeg',
    capacity: 4,
    pricePerDay: 2000,
    features: ['AC', 'Music System', 'Fuel Efficient', 'Compact'],
    type: 'car'
  }
]

export const coachVans = [
  {
    id: 'van-1',
    name: 'MOMZ Travels',
    images: [
      '/bus/momz3.jpg',
      '/bus/momz1.jpg',
      '/bus/momz2.jpg'
    ],
    capacity: 30,
    pricePerDay: 15000,
    features: ['AC', 'Push Back Seats', 'LCD TV', 'DJ Light and Music'],
    type: 'van'
  },
  {
    id: 'van-2',
    name: 'SPS Travels',
    images: [
      '/bus/sps3.jpg',
      '/bus/sps2.jpg',
      '/bus/sps1.jpg'
    ],
    capacity: 30,
    pricePerDay: 15000,
    features: ['AC', 'Push Back Seats', 'LCD TV', 'DJ Light and Music'],
    type: 'van'
  },
  {
    id: 'van-3',
    name: 'Sathyamoorthy Travels',
    images: [
      '/bus/sath1.jpg',
      '/bus/sath2.jpg',
      '/bus/sath3.jpg'
    ],
    capacity: 30,
    pricePerDay: 15000,
    features: ['AC', 'Push Back Seats', 'LCD TV', 'DJ Light and Music'],
    type: 'van'
  },
  {
    id: 'van-4',
    name: 'Express Travels',
    images: [
      '/bus/exp4.jpg',
      '/bus/exp2.jpg',
      '/bus/exp1.jpg',
      '/bus/exp3.jpg'
    ],
    capacity: 30,
    pricePerDay: 15000,
    features: ['AC', 'Push Back Seats', 'LCD TV', 'DJ Light and Music'],
    type: 'van'
  },
  {
    id: 'van-5',
    name: 'VPS Travels',
    images: ['/bus/vps1.jpg', '/bus/vps2.jpg'],  // Changed from single image to array of images
    capacity: 30,
    pricePerDay: 15000,
    features: ['AC', 'Push Back Seats', 'LCD TV', 'DJ Light and Music'],
    type: 'van'
  }
]

export const tourBuses = [
  {
    id: 'bus-1',
    name: 'Kaalayan Travels',
    images: [
      '/bus/kaalayan1.jpg',
      '/bus/kaalayan2.jpg'
    ],
    video: '/bus/kaalayan-v2.mp4',
    capacity: 52,
    pricePerDay: 35000,
    features: ['AC', 'Push Back Seats', 'LCD TV', 'Ample Luggage Space', 'Toilet'],
    type: 'bus'
  },
  {
    id: 'bus-2',
    name: 'Pettakaran Travels',
    images: [
      '/bus/petta1.jpg',
      '/bus/petta3.jpg'
    ],
    video: '/bus/petta-v1.mp4',
    capacity: 52,
    pricePerDay: 35000,
    features: ['AC', 'Push Back Seats', 'LCD TV', 'Ample Luggage Space', 'Toilet', 'Charging Points'],
    type: 'bus'
  },
  {
    id: 'bus-3',
    name: 'Komban Travels',
    images: [
      '/bus/kom1.jpg',
      '/bus/kom3.jpg',
      '/bus/kom2.jpg'
    ],
    video: '/bus/komban.mp4',
    capacity: 52,
    pricePerDay: 35000,
    features: ['AC', 'Push Back Seats', 'LCD TV', 'Ample Luggage Space', 'Toilet', 'Charging Points', 'WiFi'],
    type: 'bus'
  },
  {
    id: 'bus-4',
    name: 'Kumaran Travels',
    images: [
      '/bus/kum1.jpg',
      '/bus/kum2.jpg',
      '/bus/kum3.jpg'
    ],
    video: '/bus/kum-v1.mp4',
    capacity: 52,
    pricePerDay: 35000,
    features: ['AC', 'Push Back Seats', 'LCD TV', 'Ample Luggage Space', 'Toilet', 'Charging Points', 'WiFi', 'Snack Service'],
    type: 'bus'
  },
  {
    id: 'bus-5',
    name: 'SMT Travels',
    images: [
      '/bus/smt2.jpg',
      '/bus/smt3.jpg',
      '/bus/smt4.jpg',
      '/bus/smt5.jpg'
    ],
    video: '/bus/smt-v1.mp4',
    capacity: 52,
    pricePerDay: 35000,
    features: ['AC', 'Push Back Seats', 'LCD TV', 'Ample Luggage Space', 'Toilet', 'Charging Points', 'WiFi', 'Snack Service', 'Recliner Seats'],
    type: 'bus'
  }
]

// Helper function to get all transport options
export const getAllTransportOptions = () => {
  return [...cars, ...coachVans, ...tourBuses]
}

// Helper function to get a transport option by id
export const getTransportById = (id) => {
  return getAllTransportOptions().find(transport => transport.id === id)
}

// Helper function to get all transport options filtered by passenger count
export const getTransportByPassengerCount = (count) => {
  return getAllTransportOptions().filter(transport => transport.capacity >= count)
}

// Helper function to get transport options by type
export const getTransportByType = (type) => {
  if (type === 'car') return cars
  if (type === 'van') return coachVans
  if (type === 'bus') return tourBuses
  return getAllTransportOptions()
}