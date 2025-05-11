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

// Mock data for brands when API fails
const mockBrands = [
  {
    _id: 'aveda-mock-id',
    name: 'Aveda',
    colorLines: [
      { name: 'Full Spectrum', isPermanent: true, isDemiPermanent: false },
      { name: 'Pure Tone Deposit-Only', isPermanent: false, isDemiPermanent: true }
    ]
  },
  {
    _id: 'redken-mock-id',
    name: 'Redken',
    colorLines: [
      { name: 'Shades EQ', isPermanent: false, isDemiPermanent: true },
      { name: 'Color Fusion', isPermanent: true, isDemiPermanent: false },
      { name: 'Color Gels', isPermanent: true, isDemiPermanent: false }
    ]
  },
  {
    _id: 'wella-mock-id',
    name: 'Wella',
    colorLines: [
      { name: 'Koleston Perfect', isPermanent: true, isDemiPermanent: false },
      { name: 'Color Touch', isPermanent: false, isDemiPermanent: true },
      { name: 'Illumina Color', isPermanent: true, isDemiPermanent: false }
    ]
  },
  {
    _id: 'loreal-mock-id',
    name: 'L\'Oréal',
    colorLines: [
      { name: 'Majirel', isPermanent: true, isDemiPermanent: false },
      { name: 'INOA', isPermanent: true, isDemiPermanent: false },
      { name: 'Dia Light', isPermanent: false, isDemiPermanent: true }
    ]
  }
];

const FormulationForm = ({ onFormulationCreated }) => {
  const [brands, setBrands] = useState(mockBrands); // Start with mock data
  const [colorLines, setColorLines] = useState(mockBrands[0].colorLines); // Default color lines
  const [selectedBrand, setSelectedBrand] = useState(mockBrands[0]._id);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with validation
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      startingLevel: 5,
      startingTone: 'natural',
      desiredLevel: 7,
      desiredTone: 'natural',
      brandId: mockBrands[0]._id,
      colorLine: mockBrands[0].colorLines[0].name
    }
  });

  // Watch for brand changes to update color lines
  const watchBrandId = watch('brandId');

  // Fetch brands on component mount
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('/api/brands');
        
        // Use API data if available, otherwise keep mock data
        if (response.data && response.data.length > 0) {
          setBrands(response.data);
          
          // Set default brand if available
          setValue('brandId', response.data[0]._id);
          setSelectedBrand(response.data[0]._id);
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
        // Already using mock data as fallback
      }
    };

    fetchBrands();
  }, [setValue]);

  // Update color lines when brand changes
  useEffect(() => {
    if (watchBrandId) {
      setSelectedBrand(watchBrandId);
      
      // Find the selected brand (either from API or mock data)
      const brand = brands.find(b => b._id === watchBrandId);
      
      if (brand) {
        if (brand.colorLines && brand.colorLines.length > 0) {
          setColorLines(brand.colorLines);
          setValue('colorLine', brand.colorLines[0].name);
        } else {
          // Fallback to mock data if the brand doesn't have color lines
          const mockBrand = mockBrands.find(mb => mb.name === brand.name);
          if (mockBrand) {
            setColorLines(mockBrand.colorLines);
            setValue('colorLine', mockBrand.colorLines[0].name);
          } else {
            // Use first mock brand as last resort
            setColorLines(mockBrands[0].colorLines);
            setValue('colorLine', mockBrands[0].colorLines[0].name);
          }
        }
      } else {
        // If brand not found in API data, check mock data
        const mockBrand = mockBrands.find(mb => mb._id === watchBrandId);
        if (mockBrand) {
          setColorLines(mockBrand.colorLines);
          setValue('colorLine', mockBrand.colorLines[0].name);
        }
      }
    }
  }, [watchBrandId, brands, setValue]);

  // Submit handler
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      // For demo purposes, create a mock response if the API fails
      try {
        const response = await axios.post('/api/formulations/calculate', data);
        onFormulationCreated(response.data);
      } catch (apiError) {
        console.error('API error, using mock data:', apiError);
        
        // Generate mock formulation data
        const mockFormulation = generateMockFormulation(data);
        onFormulationCreated(mockFormulation);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate formulation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate mock formulation data when API fails
  const generateMockFormulation = (formData) => {
    const brand = brands.find(b => b._id === formData.brandId);
    const levelDifference = formData.desiredLevel - formData.startingLevel;
    const isLifting = levelDifference > 0;
    
    // Get underlying pigment
    let underlyingPigment = 'Yellow';
    if (formData.startingLevel <= 4) underlyingPigment = 'Red-brown';
    else if (formData.startingLevel <= 5) underlyingPigment = 'Red';
    else if (formData.startingLevel <= 6) underlyingPigment = 'Red-orange';
    else if (formData.startingLevel <= 7) underlyingPigment = 'Orange';
    else if (formData.startingLevel <= 8) underlyingPigment = 'Yellow-orange';
    else if (formData.startingLevel <= 9) underlyingPigment = 'Yellow';
    else underlyingPigment = 'Pale yellow';
    
    // Determine developer volume
    let developer = 10;
    if (levelDifference === 1) developer = 20;
    else if (levelDifference === 2) developer = 20;
    else if (levelDifference === 3) developer = 30;
    else if (levelDifference >= 4) developer = 40;
    
    return {
      startingLevel: formData.startingLevel,
      startingTone: formData.startingTone,
      desiredLevel: formData.desiredLevel,
      desiredTone: formData.desiredTone,
      brandId: formData.brandId,
      colorLine: formData.colorLine,
      formula: {
        primaryColor: {
          colorId: {
            name: `${formData.desiredLevel}${formData.desiredTone.charAt(0).toUpperCase()}`,
            code: `${formData.desiredLevel}/${formData.desiredTone.substring(0, 1)}`,
            level: formData.desiredLevel,
            tone: formData.desiredTone
          },
          amount: 2.0,
          unit: 'oz'
        },
        correctiveColors: isLifting ? [
          {
            colorId: {
              name: 'Corrective Tone',
              code: formData.desiredTone === 'ash' ? 'Blue' : 'Violet',
              level: 0,
              tone: formData.desiredTone === 'ash' ? 'blue' : 'violet'
            },
            amount: 0.5,
            unit: 'oz',
            purpose: `Neutralize ${underlyingPigment} undertones`
          }
        ] : [],
        developer: {
          volume: developer,
          amount: 2.5,
          unit: 'oz'
        }
      },
      processingTime: developer === 10 ? 25 : developer === 20 ? 30 : developer === 30 ? 35 : 45,
      specialInstructions: isLifting ? 
        `Apply to mid-lengths and ends first, leaving 1 inch from the scalp. After 15 minutes, apply to the roots and process for the remaining time.` : 
        `Apply evenly from roots to ends. For more vibrancy, leave on for full processing time.`,
      forLifting: isLifting,
      forDepositing: !isLifting,
      levelDifference: levelDifference,
      underlyingPigment: underlyingPigment,
      percentageOfAsh: isLifting ? (levelDifference === 1 ? 15 : levelDifference === 2 ? 30 : levelDifference === 3 ? 50 : 65) : 0
    };
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
                {colorLines && colorLines.length > 0 ? (
                  colorLines.map(line => (
                    <option key={line.name} value={line.name}>
                      {line.name} {line.isPermanent ? '(Permanent)' : line.isDemiPermanent ? '(Demi)' : ''}
                    </option>
                  ))
                ) : (
                  <option value="default">Default Color Line</option>
                )}
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