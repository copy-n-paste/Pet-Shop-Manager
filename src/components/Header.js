import React, { useState, useRef } from 'react';
import { Bell, User, LogOut, Sun, Moon, Plus, ChevronDown, BarChart3, Home, Package, FileText, Settings } from 'lucide-react';

const TabButton = ({ tab, active, onClick, isDarkMode }) => (
  <button
    key={tab.name}
    onClick={onClick}
    className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-blue-400 focus:z-10
      ${active
        ? isDarkMode
          ? 'bg-gray-600 text-white shadow-lg shadow-gray-900/30 scale-105'
          : 'bg-white text-gray-900 shadow-lg shadow-gray-200/50 scale-105'
        : isDarkMode
          ? 'text-gray-300 hover:text-white hover:bg-gray-600'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}
      `}
    style={{ zIndex: active ? 1 : 0 }}
  >
    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300
      ${active
        ? isDarkMode
          ? 'bg-blue-600/80' : 'bg-blue-100'
        : isDarkMode
          ? 'bg-gray-700' : 'bg-gray-200'}
      group-hover:scale-110 group-hover:shadow-md`}
    >
      <tab.icon className={`h-5 w-5 transition-transform duration-300 ${active ? 'scale-110' : ''}`} />
    </span>
    <span className="font-semibold">{tab.name}</span>
    {active && <span className={`absolute left-2 -bottom-2 w-2 h-2 rounded-full ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'} animate-bounce`} />}
  </button>
);

const Header = ({ onThemeToggle, isDarkMode, activeTab, setActiveTab, onOpenSidebar }) => {
  const tabs = [
    { name: 'Dashboard', icon: Home, color: 'blue' },
    { name: 'Inventory', icon: Package, color: 'green' },
    { name: 'Sales', icon: BarChart3, color: 'purple' },
    { name: 'Reports', icon: FileText, color: 'orange' }
  ];

  // Dropdown state for plus button
  const [plusDropdownOpen, setPlusDropdownOpen] = useState(false);
  const plusRef = useRef();

  // Profile dropdown state
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef();

  // Notification badge (mock)
  const [notifications, setNotifications] = useState(2);

  // Close dropdowns on outside click
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (plusRef.current && !plusRef.current.contains(event.target)) {
        setPlusDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    }
    if (plusDropdownOpen || profileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [plusDropdownOpen, profileDropdownOpen]);

  return (
    <header className={`sticky top-0 z-50 shadow-sm border-b transition-all duration-300 animate-fade-in ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700 shadow-gray-900/50' 
        : 'bg-white border-gray-200 shadow-gray-200/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className={`text-xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                🐾 Pet Shop Dashboard
              </h1>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center">
            <div className={`flex rounded-xl transition-all duration-300 ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              {tabs.map((tab, idx) => (
                <TabButton
                  key={tab.name}
                  tab={tab}
                  active={activeTab === tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button 
              onClick={onThemeToggle}
              className={`p-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                isDarkMode 
                  ? 'text-yellow-400 hover:bg-gray-700 hover:text-yellow-300' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-800'
              }`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Notifications */}
            <button className={`relative p-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              isDarkMode 
                ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'
            }`} aria-label="View notifications">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute top-2 right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full animate-pulse">
                  {notifications}
                </span>
              )}
            </button>

            {/* Plus icon for Inventory only */}
            {activeTab === 'Inventory' && (
              <div className="relative" ref={plusRef}>
                <button
                  className={`p-1 rounded-lg transition-all duration-300 flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    isDarkMode
                      ? 'text-white bg-blue-600 hover:bg-blue-500'
                      : 'text-white bg-primary-500 hover:bg-primary-600'
                  }`}
                  onClick={() => setPlusDropdownOpen((open) => !open)}
                  title="Add Product"
                  aria-haspopup="true"
                  aria-expanded={plusDropdownOpen}
                >
                  <Plus className="h-5 w-5" />
                  <ChevronDown className="h-4 w-4" />
                </button>
                {plusDropdownOpen && (
                  <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 transition-all duration-200 ${
                    isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                  }`}>
                    <button
                      className={`w-full text-left px-4 py-3 rounded-t-lg transition-colors duration-200 focus:outline-none focus:bg-blue-100 ${
                        isDarkMode ? 'hover:bg-blue-700 text-white' : 'hover:bg-primary-100 text-gray-900'
                      }`}
                      onClick={() => {
                        setPlusDropdownOpen(false);
                        onOpenSidebar && onOpenSidebar('single');
                      }}
                    >
                      Add single product
                    </button>
                    <button
                      className={`w-full text-left px-4 py-3 rounded-b-lg transition-colors duration-200 focus:outline-none focus:bg-blue-100 ${
                        isDarkMode ? 'hover:bg-blue-700 text-white' : 'hover:bg-primary-100 text-gray-900'
                      }`}
                      onClick={() => {
                        setPlusDropdownOpen(false);
                        onOpenSidebar && onOpenSidebar('multi');
                      }}
                    >
                      Add multiple products
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Profile dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                className={`flex items-center space-x-2 p-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  isDarkMode 
                    ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700' 
                    : 'text-gray-400 hover:text-gray-500 hover:bg-gray-100'
                }`}
                onClick={() => setProfileDropdownOpen((open) => !open)}
                aria-haspopup="true"
                aria-expanded={profileDropdownOpen}
              >
                <User className="h-5 w-5" />
                <span className={`text-sm font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Store Manager
                </span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {profileDropdownOpen && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 transition-all duration-200 ${
                  isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                }`}>
                  <button
                    className={`w-full text-left px-4 py-3 rounded-t-lg transition-colors duration-200 flex items-center gap-2 focus:outline-none focus:bg-blue-100 ${
                      isDarkMode ? 'hover:bg-blue-700 text-white' : 'hover:bg-primary-100 text-gray-900'
                    }`}
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                  <button
                    className={`w-full text-left px-4 py-3 rounded-b-lg transition-colors duration-200 flex items-center gap-2 focus:outline-none focus:bg-blue-100 ${
                      isDarkMode ? 'hover:bg-red-700 text-white' : 'hover:bg-red-100 text-red-600'
                    }`}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 
