import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Hair Color Formulator</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium">Home</Link>
            <Link to="/formulator" className="text-gray-600 hover:text-gray-900 font-medium">Formulator</Link>
            <Link to="/color-theory" className="text-gray-600 hover:text-gray-900 font-medium">Color Theory</Link>
            <Link to="/ai-consultation" className="text-gray-600 hover:text-gray-900 font-medium">AI Consultation</Link>
            <Link to="/face-analysis" className="text-gray-600 hover:text-gray-900 font-medium">Face Analysis</Link>
          </nav>
          
          {/* User profile button */}
          <div className="hidden md:flex items-center">
            <button className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <FaUser className="mr-2" /> Stylist Login
            </button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-500 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 border-t border-gray-200 pt-4">
            <nav className="grid grid-cols-1 gap-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/formulator" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMobileMenuOpen(false)}>Formulator</Link>
              <Link to="/color-theory" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMobileMenuOpen(false)}>Color Theory</Link>
              <Link to="/ai-consultation" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMobileMenuOpen(false)}>AI Consultation</Link>
              <Link to="/face-analysis" className="text-gray-600 hover:text-gray-900 font-medium" onClick={() => setMobileMenuOpen(false)}>Face Analysis</Link>
              <button className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                <FaUser className="mr-2" /> Stylist Login
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 