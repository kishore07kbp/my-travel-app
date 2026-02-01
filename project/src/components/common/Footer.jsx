import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Trip to <span className="text-secondary-500">Paradise</span></h3>
            <p className="text-neutral-300 mb-4">
              We specialize in creating memorable travel experiences across South India. From pristine beaches to misty hill stations, we bring you the best of Kerala, Tamil Nadu, and Karnataka.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-secondary-500 transition-colors">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="text-white hover:text-secondary-500 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-secondary-500 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-secondary-500 transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-secondary-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/destinations" className="text-neutral-300 hover:text-secondary-500 transition-colors">Destinations</Link>
              </li>
              <li>
                <Link to="/destinations/tamil-nadu" className="text-neutral-300 hover:text-secondary-500 transition-colors">Tamil Nadu</Link>
              </li>
              <li>
                <Link to="/destinations/kerala" className="text-neutral-300 hover:text-secondary-500 transition-colors">Kerala</Link>
              </li>
              <li>
                <Link to="/destinations/karnataka" className="text-neutral-300 hover:text-secondary-500 transition-colors">Karnataka</Link>
              </li>
              <li>
                <Link to="/cab-selection" className="text-neutral-300 hover:text-secondary-500 transition-colors">Transportation</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/login" className="text-neutral-300 hover:text-secondary-500 transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="text-neutral-300 hover:text-secondary-500 transition-colors">Sign Up</Link>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-secondary-500 transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-secondary-500 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-neutral-300 hover:text-secondary-500 transition-colors">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 text-secondary-500" />
                <p className="text-neutral-300">123, Kinathukadavu, Coimbatore – 641202, Tamil Nadu, India</p>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="mr-2 text-secondary-500" />
                <p className="text-neutral-300">+91 6369941808</p>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-secondary-500" />
                <p className="text-neutral-300">info@triptoparadise.com</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-8 pt-6 text-center">
          <p className="text-neutral-400">
            &copy; {currentYear} Trip to Paradise. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer