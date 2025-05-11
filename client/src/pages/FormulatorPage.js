import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FaSave, FaHistory, FaChevronDown, FaChevronUp, FaSpinner } from 'react-icons/fa';
import FormulationForm from '../components/formulator/FormulationForm';
import FormulationResult from '../components/formulator/FormulationResult';
import axios from 'axios';

const schema = yup.object().shape({
  clientName: yup.string().required('Client name is required'),
  clientNotes: yup.string(),
  saveFormula: yup.boolean()
});

const FormulatorPage = () => {
  const [formulation, setFormulation] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [clientHistory, setClientHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      clientName: '',
      clientNotes: '',
      saveFormula: true
    }
  });

  // Fetch mock client history
  useEffect(() => {
    const fetchClientHistory = async () => {
      // This would be a real API call in production
      const mockHistory = [
        {
          id: '1',
          date: '2023-11-15',
          clientName: 'Emma Thompson',
          formula: {
            brand: 'Redken',
            primary: 'Shades EQ 8N + 8V (1:1)',
            developer: '10 volume',
            processingTime: '20 minutes'
          }
        },
        {
          id: '2',
          date: '2023-10-05',
          clientName: 'Jessica Miller',
          formula: {
            brand: 'Wella',
            primary: 'Koleston 7/1 + 7/81 (2:1)',
            developer: '20 volume',
            processingTime: '35 minutes'
          }
        },
        {
          id: '3',
          date: '2023-09-22',
          clientName: 'Sophia Garcia',
          formula: {
            brand: 'Aveda',
            primary: 'Full Spectrum 6N + 6G (3:1)',
            developer: '20 volume',
            processingTime: '30 minutes'
          }
        }
      ];
      
      setClientHistory(mockHistory);
    };
    
    fetchClientHistory();
  }, []);

  const handleFormulationCreated = (newFormulation) => {
    setFormulation(newFormulation);
    // Scroll to results
    setTimeout(() => {
      document.getElementById('formulation-results').scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const onSaveFormula = (data) => {
    if (!formulation) return;
    
    setLoading(true);
    
    // Mock API call to save the formula with client info
    setTimeout(() => {
      console.log('Saving formula for client:', data.clientName);
      console.log('Formula:', formulation);
      console.log('Notes:', data.clientNotes);
      
      setSaveSuccess(true);
      setLoading(false);
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Professional Hair Color Formulator</h1>
      <p className="text-gray-600 mb-8">Create precise hair color formulations with automatic correction for undertones and level changes.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Main formulator form */}
          <FormulationForm onFormulationCreated={handleFormulationCreated} />
          
          {/* Advanced options (expandable) */}
          <div className="card p-6 mt-6">
            <button 
              className="flex items-center justify-between w-full text-left font-semibold text-gray-900"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <span>Advanced Options</span>
              {showAdvanced ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            
            {showAdvanced && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Color correction options */}
                  <div>
                    <h3 className="subsection-heading">Color Correction</h3>
                    <div className="space-y-4">
                      <div className="form-group">
                        <label className="form-label">Previous Color Type</label>
                        <select className="select-field">
                          <option value="">Select previous color</option>
                          <option value="permanent">Permanent</option>
                          <option value="demi">Demi-permanent</option>
                          <option value="semi">Semi-permanent</option>
                          <option value="henna">Henna</option>
                          <option value="direct-dye">Direct dye</option>
                          <option value="box-color">Box color</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Color Correction Goal</label>
                        <select className="select-field">
                          <option value="">Select goal</option>
                          <option value="remove-brassiness">Remove brassiness</option>
                          <option value="neutralize-green">Neutralize green</option>
                          <option value="remove-red">Remove red/copper tones</option>
                          <option value="even-porosity">Even out porosity</option>
                          <option value="fix-banding">Fix banding</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hair condition options */}
                  <div>
                    <h3 className="subsection-heading">Hair Condition</h3>
                    <div className="space-y-4">
                      <div className="form-group">
                        <label className="form-label">Hair Porosity</label>
                        <select className="select-field">
                          <option value="">Select porosity</option>
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="damaged">Damaged</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Hair Texture</label>
                        <select className="select-field">
                          <option value="">Select texture</option>
                          <option value="fine">Fine</option>
                          <option value="medium">Medium</option>
                          <option value="coarse">Coarse</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span>Use bond builder</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Formulation results */}
          <div id="formulation-results" className="mt-8">
            {formulation && (
              <>
                <FormulationResult formulation={formulation} />
                
                {/* Client details and save form */}
                <div className="card p-6 mt-6">
                  <h2 className="section-heading mb-4">Save This Formula</h2>
                  
                  <form onSubmit={handleSubmit(onSaveFormula)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div className="form-group">
                        <label className="form-label" htmlFor="clientName">Client Name</label>
                        <input 
                          id="clientName"
                          className="input-field"
                          {...register('clientName')} 
                        />
                        {errors.clientName && <p className="form-error">{errors.clientName.message}</p>}
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label" htmlFor="clientNotes">Notes</label>
                        <textarea 
                          id="clientNotes"
                          className="input-field h-24"
                          placeholder="Add any notes about the service or client hair..."
                          {...register('clientNotes')}
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <input 
                        type="checkbox" 
                        id="saveFormula"
                        className="mr-2"
                        {...register('saveFormula')}
                      />
                      <label htmlFor="saveFormula" className="text-sm text-gray-700">
                        Save to client history
                      </label>
                    </div>
                    
                    <div className="flex justify-end">
                      <button 
                        type="submit" 
                        className="btn btn-primary flex items-center"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <FaSpinner className="animate-spin mr-2" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <FaSave className="mr-2" />
                            Save Formula
                          </>
                        )}
                      </button>
                    </div>
                    
                    {saveSuccess && (
                      <div className="mt-4 bg-green-50 text-green-700 p-3 rounded">
                        Formula successfully saved to client history!
                      </div>
                    )}
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Sidebar with recent history */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-6">
            <div className="flex items-center mb-4">
              <FaHistory className="text-primary mr-2" />
              <h2 className="section-heading mb-0">Recent Formulas</h2>
            </div>
            
            {clientHistory.length > 0 ? (
              <div className="space-y-4">
                {clientHistory.map(item => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between mb-1">
                      <h4 className="font-medium">{item.clientName}</h4>
                      <span className="text-sm text-gray-500">{item.date}</span>
                    </div>
                    <div className="text-sm text-gray-700">
                      <p><span className="font-medium">Brand:</span> {item.formula.brand}</p>
                      <p><span className="font-medium">Formula:</span> {item.formula.primary}</p>
                      <p><span className="font-medium">Developer:</span> {item.formula.developer}</p>
                    </div>
                    <button className="text-sm text-primary hover:text-primary-dark mt-2">
                      Use this formula
                    </button>
                  </div>
                ))}
                
                <button className="text-sm text-primary hover:text-primary-dark flex items-center">
                  View all client history
                  <svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ) : (
              <p className="text-gray-500">No recent formulas found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormulatorPage; 