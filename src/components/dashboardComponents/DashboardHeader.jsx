import React from 'react';
import { Sparkles } from 'lucide-react';



export function DashboardHeader({ config, className = '' }) {
  const getGradientColors = () => {
    switch (config.variant) {
      case 'employee':
        return 'from-emerald-600 via-blue-600 to-teal-600';
      case 'managerialRole':
        return 'from-orange-600 via-red-600 to-pink-600';
      default:
        return 'from-purple-600 via-indigo-600 to-blue-600';
    }
  };

  return (
    <div className={`bg-gradient-to-r ${getGradientColors()} text-white p-4 lg:p-6 border-b border-opacity-30 ${className}`}>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 backdrop-blur-sm rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg">
          <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg lg:text-xl font-bold tracking-tight">{config.appName}</h1>
          <p className="text-white/80 text-xs lg:text-sm">{config.portalName}</p>
        </div>
      </div>
    </div>
  );
}