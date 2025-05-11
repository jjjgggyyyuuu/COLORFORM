import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

// Form validation schema
const schema = yup.object().shape({
  startingLevel: yup.number().required('Starting level is required').min(1).max(10),
  startingTone: yup.string().required('Starting tone is required'),
  desiredLevel: yup.number().required('Desired level is required').min(1).max(10),
  desiredTone: yup.string().required('Desired tone is required'),
  brandId: yup.string().required('Color brand is required'),
  colorLine: yup.string().required('Color line is required'),
});

const FormulationForm = ({ onFormulationCreated }) => {
  const [brands, setBrands] = useState([]);
  const [colorLines, setColorLines] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with validation
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      startingLevel: 5,
      startingTone: 'natural',
      desiredLevel: 7,
      desiredTone: 'natural',
    }
  });

  // Watch for brand changes to update color lines
  const watchBrandId = watch('brandId');

  // Fetch brands on component mount
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('/api/brands');
        setBrands(response.data);
        
        // Set default brand if available
        if (response.data.length > 0) {
          setValue('brandId', response.data[0]._id);
          setSelectedBrand(response.data[0]._id);
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, [setValue]);

  // Update color lines when brand changes
  useEffect(() => {
    if (watchBrandId) {
      setSelectedBrand(watchBrandId);
      const brand = brands.find(b => b._id === watchBrandId);
      if (brand && brand.colorLines) {
        setColorLines(brand.colorLines);
        
        // Set default color line if available
        if (brand.colorLines.length > 0) {
          setValue('colorLine', brand.colorLines[0].name);
        }
      }
    }
  }, [watchBrandId, brands, setValue]);

  // Submit handler
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/formulations/calculate', data);
      onFormulationCreated(response.data);
    } catch (error) {
      console.error('Error calculating formulation:', error);
      alert('Failed to generate formulation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Define tone options
  const toneOptions = [
    { value: 'natural', label: 'Natural (N)' },
    { value: 'ash', label: 'Ash (A)' },
    { value: 'gold', label: 'Gold (G)' },
    { value: 'copper', label: 'Copper (C)' },
    { value: 'red', label: 'Red (R)' },
    { value: 'violet', label: 'Violet (V)' },
    { value: 'blue', label: 'Blue (B)' },
    { value: 'green', label: 'Green (GR)' },
    { value: 'brown', label: 'Brown (BR)' }
  ];

  return (
    <div className="card p-6">
      <h2 className="section-heading">Hair Color Formulation</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Starting Hair Section */}
          <div>
            <h3 className="subsection-heading">Starting Hair</h3>
            
            <div className="form-group">
              <label className="form-label" htmlFor="startingLevel">Level (1-10)</label>
              <input
                id="startingLevel"
                type="number"
                min="1"
                max="10"
                className="input-field"
                {...register('startingLevel')}
              />
              {errors.startingLevel && <p className="form-error">{errors.startingLevel.message}</p>}
              <p className="form-hint">1 = Black, 10 = Lightest Blonde</p>
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="startingTone">Tone</label>
              <select
                id="startingTone"
                className="select-field"
                {...register('startingTone')}
              >
                {toneOptions.map(option => (
                  <option key={`starting-${option.value}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.startingTone && <p className="form-error">{errors.startingTone.message}</p>}
            </div>
          </div>
          
          {/* Desired Result Section */}
          <div>
            <h3 className="subsection-heading">Desired Result</h3>
            
            <div className="form-group">
              <label className="form-label" htmlFor="desiredLevel">Level (1-10)</label>
              <input
                id="desiredLevel"
                type="number"
                min="1"
                max="10"
                className="input-field"
                {...register('desiredLevel')}
              />
              {errors.desiredLevel && <p className="form-error">{errors.desiredLevel.message}</p>}
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="desiredTone">Tone</label>
              <select
                id="desiredTone"
                className="select-field"
                {...register('desiredTone')}
              >
                {toneOptions.map(option => (
                  <option key={`desired-${option.value}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.desiredTone && <p className="form-error">{errors.desiredTone.message}</p>}
            </div>
          </div>
        </div>
        
        {/* Color Brand Section */}
        <div className="mt-6">
          <h3 className="subsection-heading">Color Brand & Line</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="form-label" htmlFor="brandId">Brand</label>
              <select
                id="brandId"
                className="select-field"
                {...register('brandId')}
              >
                {brands.map(brand => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              {errors.brandId && <p className="form-error">{errors.brandId.message}</p>}
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="colorLine">Color Line</label>
              <select
                id="colorLine"
                className="select-field"
                {...register('colorLine')}
              >
                {colorLines.map(line => (
                  <option key={line.name} value={line.name}>
                    {line.name} {line.isPermanent ? '(Permanent)' : line.isDemiPermanent ? '(Demi)' : ''}
                  </option>
                ))}
              </select>
              {errors.colorLine && <p className="form-error">{errors.colorLine.message}</p>}
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Calculating...' : 'Generate Formula'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormulationForm; 