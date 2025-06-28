import React, { useState, useRef } from 'react';
import { Camera, Upload, Search, Loader2, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import Tesseract from 'tesseract.js';

const sampleAnswers = [
  {
    id: 1,
    question: "What is the value of x in 2x + 5 = 15?",
    answer: "x = 5",
    explanation: "Subtract 5 from both sides: 2x = 10, then divide by 2: x = 5",
    subject: "Mathematics",
    confidence: 95
  },
  {
    id: 2,
    question: "Solve for x: 2x + 5 = 15",
    answer: "x = 5",
    explanation: "Step 1: Subtract 5 from both sides\n2x + 5 - 5 = 15 - 5\n2x = 10\n\nStep 2: Divide both sides by 2\nx = 10/2 = 5",
    subject: "Algebra",
    confidence: 98
  }
];

export default function CameraScanner() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleImageUpload = async (file) => {
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);
    setIsProcessing(true);
    setShowResults(false);

    try {
      // Extract text using Tesseract
      const { data: { text } } = await Tesseract.recognize(file, 'eng', {
        logger: m => console.log(m)
      });
      
      setExtractedText(text);
      
      // Simulate search for answers
      setTimeout(() => {
        setSearchResults(sampleAnswers);
        setShowResults(true);
        setIsProcessing(false);
      }, 2000);
    } catch (error) {
      console.error('OCR Error:', error);
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleCameraCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const resetScanner = () => {
    setSelectedImage(null);
    setExtractedText('');
    setSearchResults([]);
    setShowResults(false);
    setIsProcessing(false);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-6"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Question Scanner</h1>
          <p className="text-gray-600">Snap a photo of any question and get instant solutions</p>
        </div>

        {!selectedImage && !isProcessing && (
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Camera Option */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors cursor-pointer"
                onClick={() => cameraInputRef.current?.click()}
              >
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleCameraCapture}
                  className="hidden"
                />
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Take Photo</h3>
                <p className="text-gray-600">Use your camera to capture the question</p>
              </motion.div>

              {/* Upload Option */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary-400 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-secondary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Image</h3>
                <p className="text-gray-600">Choose an image from your device</p>
              </motion.div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tips for best results:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span>Ensure good lighting and clear visibility</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span>Keep the question centered in the frame</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                  <span>Avoid shadows and glare on the text</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {selectedImage && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Preview */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Captured Image</h3>
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <img
                    src={selectedImage}
                    alt="Captured question"
                    className="w-full h-auto"
                  />
                </div>
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={resetScanner}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Take Another Photo
                  </button>
                </div>
              </div>

              {/* Processing/Results */}
              <div>
                {isProcessing && (
                  <div className="text-center py-12">
                    <Loader2 className="h-12 w-12 text-primary-600 animate-spin mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Image...</h3>
                    <p className="text-gray-600">Extracting text and searching for solutions</p>
                  </div>
                )}

                {showResults && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Results</h3>
                    
                    {extractedText && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h4 className="font-medium text-gray-900 mb-2">Extracted Text:</h4>
                        <p className="text-sm text-gray-700">{extractedText}</p>
                      </div>
                    )}

                    <div className="space-y-4">
                      {searchResults.map((result, index) => (
                        <motion.div
                          key={result.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border border-gray-200 rounded-lg p-6"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <BookOpen className="h-5 w-5 text-primary-600" />
                              <span className="text-sm font-medium text-primary-600">{result.subject}</span>
                            </div>
                            <div className="text-sm text-gray-500">
                              {result.confidence}% match
                            </div>
                          </div>
                          
                          <h4 className="font-semibold text-gray-900 mb-2">{result.question}</h4>
                          
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-3">
                            <div className="font-medium text-green-800 mb-2">Answer:</div>
                            <div className="text-green-700">{result.answer}</div>
                          </div>
                          
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="font-medium text-blue-800 mb-2">Explanation:</div>
                            <div className="text-blue-700 whitespace-pre-line">{result.explanation}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}