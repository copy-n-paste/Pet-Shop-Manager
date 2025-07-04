import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, BarChart3 } from 'lucide-react';

const WeeklyChart = ({ data, isDarkMode = false }) => {
  const [animatedData, setAnimatedData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  // Animate chart data on mount
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setAnimatedData(data);
    }, 300);
    return () => clearTimeout(timer);
  }, [data]);

  // Generate gradient colors for bars
  const generateBarColor = (index, isDarkMode) => {
    const colors = isDarkMode ? [
      '#3B82F6', '#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#EC4899'
    ] : [
      '#2563EB', '#7C3AED', '#0891B2', '#059669', '#D97706', '#DC2626', '#DB2777'
    ];
    return colors[index % colors.length];
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`rounded-xl shadow-lg border p-4 transition-all duration-200 backdrop-blur-sm ${
          isDarkMode 
            ? 'bg-gray-800/95 border-gray-600 text-white' 
            : 'bg-white/95 border-gray-200 text-gray-900'
        }`}>
          <p className="font-semibold text-sm mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-sm">
                {entry.dataKey === 'sales' 
                  ? `${entry.value} sales` 
                  : `₹${entry.value.toLocaleString()} revenue`
                }
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const totalSales = data.reduce((sum, item) => sum + item.sales, 0);
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const avgDaily = Math.round(totalSales / data.length);

  return (
    <div className={`group relative rounded-xl shadow-lg border p-6 transition-all duration-500 hover:shadow-2xl overflow-hidden ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 border-gray-700 shadow-gray-900/50 hover:shadow-gray-900/75' 
        : 'bg-gradient-to-br from-white via-white to-gray-50 border-gray-200 shadow-gray-200/50 hover:shadow-gray-300/75'
    } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      
      {/* Animated background gradient */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${
        isDarkMode 
          ? 'from-blue-500/5 via-purple-500/5 to-green-500/5' 
          : 'from-blue-500/5 via-purple-500/5 to-green-500/5'
      }`}></div>
      
      {/* Header with stats */}
      <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className={`text-lg font-semibold mb-2 transition-all duration-300 group-hover:scale-105 flex items-center gap-2 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <BarChart3 className="h-5 w-5 text-blue-500 group-hover:rotate-12 transition-transform duration-300" />
            Weekly Sales Overview
          </h3>
          <p className={`text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Last 7 days performance trends
          </p>
        </div>
        
        {/* Quick stats */}
        <div className="flex gap-3 mt-4 lg:mt-0">
          <div className={`text-center p-3 rounded-xl border transition-all duration-300 hover:scale-105 ${
            isDarkMode ? 'bg-gray-700/30 border-gray-600/50 backdrop-blur-sm' : 'bg-gray-100/50 border-gray-200/50 backdrop-blur-sm'
          }`}>
            <div className={`text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Total Sales</div>
            <div className={`text-lg font-bold ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>{totalSales}</div>
          </div>
          <div className={`text-center p-3 rounded-xl border transition-all duration-300 hover:scale-105 ${
            isDarkMode ? 'bg-gray-700/30 border-gray-600/50 backdrop-blur-sm' : 'bg-gray-100/50 border-gray-200/50 backdrop-blur-sm'
          }`}>
            <div className={`text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Revenue</div>
            <div className={`text-lg font-bold ${
              isDarkMode ? 'text-green-400' : 'text-green-600'
            }`}>₹{(totalRevenue/1000).toFixed(0)}k</div>
          </div>
          <div className={`text-center p-3 rounded-xl border transition-all duration-300 hover:scale-105 ${
            isDarkMode ? 'bg-gray-700/30 border-gray-600/50 backdrop-blur-sm' : 'bg-gray-100/50 border-gray-200/50 backdrop-blur-sm'
          }`}>
            <div className={`text-xs font-medium mb-1 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Daily Avg</div>
            <div className={`text-lg font-bold ${
              isDarkMode ? 'text-purple-400' : 'text-purple-600'
            }`}>{avgDaily}</div>
          </div>
        </div>
      </div>
      
      {/* Chart */}
      <div className="relative h-80 transition-all duration-500 group-hover:scale-[1.01]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={animatedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              {animatedData.map((_, index) => (
                <linearGradient key={index} id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={generateBarColor(index, isDarkMode)} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={generateBarColor(index, isDarkMode)} stopOpacity={0.3}/>
                </linearGradient>
              ))}
            </defs>
            
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={isDarkMode ? '#374151' : '#E5E7EB'} 
              strokeOpacity={0.4}
            />
            
            <XAxis 
              dataKey="day" 
              stroke={isDarkMode ? '#9CA3AF' : '#6B7280'}
              fontSize={12}
              fontWeight={500}
              axisLine={false}
              tickLine={false}
              tick={{ fontFamily: 'system-ui' }}
            />
            
            <YAxis 
              stroke={isDarkMode ? '#9CA3AF' : '#6B7280'} 
              fontSize={12}
              fontWeight={500}
              axisLine={false}
              tickLine={false}
              tick={{ fontFamily: 'system-ui' }}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            <Bar 
              dataKey="sales" 
              radius={[8, 8, 0, 0]}
              animationDuration={1200}
              animationBegin={300}
            >
              {animatedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={`url(#gradient-${index})`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend */}
      <div className="relative mt-4 flex items-center justify-center">
        <div className="flex items-center gap-2 text-sm">
          <div className={`w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500`}></div>
          <span className={`font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>Daily Sales Count</span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyChart;
