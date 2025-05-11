import React from 'react';

const FormulationResult = ({ formulation }) => {
  if (!formulation) return null;

  // Extract data from formulation object
  const {
    startingLevel,
    startingTone,
    desiredLevel,
    desiredTone,
    formula,
    processingTime,
    specialInstructions,
    forLifting,
    levelDifference,
    underlyingPigment,
    percentageOfAsh
  } = formulation;

  // Helper function to capitalize first letter
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Get primary color info
  const primaryColor = formula?.primaryColor || {};
  const primaryColorName = primaryColor?.colorId?.name || 'N/A';
  const primaryColorCode = primaryColor?.colorId?.code || 'N/A';
  const primaryColorAmount = primaryColor?.amount || 0;
  
  // Get corrective colors info
  const correctiveColors = formula?.correctiveColors || [];
  
  // Get developer info
  const developer = formula?.developer || {};
  const developerVolume = developer?.volume || 0;
  const developerAmount = developer?.amount || 0;

  return (
    <div className="card p-6">
      <h2 className="section-heading">Color Formulation Results</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hair Information Section */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="subsection-heading">Hair Information</h3>
          
          <div className="space-y-3">
            <div>
              <span className="font-medium">Starting Level:</span> {startingLevel}
            </div>
            <div>
              <span className="font-medium">Starting Tone:</span> {capitalize(startingTone)}
            </div>
            <div>
              <span className="font-medium">Desired Level:</span> {desiredLevel}
            </div>
            <div>
              <span className="font-medium">Desired Tone:</span> {capitalize(desiredTone)}
            </div>
            
            {forLifting && (
              <>
                <div>
                  <span className="font-medium">Level Lift:</span> {levelDifference} levels
                </div>
                <div>
                  <span className="font-medium">Underlying Pigment:</span> {underlyingPigment}
                </div>
                <div>
                  <span className="font-medium">Ash Required:</span> {percentageOfAsh}%
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Formula Section */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="subsection-heading">Color Formula</h3>
          
          <div className="space-y-4">
            <div>
              <div className="font-medium text-blue-800">Primary Color:</div>
              <div className="pl-4 border-l-2 border-blue-300 mt-1">
                <div>{primaryColorName} ({primaryColorCode})</div>
                <div className="text-lg font-bold">{primaryColorAmount} oz</div>
              </div>
            </div>
            
            {correctiveColors.length > 0 && (
              <div>
                <div className="font-medium text-violet-800">Corrective Color(s):</div>
                {correctiveColors.map((color, index) => (
                  <div key={index} className="pl-4 border-l-2 border-violet-300 mt-1">
                    <div>{color.colorId?.name || 'N/A'} ({color.colorId?.code || 'N/A'})</div>
                    <div className="text-lg font-bold">{color.amount} oz</div>
                    <div className="text-sm text-gray-600">{color.purpose}</div>
                  </div>
                ))}
              </div>
            )}
            
            <div>
              <div className="font-medium text-gray-800">Developer:</div>
              <div className="pl-4 border-l-2 border-gray-300 mt-1">
                <div>{developerVolume} Volume</div>
                <div className="text-lg font-bold">{developerAmount} oz</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Application Instructions */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="subsection-heading">Application</h3>
          
          <div className="space-y-3">
            <div>
              <span className="font-medium">Processing Time:</span> {processingTime} minutes
            </div>
            
            <div>
              <div className="font-medium mb-1">Instructions:</div>
              <p className="text-gray-700">{specialInstructions}</p>
            </div>
            
            <div className="mt-4">
              <div className="font-medium mb-1">Formula Type:</div>
              <span className={`pill ${forLifting ? 'pill-warning' : 'pill-info'}`}>
                {forLifting ? 'Lifting Formula' : 'Deposit-Only Formula'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        <button className="btn btn-outline">
          Save Formula
        </button>
        <button onClick={() => window.print()} className="btn btn-primary">
          Print
        </button>
      </div>
    </div>
  );
};

export default FormulationResult; 