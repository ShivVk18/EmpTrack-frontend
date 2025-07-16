import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navigation({
  features = [],
  activeFeature,
  onFeatureSelect,
  variant,
  className = '',
}) {
  const getActiveColors = () => {
    switch (variant) {
      case 'employee':
        return 'from-emerald-600/10 via-blue-600/10 to-teal-600/10 border-emerald-200/50';
      case 'managerialRole':
        return 'from-orange-600/10 via-red-600/10 to-pink-600/10 border-orange-200/50';
      default:
        return 'from-purple-600/10 via-indigo-600/10 to-blue-600/10 border-purple-200/50';
    }
  };

  const getActiveIconColor = () => {
    switch (variant) {
      case 'employee':
        return 'text-emerald-600';
      case 'managerialRole':
        return 'text-orange-600';
      default:
        return 'text-indigo-600';
    }
  };

  // Don't render anything if features are empty
  if (!features || features.length === 0) return null;

  return (
    <nav
      className={`flex-1 p-3 sm:p-4 lg:p-6 space-y-2 overflow-y-auto ${className}`}
    >
      {features.map((feature) => (
        <Button
          key={feature.title}
          variant={activeFeature === feature.title ? 'default' : 'ghost'}
          onClick={() => {
            onFeatureSelect(feature.title);
            feature.onClick?.();
          }}
          className={`w-full justify-between h-auto px-3 py-2 sm:p-3 text-left ${
            activeFeature === feature.title
              ? `bg-gradient-to-r ${getActiveColors()} text-slate-900 border shadow-sm`
              : 'hover:bg-stone-100/50 text-slate-700 hover:text-slate-900'
          }`}
        >
          <div className="flex items-center space-x-2 sm:space-x-3">
            <feature.icon
              className={`w-5 h-5 ${
                activeFeature === feature.title
                  ? getActiveIconColor()
                  : 'text-slate-600'
              }`}
            />
            <span className="text-sm sm:text-base font-medium">
              {feature.title}
            </span>
          </div>
          <ChevronRight
            className={`w-4 h-4 transition-transform duration-200 ${
              activeFeature === feature.title
                ? `rotate-90 ${getActiveIconColor()}`
                : 'text-slate-400'
            }`}
          />
        </Button>
      ))}
    </nav>
  );
}
