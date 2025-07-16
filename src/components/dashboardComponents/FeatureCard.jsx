import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';





export function FeatureCard({ 
  icon, 
  title, 
  desc, 
  isActive, 
  onClick, 
  variant 
}) {
  const getActiveColors = () => {
    switch (variant) {
      case 'employee':
        return 'border-emerald-300/50 bg-gradient-to-br from-emerald-50/50 via-blue-50/50 to-teal-50/50 shadow-xl shadow-emerald-600/20';
      case 'managerialRole':
        return 'border-orange-300/50 bg-gradient-to-br from-orange-50/50 via-red-50/50 to-pink-50/50 shadow-xl shadow-orange-600/20';
      default:
        return 'border-indigo-300/50 bg-gradient-to-br from-purple-50/50 via-indigo-50/50 to-blue-50/50 shadow-xl shadow-indigo-600/20';
    }
  };

  const getActiveGradient = () => {
    switch (variant) {
      case 'employee':
        return 'from-emerald-600 via-blue-600 to-teal-600';
      case 'managerialRole':
        return 'from-orange-600 via-red-600 to-pink-600';
      default:
        return 'from-purple-600 via-indigo-600 to-blue-600';
    }
  };

  const getHoverGradient = () => {
    switch (variant) {
      case 'employee':
        return 'group-hover:from-emerald-600 group-hover:via-blue-600 group-hover:to-teal-600';
      case 'managerialRole':
        return 'group-hover:from-orange-600 group-hover:via-red-600 group-hover:to-pink-600';
      default:
        return 'group-hover:from-purple-600 group-hover:via-indigo-600 group-hover:to-blue-600';
    }
  };

  const getActiveTextColor = () => {
    switch (variant) {
      case 'employee':
        return 'text-emerald-700';
      case 'managerialRole':
        return 'text-orange-700';
      default:
        return 'text-indigo-700';
    }
  };

  const getActiveIconColor = () => {
    switch (variant) {
      case 'employee':
        return 'text-emerald-600 rotate-90';
      case 'managerialRole':
        return 'text-orange-600 rotate-90';
      default:
        return 'text-indigo-600 rotate-90';
    }
  }; 
  const Icon = icon; 

  return (
    <Card 
      className={`cursor-pointer transition-all duration-500 rounded-2xl relative group ${
        isActive 
          ? `${getActiveColors()} backdrop-blur-sm scale-105 border` 
          : 'border-stone-200/80 bg-gradient-to-br from-white/90 to-stone-50/90 backdrop-blur-sm shadow-lg shadow-stone-900/5 hover:border-stone-300/80 hover:shadow-xl hover:shadow-stone-900/10 hover:-translate-y-2 border'
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4 lg:p-6">
        <div className="flex items-center space-x-3 lg:space-x-4">
          <div className={`p-2.5 lg:p-3 rounded-2xl transition-all duration-300 ${
            isActive 
              ? `bg-gradient-to-r ${getActiveGradient()} shadow-lg scale-110` 
              : `bg-gradient-to-r from-stone-100 to-stone-200 ${getHoverGradient()} shadow-md`
          }`}>
            <Icon className={`w-5 h-5 lg:w-6 lg:h-6 transition-colors duration-300 ${
              isActive ? 'text-white' : 'text-slate-600 group-hover:text-white'
            }`} />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className={`text-base lg:text-lg transition-colors ${
              isActive ? getActiveTextColor() : `text-slate-900 group-hover:${getActiveTextColor()}`
            }`}>
              {title}
            </CardTitle>
            <CardDescription className="text-slate-600 text-sm mt-1 leading-relaxed">{desc}</CardDescription>
          </div>
          <ChevronRight className={`w-4 h-4 lg:w-5 lg:h-5 transition-all duration-300 ${
            isActive ? getActiveIconColor() : 'text-slate-400 group-hover:text-slate-600 group-hover:translate-x-1'
          }`} />
        </div>
      </CardContent>
    </Card>
  );
}