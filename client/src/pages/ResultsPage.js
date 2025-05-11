import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import FormulationResult from '../components/formulator/FormulationResult';

const ResultsPage = () => {
  const { id } = useParams();
  const [formulation, setFormulation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFormulation = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/formulations/${id}`);
        setFormulation(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching formulation:', err);
        setError('Failed to load the formulation. It may have been deleted or never existed.');
        setLoading(false);
      }
    };

    fetchFormulation();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Loading formulation data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="card p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Formulation Not Found</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link to="/formulator" className="btn btn-primary">
            Create a New Formula
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link to="/formulator" className="text-primary hover:text-primary-dark flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Formulator
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Saved Formulation</h1>
      
      <FormulationResult formulation={formulation} />
    </div>
  );
};

export default ResultsPage; 