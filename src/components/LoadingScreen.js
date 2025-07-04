import React, { useState, useEffect } from 'react';
import { Package, ShoppingCart, BarChart3, Heart, Star, Zap, Gift } from 'lucide-react';

const LoadingScreen = ({ isDarkMode = false }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [showFeatures, setShowFeatures] = useState(false);
  const [animateIcons, setAnimateIcons] = useState(false);

  const loadingSteps = [
    'Initializing system...',
    'Loading inventory data...',
    'Setting up dashboard...',
    'Preparing analytics...',
    'Almost ready!'
  ];

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2; // Increase by 2% every 100ms (5 seconds total)
      });
    }, 100);

    // Step changes
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % loadingSteps.length);
    }, 1000);

    // Show features after 2 seconds
    const featuresTimer = setTimeout(() => setShowFeatures(true), 2000);
    
    // Animate icons after 1 second
    const iconsTimer = setTimeout(() => setAnimateIcons(true), 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
      clearTimeout(featuresTimer);
      clearTimeout(iconsTimer);
    };
  }, []);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-500 overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
    }`}>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main floating shapes */}
        <div className={`absolute -top-4 -left-4 w-72 h-72 rounded-full opacity-10 animate-bounce ${
          isDarkMode ? 'bg-blue-500' : 'bg-blue-400'
        }`} style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className={`absolute top-1/2 -right-8 w-96 h-96 rounded-full opacity-10 animate-bounce ${
          isDarkMode ? 'bg-purple-500' : 'bg-purple-400'
        }`} style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className={`absolute -bottom-8 left-1/2 w-80 h-80 rounded-full opacity-10 animate-bounce ${
          isDarkMode ? 'bg-green-500' : 'bg-green-400'
        }`} style={{ animationDelay: '2s', animationDuration: '3.5s' }}></div>
        
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className={`w-full h-full animate-pulse ${
            isDarkMode 
              ? 'bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10'
              : 'bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-green-500/5'
          }`} style={{ animationDuration: '4s' }}></div>
        </div>
      </div>

      {/* Main loading content */}
      <div className="relative text-center">
        
        {/* Logo and icons */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            {/* Central icon */}
            <div className={`p-6 rounded-full border-4 transition-all duration-500 animate-pulse ${
              isDarkMode 
                ? 'bg-gray-800 border-blue-500 shadow-lg shadow-blue-500/25' 
                : 'bg-white border-blue-500 shadow-lg shadow-blue-500/25'
            }`}>
              <Package className="h-12 w-12 text-blue-500" />
            </div>
            
            {/* Orbiting icons */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '8s' }}>
              <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 p-2 rounded-full ${
                isDarkMode ? 'bg-gray-700' : 'bg-white shadow-lg'
              }`}>
                <ShoppingCart className="h-5 w-5 text-green-500" />
              </div>
              <div className={`absolute top-1/2 -right-2 transform -translate-y-1/2 p-2 rounded-full ${
                isDarkMode ? 'bg-gray-700' : 'bg-white shadow-lg'
              }`}>
                <BarChart3 className="h-5 w-5 text-purple-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className={`text-4xl font-bold mb-4 animate-fade-in-up ${
          isDarkMode ? 'text-white' : 'text-gray-800'
        }`} style={{ animationDelay: '0.2s' }}>
          🐾 Pet Shop Dashboard
        </h1>
        
        {/* Subtitle */}
        <p className={`text-lg mb-8 animate-fade-in-up ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`} style={{ animationDelay: '0.4s' }}>
          Loading your inventory management system...
        </p>

        {/* Progress section */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          {/* Loading step text */}
          <div className={`mb-4 text-sm font-medium transition-all duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {loadingSteps[currentStep]}
          </div>
          
          {/* Progress bar container */}
          <div className={`w-80 h-3 rounded-full overflow-hidden mx-auto border ${
            isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-200 border-gray-300'
          }`}>
            {/* Progress bar fill */}
            <div 
              className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect on progress bar */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
                   style={{ 
                     backgroundSize: '200% 100%',
                     animation: 'shimmer 1.5s infinite'
                   }}>
              </div>
            </div>
          </div>
          
          {/* Progress percentage */}
          <div className={`mt-2 text-xs font-semibold ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {Math.round(progress)}%
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center mt-6 space-x-2 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className={`w-2 h-2 rounded-full animate-bounce ${
            isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
          }`} style={{ animationDelay: '0s' }}></div>
          <div className={`w-2 h-2 rounded-full animate-bounce ${
            isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
          }`} style={{ animationDelay: '0.1s' }}></div>
          <div className={`w-2 h-2 rounded-full animate-bounce ${
            isDarkMode ? 'bg-blue-400' : 'bg-blue-500'
          }`} style={{ animationDelay: '0.2s' }}></div>
        </div>

        {/* Features preview */}
        {showFeatures && (
          <div className={`mt-12 animate-fade-in-up ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`} style={{ animationDelay: '1s' }}>
            
            {/* Features grid */}
            <div className="grid grid-cols-3 gap-8 mb-6">
              <div className={`transition-all duration-700 hover:scale-110 ${
                animateIcons ? 'animate-fade-in opacity-100' : 'opacity-0'
              }`} style={{ animationDelay: '0.2s' }}>
                <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-blue-500/30 hover:border-blue-500/60' 
                    : 'bg-white/50 border-blue-300/50 hover:border-blue-500/80'
                }`}>
                  <Package className="h-8 w-8 mx-auto mb-3 text-blue-500 animate-pulse" />
                  <p className="text-sm font-semibold">Inventory</p>
                  <p className="text-xs opacity-70 mt-1">Manage products</p>
                </div>
              </div>
              
              <div className={`transition-all duration-700 hover:scale-110 ${
                animateIcons ? 'animate-fade-in opacity-100' : 'opacity-0'
              }`} style={{ animationDelay: '0.4s' }}>
                <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-green-500/30 hover:border-green-500/60' 
                    : 'bg-white/50 border-green-300/50 hover:border-green-500/80'
                }`}>
                  <ShoppingCart className="h-8 w-8 mx-auto mb-3 text-green-500 animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <p className="text-sm font-semibold">Sales</p>
                  <p className="text-xs opacity-70 mt-1">Track transactions</p>
                </div>
              </div>
              
              <div className={`transition-all duration-700 hover:scale-110 ${
                animateIcons ? 'animate-fade-in opacity-100' : 'opacity-0'
              }`} style={{ animationDelay: '0.6s' }}>
                <div className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-800/50 border-purple-500/30 hover:border-purple-500/60' 
                    : 'bg-white/50 border-purple-300/50 hover:border-purple-500/80'
                }`}>
                  <BarChart3 className="h-8 w-8 mx-auto mb-3 text-purple-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
                  <p className="text-sm font-semibold">Analytics</p>
                  <p className="text-xs opacity-70 mt-1">View insights</p>
                </div>
              </div>
            </div>
            
            {/* Additional feature highlights */}
            <div className="flex justify-center space-x-6 mt-8">
              <div className={`flex items-center space-x-2 animate-slide-in-right ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`} style={{ animationDelay: '1.5s' }}>
                <Heart className="h-4 w-4 text-red-500 animate-pulse" />
                <span className="text-xs font-medium">Modern UI</span>
              </div>
              
              <div className={`flex items-center space-x-2 animate-slide-in-right ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`} style={{ animationDelay: '1.7s' }}>
                <Zap className="h-4 w-4 text-yellow-500 animate-pulse" />
                <span className="text-xs font-medium">Fast & Responsive</span>
              </div>
              
              <div className={`flex items-center space-x-2 animate-slide-in-right ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`} style={{ animationDelay: '1.9s' }}>
                <Star className="h-4 w-4 text-blue-500 animate-pulse" />
                <span className="text-xs font-medium">Professional</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
