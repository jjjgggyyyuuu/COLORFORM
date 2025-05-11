import React, { useState, useRef } from 'react';
import { FaCamera, FaUpload, FaSpinner, FaUndo } from 'react-icons/fa';

const FaceAnalysisPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cameraMode, setCameraMode] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Handle image file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  // Trigger file input click
  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  // Start camera for taking photo
  const startCamera = async () => {
    setCameraMode(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Could not access camera. Please check permissions or try uploading a photo instead.');
      setCameraMode(false);
    }
  };

  // Take photo from camera
  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to blob/file
      canvas.toBlob((blob) => {
        const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
        setSelectedImage(file);
        const imageUrl = URL.createObjectURL(blob);
        setPreviewUrl(imageUrl);
        
        // Stop camera stream
        const stream = video.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach(track => track.stop());
          video.srcObject = null;
        }
        
        setCameraMode(false);
      }, 'image/jpeg', 0.95);
    }
  };

  // Reset camera/photo
  const resetPhoto = () => {
    if (cameraMode && videoRef.current) {
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }
    
    setSelectedImage(null);
    setPreviewUrl(null);
    setAnalysisResults(null);
    setCameraMode(false);
  };

  // Analyze face shape and skin tone
  const analyzeImage = async () => {
    if (!selectedImage) {
      setError('Please upload an image or take a photo first.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Mock analysis results
      const mockResults = {
        faceShape: {
          shape: 'oval',
          confidence: 0.87,
          characteristics: [
            'Balanced proportions',
            'Slightly wider at cheekbones',
            'Gently rounded jawline'
          ]
        },
        skinTone: {
          category: 'warm',
          undertone: 'golden',
          brightness: 'medium',
          contrast: 'medium'
        },
        recommendations: {
          hairColors: [
            {
              name: 'Golden Caramel',
              level: 7,
              tones: 'Gold, copper',
              hexColor: '#9D6B53'
            },
            {
              name: 'Rich Auburn',
              level: 5,
              tones: 'Red, copper',
              hexColor: '#76412F'
            },
            {
              name: 'Honey Blonde',
              level: 8,
              tones: 'Gold, neutral',
              hexColor: '#C39B70'
            }
          ],
          colorsThatFlatters: ['Gold', 'Copper', 'Amber', 'Peach', 'Coral'],
          colorsThatContrast: ['Violet', 'Blue', 'Green'],
          haircuts: [
            {
              name: 'Long Layers',
              description: 'For oval face shapes, most styles work well. Long layers add movement and dimension while maintaining length.',
              suitability: 9.5
            },
            {
              name: 'Medium Bob with Side Sweep',
              description: 'A versatile bob that hits at the collarbone with side-swept bangs enhances your face shape.',
              suitability: 9.2
            },
            {
              name: 'Textured Shag',
              description: 'A modern shag with face-framing layers and texture complements your proportions while adding dimension.',
              suitability: 8.7
            }
          ]
        }
      };
      
      setAnalysisResults(mockResults);
    } catch (err) {
      setError('An error occurred during analysis. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Face Shape & Color Analysis</h1>
      
      <div className="card p-6 mb-8">
        <h2 className="section-heading">Upload or Take a Photo</h2>
        <p className="text-gray-600 mb-6">
          Our AI will analyze your client's face shape and skin tone to recommend the most flattering
          hair colors and styles based on their unique features.
        </p>
        
        {cameraMode ? (
          <div className="flex flex-col items-center">
            <video 
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full max-w-md h-auto rounded-lg border border-gray-300 mb-4"
            ></video>
            <canvas ref={canvasRef} className="hidden"></canvas>
            
            <div className="flex space-x-4">
              <button
                onClick={takePhoto}
                className="btn btn-primary flex items-center"
              >
                <FaCamera className="mr-2" />
                Take Photo
              </button>
              <button
                onClick={resetPhoto}
                className="btn btn-outline flex items-center"
              >
                <FaUndo className="mr-2" />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-gray-200 rounded-lg p-6 flex flex-col items-center justify-center">
              {previewUrl ? (
                <>
                  <img 
                    src={previewUrl} 
                    alt="Selected profile" 
                    className="max-w-full h-auto max-h-80 rounded-lg mb-4" 
                  />
                  <div className="flex space-x-3">
                    <button
                      onClick={resetPhoto}
                      className="btn btn-outline flex items-center"
                    >
                      <FaUndo className="mr-2" />
                      Reset
                    </button>
                    <button
                      onClick={analyzeImage}
                      disabled={loading}
                      className="btn btn-primary flex items-center"
                    >
                      {loading ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Analyzing...
                        </>
                      ) : (
                        'Analyze Image'
                      )}
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <p className="text-gray-500 mb-6">No image selected</p>
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <button
                      onClick={triggerFileUpload}
                      className="btn btn-primary flex items-center justify-center"
                    >
                      <FaUpload className="mr-2" />
                      Upload Photo
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      onClick={startCamera}
                      className="btn btn-outline flex items-center justify-center"
                    >
                      <FaCamera className="mr-2" />
                      Take Photo
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="subsection-heading mb-4">Best Practices for Analysis</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary inline-block mr-2">•</span>
                  <span>Use a well-lit environment with natural lighting if possible</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary inline-block mr-2">•</span>
                  <span>Take the photo straight-on with a neutral expression</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary inline-block mr-2">•</span>
                  <span>Ensure hair is pulled back to see the full face shape</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary inline-block mr-2">•</span>
                  <span>Remove glasses and minimize jewelry for accurate results</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary inline-block mr-2">•</span>
                  <span>Clean-faced or minimal makeup provides better skin tone analysis</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <div className="mb-8 bg-red-50 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      )}
      
      {/* Analysis results section */}
      {analysisResults && (
        <div className="card p-6">
          <h2 className="section-heading">Analysis Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Face shape analysis */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Face Shape</h3>
              <div className="space-y-3">
                <p>
                  <span className="font-medium">Shape:</span>{' '}
                  <span className="capitalize">{analysisResults.faceShape.shape}</span>
                </p>
                <p>
                  <span className="font-medium">Confidence:</span>{' '}
                  {Math.round(analysisResults.faceShape.confidence * 100)}%
                </p>
                <div>
                  <p className="font-medium mb-1">Characteristics:</p>
                  <ul className="list-disc list-inside text-sm">
                    {analysisResults.faceShape.characteristics.map((char, index) => (
                      <li key={index}>{char}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Skin tone analysis */}
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-amber-800 mb-3">Skin Tone</h3>
              <div className="space-y-3">
                <p>
                  <span className="font-medium">Category:</span>{' '}
                  <span className="capitalize">{analysisResults.skinTone.category}</span>
                </p>
                <p>
                  <span className="font-medium">Undertone:</span>{' '}
                  <span className="capitalize">{analysisResults.skinTone.undertone}</span>
                </p>
                <p>
                  <span className="font-medium">Brightness:</span>{' '}
                  <span className="capitalize">{analysisResults.skinTone.brightness}</span>
                </p>
                <p>
                  <span className="font-medium">Contrast:</span>{' '}
                  <span className="capitalize">{analysisResults.skinTone.contrast}</span>
                </p>
              </div>
            </div>
            
            {/* Complementary colors */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Complementary Colors</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium mb-1">Flattering Tones:</p>
                  <div className="flex flex-wrap gap-2">
                    {analysisResults.recommendations.colorsThatFlatters.map((color, index) => (
                      <span key={index} className="px-2 py-1 bg-white rounded-full text-xs font-medium shadow-sm">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-medium mb-1">Contrasting Tones:</p>
                  <div className="flex flex-wrap gap-2">
                    {analysisResults.recommendations.colorsThatContrast.map((color, index) => (
                      <span key={index} className="px-2 py-1 bg-white rounded-full text-xs font-medium shadow-sm">
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recommended hair colors */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Recommended Hair Colors</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {analysisResults.recommendations.hairColors.map((color, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                  <div 
                    className="h-32" 
                    style={{ backgroundColor: color.hexColor }}
                  ></div>
                  <div className="p-4">
                    <h4 className="font-bold text-lg mb-2">{color.name}</h4>
                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Level:</span> {color.level}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Tones:</span> {color.tones}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recommended haircuts */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Recommended Haircuts</h3>
            
            <div className="space-y-4">
              {analysisResults.recommendations.haircuts.map((cut, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-lg">{cut.name}</h4>
                    <div className="bg-primary-light text-primary-dark px-2 py-1 rounded-full text-sm font-medium">
                      {cut.suitability}/10
                    </div>
                  </div>
                  <p className="text-gray-600">{cut.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-3">
            <button className="btn btn-outline">Save to Client Profile</button>
            <button className="btn btn-primary">Create Color Formula</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaceAnalysisPage; 