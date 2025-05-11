import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
      <div className="card p-10 max-w-lg mx-auto">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you were looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage; 