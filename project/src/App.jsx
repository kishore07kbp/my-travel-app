import { Routes, Route } from 'react-router-dom'
import { TripContextProvider } from './context/TripContext'
import { AuthContextProvider } from './context/AuthContext'
import Header from './components/common/Header'
import Footer from './components/common/Footer'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DestinationsPage from './pages/DestinationsPage'
import DestinationDetail from './pages/DestinationDetail'
import CabSelectionPage from './pages/CabSelectionPage'
import PersonalDetailsPage from './pages/PersonalDetailsPage'
import PaymentPage from './pages/PaymentPage'
import ReceiptPage from './pages/ReceiptPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <AuthContextProvider>
      <TripContextProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/destinations" element={<DestinationsPage />} />
              <Route path="/destinations/:state" element={<DestinationsPage />} />
              <Route path="/destination/:id" element={<DestinationDetail />} />
              <Route path="/cab-selection" element={<CabSelectionPage />} />
              <Route path="/personal-details" element={<PersonalDetailsPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/receipt" element={<ReceiptPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </TripContextProvider>
    </AuthContextProvider>
  )
}

export default App