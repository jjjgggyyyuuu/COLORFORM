import React from 'react';
import ColorWheel from '../components/colorTheory/ColorWheel';
import LevelChart from '../components/colorTheory/LevelChart';

const ColorTheoryPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Hair Color Theory</h1>
      
      <div className="space-y-8">
        <ColorWheel />
        <LevelChart />
      </div>
    </div>
  );
};

export default ColorTheoryPage; 