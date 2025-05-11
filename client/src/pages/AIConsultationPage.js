import React, { useState, useRef } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaUpload, FaSpinner } from 'react-icons/fa';

const AIConsultationPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Mock function for starting recording (would use browser's MediaRecorder API in production)
  const startRecording = () => {
    setIsRecording(true);
    setTranscription('Recording consultation...');
    
    // In a real implementation, this would use the MediaRecorder API
    console.log('Started recording');
  };

  // Mock function for stopping recording
  const stopRecording = () => {
    setIsRecording(false);
    
    // Mock transcription result
    const mockTranscription = 
      "Stylist: So tell me what you're looking to do with your hair color today?\n\n" +
      "Client: I currently have a level 6 with some highlights, but they've become brassy. I'd like to go to a level 8 blonde, but more ashy to neutralize the brassiness.\n\n" +
      "Stylist: How long ago was your last color service?\n\n" +
      "Client: About 3 months ago. I had highlights and lowlights done.\n\n" +
      "Stylist: And have you used any box dyes or other treatments at home?\n\n" +
      "Client: No, just purple shampoo occasionally.";
    
    setTranscription(mockTranscription);
    
    // In a real implementation, this would stop the MediaRecorder and process the audio
    console.log('Stopped recording');
  };

  // Handle audio file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      setTranscription(`File selected: ${file.name}`);
    }
  };

  // Trigger file input click
  const triggerFileUpload = () => {
    fileInputRef.current.click();
  };

  // Analyze consultation
  const analyzeConsultation = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock analysis results
      const mockResults = {
        clientGoals: {
          desiredLevel: 8,
          desiredTone: 'ash',
          correctiveFocus: 'neutralize brassiness'
        },
        hairCondition: {
          currentLevel: 6,
          hasHighlights: true,
          brassiness: true
        },
        recommendations: {
          primaryFormula: {
            brand: 'Wella',
            colorLine: 'Koleston Perfect',
            shades: ['8/1 Light Ash Blonde', '8/81 Light Pearl Ash Blonde'],
            mixing: '2:1 ratio',
            developer: '20 volume',
            processingTime: '35 minutes'
          },
          secondaryFormula: {
            purpose: 'Toning after lightening',
            brand: 'Wella',
            colorLine: 'Color Touch',
            shades: ['8/81 Light Pearl Ash Blonde'],
            developer: '13 volume',
            processingTime: '15 minutes'
          },
          additionalNotes: [
            'Apply lightener to mid-lengths and ends first',
            'Recommend using Olaplex during the service to protect hair integrity',
            'Suggest at-home care with purple shampoo once a week'
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
      <h1 className="text-3xl font-bold text-gray-900 mb-6">AI Consultation Analysis</h1>
      
      <div className="card p-6 mb-8">
        <h2 className="section-heading">Record or Upload Consultation</h2>
        <p className="text-gray-600 mb-6">
          Record a live consultation with your client or upload a pre-recorded audio file.
          Our AI will analyze the conversation and suggest optimal color formulations based on the client's needs.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recording section */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="subsection-heading">Live Recording</h3>
            <p className="text-gray-600 mb-4">Record your consultation in real-time.</p>
            
            <div className="flex justify-center mb-6">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary-dark'
                } text-white`}
              >
                {isRecording ? <FaMicrophoneSlash size={24} /> : <FaMicrophone size={24} />}
              </button>
            </div>
            
            <p className="text-sm text-gray-500 text-center">
              {isRecording ? 'Recording in progress... Click to stop.' : 'Click to start recording'}
            </p>
          </div>
          
          {/* Upload section */}
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="subsection-heading">Upload Audio</h3>
            <p className="text-gray-600 mb-4">Upload a pre-recorded consultation file.</p>
            
            <div className="flex justify-center mb-6">
              <button
                onClick={triggerFileUpload}
                className="w-16 h-16 rounded-full flex items-center justify-center bg-secondary hover:bg-secondary-dark text-white"
              >
                <FaUpload size={24} />
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="audio/*"
                className="hidden"
              />
            </div>
            
            <p className="text-sm text-gray-500 text-center">
              {audioFile ? `Selected: ${audioFile.name}` : 'Upload MP3, WAV, or M4A files'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Transcription section */}
      {transcription && (
        <div className="card p-6 mb-8">
          <h2 className="section-heading">Consultation Transcription</h2>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="whitespace-pre-wrap text-gray-700 font-sans">{transcription}</pre>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={analyzeConsultation}
              disabled={loading}
              className="btn btn-primary flex items-center"
            >
              {loading ? <>
                <FaSpinner className="animate-spin mr-2" />
                Analyzing...
              </> : 'Analyze Consultation'}
            </button>
          </div>
        </div>
      )}
      
      {/* Analysis results section */}
      {analysisResults && (
        <div className="card p-6">
          <h2 className="section-heading">AI Analysis Results</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Client goals */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Client Goals</h3>
              <ul className="space-y-2">
                <li><span className="font-medium">Desired Level:</span> {analysisResults.clientGoals.desiredLevel}</li>
                <li><span className="font-medium">Desired Tone:</span> {analysisResults.clientGoals.desiredTone}</li>
                <li><span className="font-medium">Focus:</span> {analysisResults.clientGoals.correctiveFocus}</li>
              </ul>
            </div>
            
            {/* Current hair condition */}
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-amber-800 mb-3">Current Hair Condition</h3>
              <ul className="space-y-2">
                <li><span className="font-medium">Current Level:</span> {analysisResults.hairCondition.currentLevel}</li>
                <li><span className="font-medium">Has Highlights:</span> {analysisResults.hairCondition.hasHighlights ? 'Yes' : 'No'}</li>
                <li><span className="font-medium">Brassiness:</span> {analysisResults.hairCondition.brassiness ? 'Yes' : 'No'}</li>
              </ul>
            </div>
            
            {/* Key considerations */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Key Considerations</h3>
              <ul className="space-y-2">
                <li>2 levels of lift required</li>
                <li>Neutralization of yellow/orange tones</li>
                <li>Previous highlighting requires careful application</li>
              </ul>
            </div>
          </div>
          
          {/* Recommended formulations */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended Formulations</h3>
            
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
              <div className="bg-primary text-white px-4 py-3 font-medium">
                Primary Formula
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p><span className="font-medium">Brand:</span> {analysisResults.recommendations.primaryFormula.brand}</p>
                    <p><span className="font-medium">Line:</span> {analysisResults.recommendations.primaryFormula.colorLine}</p>
                    <p><span className="font-medium">Shades:</span> {analysisResults.recommendations.primaryFormula.shades.join(', ')}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Mixing:</span> {analysisResults.recommendations.primaryFormula.mixing}</p>
                    <p><span className="font-medium">Developer:</span> {analysisResults.recommendations.primaryFormula.developer}</p>
                    <p><span className="font-medium">Processing Time:</span> {analysisResults.recommendations.primaryFormula.processingTime}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
              <div className="bg-secondary text-white px-4 py-3 font-medium">
                Secondary Formula ({analysisResults.recommendations.secondaryFormula.purpose})
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p><span className="font-medium">Brand:</span> {analysisResults.recommendations.secondaryFormula.brand}</p>
                    <p><span className="font-medium">Line:</span> {analysisResults.recommendations.secondaryFormula.colorLine}</p>
                    <p><span className="font-medium">Shades:</span> {analysisResults.recommendations.secondaryFormula.shades.join(', ')}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Developer:</span> {analysisResults.recommendations.secondaryFormula.developer}</p>
                    <p><span className="font-medium">Processing Time:</span> {analysisResults.recommendations.secondaryFormula.processingTime}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Additional Notes</h4>
              <ul className="list-disc list-inside space-y-1">
                {analysisResults.recommendations.additionalNotes.map((note, index) => (
                  <li key={index} className="text-gray-700">{note}</li>
                ))}
              </ul>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button className="btn btn-outline">Save to Client Profile</button>
              <button className="btn btn-primary">Use This Formula</button>
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-4 bg-red-50 text-red-500 p-4 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
};

export default AIConsultationPage; 