import React from 'react';

const LevelChart = () => {
  // Data for the level chart
  const levelData = [
    { 
      level: 1, 
      description: 'Black', 
      underlyingPigment: 'All pigments', 
      hexColor: '#000000',
      developersForLifting: 'N/A - too dark to lift', 
      commonIssues: 'Difficult to lighten, requires multiple sessions'
    },
    { 
      level: 2, 
      description: 'Very Dark Brown', 
      underlyingPigment: 'All pigments', 
      hexColor: '#1C0F0C',
      developersForLifting: '30-40 volume', 
      commonIssues: 'Heavy red/orange undertones when lifted'
    },
    { 
      level: 3, 
      description: 'Dark Brown', 
      underlyingPigment: 'Red-brown', 
      hexColor: '#2B170F',
      developersForLifting: '30-40 volume', 
      commonIssues: 'Strong red undertones when lifted'
    },
    { 
      level: 4, 
      description: 'Medium Brown', 
      underlyingPigment: 'Red-brown', 
      hexColor: '#3C2314',
      developersForLifting: '20-30 volume', 
      commonIssues: 'Red/copper undertones when lifted'
    },
    { 
      level: 5, 
      description: 'Light Brown', 
      underlyingPigment: 'Red', 
      hexColor: '#4E2E17',
      developersForLifting: '20-30 volume', 
      commonIssues: 'Red undertones when lifted'
    },
    { 
      level: 6, 
      description: 'Dark Blonde', 
      underlyingPigment: 'Red-orange', 
      hexColor: '#6B4025',
      developersForLifting: '20-30 volume', 
      commonIssues: 'Orange-red undertones when lifted'
    },
    { 
      level: 7, 
      description: 'Medium Blonde', 
      underlyingPigment: 'Orange', 
      hexColor: '#8C5A32',
      developersForLifting: '20 volume', 
      commonIssues: 'Strong orange undertones when lifted'
    },
    { 
      level: 8, 
      description: 'Light Blonde', 
      underlyingPigment: 'Yellow-orange', 
      hexColor: '#BA7D48',
      developersForLifting: '10-20 volume', 
      commonIssues: 'Yellow-orange undertones when lifted'
    },
    { 
      level: 9, 
      description: 'Very Light Blonde', 
      underlyingPigment: 'Yellow', 
      hexColor: '#DCAA72',
      developersForLifting: '10 volume', 
      commonIssues: 'Yellow undertones when lifted'
    },
    { 
      level: 10, 
      description: 'Lightest Blonde', 
      underlyingPigment: 'Pale yellow', 
      hexColor: '#F2D6A8',
      developersForLifting: '10 volume', 
      commonIssues: 'Pale yellow undertones, potential damage'
    }
  ];

  return (
    <div className="card p-6">
      <h2 className="section-heading">Hair Level & Underlying Pigment Chart</h2>
      <p className="mb-4 text-gray-600">
        Understanding hair levels and their underlying pigments is crucial for accurate color formulation.
        The chart below shows the 10-level system and what pigments are exposed during the lifting process.
      </p>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Level
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Color
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Underlying Pigment
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Developer for Lifting
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Common Issues
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {levelData.map((level) => (
              <tr key={level.level}>
                <td className="px-6 py-4 whitespace-nowrap text-center font-bold">
                  {level.level}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {level.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div 
                    className="w-12 h-6 rounded border border-gray-300" 
                    style={{ backgroundColor: level.hexColor }}
                  ></div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    {level.underlyingPigment}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {level.developersForLifting}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {level.commonIssues}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 bg-yellow-50 p-4 rounded-lg">
        <h3 className="subsection-heading text-amber-800">Neutralization Guide</h3>
        <p className="mb-2">
          To neutralize unwanted undertones, use these complementary colors:
        </p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li><span className="font-medium text-green-700">Green tones</span> neutralize <span className="font-medium text-red-600">red</span> (levels 4-5)</li>
          <li><span className="font-medium text-blue-700">Blue/Ash tones</span> neutralize <span className="font-medium text-orange-600">orange</span> (levels 6-7)</li>
          <li><span className="font-medium text-indigo-700">Blue-violet tones</span> neutralize <span className="font-medium text-yellow-600">yellow-orange</span> (level 8)</li>
          <li><span className="font-medium text-purple-700">Violet tones</span> neutralize <span className="font-medium text-yellow-600">yellow</span> (levels 9-10)</li>
        </ul>
      </div>
      
      <div className="mt-4 bg-blue-50 p-4 rounded-lg">
        <h3 className="subsection-heading text-blue-800">Ash Percentage Guide</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>1 level lift: 10-15% ash</li>
          <li>2 levels lift: 25-30% ash</li>
          <li>3 levels lift: 40-50% ash</li>
          <li>4+ levels lift: 60-75% ash</li>
        </ul>
      </div>
    </div>
  );
};

export default LevelChart; 