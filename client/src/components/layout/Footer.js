import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white mt-auto border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Hair Color Formulator</h3>
            <p className="text-sm text-gray-600">
              Professional hair color formulation tools for stylists, powered by advanced color theory and AI analysis.
            </p>
          </div>
          
          <div>
            <h3 className="text-md font-semibold text-gray-900 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-600 hover:text-primary">Home</Link></li>
              <li><Link to="/formulator" className="text-sm text-gray-600 hover:text-primary">Color Formulator</Link></li>
              <li><Link to="/color-theory" className="text-sm text-gray-600 hover:text-primary">Color Theory</Link></li>
              <li><Link to="/ai-consultation" className="text-sm text-gray-600 hover:text-primary">AI Consultation</Link></li>
              <li><Link to="/face-analysis" className="text-sm text-gray-600 hover:text-primary">Face Shape Analysis</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-semibold text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Colorist Certification</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-primary">FAQs</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Professional Blog</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-md font-semibold text-gray-900 mb-3">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-500 hover:text-primary"><FaFacebook size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-primary"><FaInstagram size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-primary"><FaTwitter size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-primary"><FaPinterest size={20} /></a>
            </div>
            <p className="text-sm text-gray-600">Subscribe to our newsletter for color tips and trends.</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} Hair Color Formulator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 