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
        return 'border-amber-300 bg-amber-50 shadow-xl shadow-amber-900/5 ring-1 ring-amber-200';
      case 'managerialRole':
        return 'border-amber-400 bg-amber-100 shadow-xl shadow-amber-900/10 ring-1 ring-amber-300';
      default:
        return 'border-amber-500 bg-white shadow-xl shadow-amber-900/15 ring-1 ring-amber-500';
    }
  };

  const getActiveGradient = () => {
    switch (variant) {
      case 'employee':
        return 'from-amber-400 to-amber-500';
      case 'managerialRole':
        return 'from-amber-500 to-amber-600';
      default:
        return 'from-amber-600 to-amber-700';
    }
  };

  const getHoverGradient = () => {
    switch (variant) {
      case 'employee':
        return 'group-hover:from-amber-400 group-hover:to-amber-500';
      case 'managerialRole':
        return 'group-hover:from-amber-500 group-hover:to-amber-600';
      default:
        return 'group-hover:from-amber-600 group-hover:to-amber-700';
    }
  };

  const getActiveTextColor = () => {
    switch (variant) {
      case 'employee':
        return 'text-amber-800';
      case 'managerialRole':
        return 'text-amber-900';
      default:
        return 'text-amber-950';
    }
  };

  const getActiveIconColor = () => {
    switch (variant) {
      case 'employee':
        return 'text-amber-500 rotate-90';
      case 'managerialRole':
        return 'text-amber-600 rotate-90';
      default:
        return 'text-amber-700 rotate-90';
    }
  }; 
  
  const Icon = icon; 

  return (
    <Card 
      className={`cursor-pointer transition-all duration-200 rounded-2xl relative group overflow-hidden ${
        isActive 
          ? `${getActiveColors()} scale-[1.01]` 
          : 'border-amber-200/80 bg-white/70 backdrop-blur-md shadow-sm hover:bg-white hover:border-amber-300 hover:shadow-lg hover:shadow-amber-200/50 border'
      }`}
      onClick={onClick}
    >
      {isActive && (
        <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${getActiveGradient()}`} />
      )}
      <CardContent className="p-5 lg:p-6">
        <div className="flex items-start space-x-4 lg:space-x-5">
          <div className={`p-3 rounded-xl transition-all duration-200 ${
            isActive 
              ? `bg-gradient-to-br ${getActiveGradient()} shadow-md scale-[1.03]` 
              : `bg-amber-50 border border-amber-100 ${getHoverGradient()} group-hover:shadow-sm`
          }`}>
            <Icon className={`w-6 h-6 transition-colors duration-200 ${
              isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'
            }`} />
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <CardTitle className={`text-base lg:text-lg font-semibold transition-colors ${
              isActive ? getActiveTextColor() : `text-amber-900 group-hover:${getActiveTextColor()}`
            }`}>
              {title}
            </CardTitle>
            <CardDescription className="text-amber-800/80 text-sm mt-1.5 leading-relaxed font-medium">{desc}</CardDescription>
          </div>
          <div className="flex items-center self-center h-full">
            <ChevronRight className={`w-5 h-5 transition-all duration-200 ${
              isActive ? getActiveIconColor() : 'text-amber-300 group-hover:text-amber-500 group-hover:translate-x-0.5'
            }`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}