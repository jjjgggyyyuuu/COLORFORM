import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="text-center py-16 md:py-24 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-sm">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          Professional Hair Color Formulator
        </h1>
        <p className="max-w-xl mt-5 mx-auto text-xl text-gray-600">
          Generate precise hair color formulations with correct ash tones and corrective colors to counteract warmth.
        </p>
        <div className="mt-10">
          <Link
            to="/formulator"
            className="btn btn-primary text-lg px-8 py-3"
          >
            Create a Formula
          </Link>
        </div>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        <div className="card p-6 hover:shadow-lg transition-shadow">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-lg text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">Precise Formulation</h2>
          <p className="text-gray-600 text-center">
            Calculate exact formulas based on starting level, desired results, and brand-specific color properties.
          </p>
        </div>

        <div className="card p-6 hover:shadow-lg transition-shadow">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center p-2 bg-purple-100 rounded-lg text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">Color Theory Knowledge</h2>
          <p className="text-gray-600 text-center">
            Built-in color wheel and level system to help understand underlying pigments and neutralization principles.
          </p>
        </div>

        <div className="card p-6 hover:shadow-lg transition-shadow">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-lg text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">Professional Brands</h2>
          <p className="text-gray-600 text-center">
            Support for Aveda, Redken, Wella, and L'Oréal color lines with accurate brand-specific formulation guidance.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <Link to="/color-theory" className="btn btn-outline">
          Learn Color Theory
        </Link>
      </div>
    </div>
  );
};

export default HomePage; 