import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, percentage, trend, icon: Icon, color = 'primary', isDarkMode = false, subtitle }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Animation for number counting
  useEffect(() => {
    setIsVisible(true);
    const numericValue = typeof value === 'string' ? 
      parseFloat(value.replace(/[^0-9.-]+/g, '')) : value;
    
    if (isNaN(numericValue)) {
      setDisplayValue(value);
      return;
    }

    const duration = 1500;
    const increment = numericValue / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        current = numericValue;
        clearInterval(timer);
      }
      
      if (typeof value === 'string' && value.includes('₹')) {
        setDisplayValue(`₹${Math.floor(current).toLocaleString()}`);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  const gradientBg = {
    primary: isDarkMode
      ? 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-400/20'
      : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200',
    success: isDarkMode
      ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-400/20'
      : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200',
    warning: isDarkMode
      ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-400/20'
      : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200',
    danger: isDarkMode
      ? 'bg-gradient-to-br from-red-500/10 to-pink-500/10 border-red-400/20'
      : 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200'
  };

  const iconColorClasses = {
    primary: isDarkMode 
      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-400/30' 
      : 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 border border-blue-200',
    success: isDarkMode 
      ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-400/30' 
      : 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-600 border border-green-200',
    warning: isDarkMode 
      ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border border-yellow-400/30' 
      : 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-600 border border-yellow-200',
    danger: isDarkMode 
      ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 border border-red-400/30' 
      : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-600 border border-red-200'
  };

  const trendColor = trend === 'up' 
    ? (isDarkMode ? 'text-green-400' : 'text-green-600') 
    : (isDarkMode ? 'text-red-400' : 'text-red-600');

  return (
    <div className={`group relative rounded-xl shadow-lg border p-6 transition-all duration-500 hover:shadow-2xl hover:scale-105 ${
      isDarkMode 
        ? `bg-gray-800 border-gray-700 shadow-gray-900/50 hover:shadow-gray-900/75 ${gradientBg[color]}` 
        : `bg-white border-gray-200 shadow-gray-200/50 hover:shadow-gray-300/75 ${gradientBg[color]}`
    } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      
      {/* Hover effect background */}
      <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        color === 'primary' ? 'bg-gradient-to-br from-blue-500/5 to-purple-500/5' :
        color === 'success' ? 'bg-gradient-to-br from-green-500/5 to-emerald-500/5' :
        color === 'warning' ? 'bg-gradient-to-br from-yellow-500/5 to-orange-500/5' :
        'bg-gradient-to-br from-red-500/5 to-pink-500/5'
      }`}></div>
      
      <div className="relative flex items-center justify-between">
        <div className="flex-1">
          <p className={`text-sm font-medium transition-all duration-300 group-hover:text-opacity-80 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {title}
          </p>
          <p className={`mt-2 text-3xl font-bold transition-all duration-300 group-hover:scale-105 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {displayValue}
          </p>
          {subtitle && (
            <p className={`text-xs transition-colors duration-300 mt-1 ${
              isDarkMode ? 'text-gray-500' : 'text-gray-500'
            }`}>
              {subtitle}
            </p>
          )}
          {percentage !== 0 && (
            <div className={`mt-3 flex items-center ${trendColor} transition-all duration-300`}>
              {trend === 'up' ? 
                <TrendingUp className="h-4 w-4 group-hover:animate-bounce" /> : 
                <TrendingDown className="h-4 w-4 group-hover:animate-bounce" />
              }
              <span className="ml-2 text-sm font-medium">
                {percentage}% from yesterday
              </span>
            </div>
          )}
        </div>
        <div className={`p-4 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${iconColorClasses[color]}`}>
          <Icon className="h-7 w-7" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
