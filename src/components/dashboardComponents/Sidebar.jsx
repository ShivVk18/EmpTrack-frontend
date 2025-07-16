import React from 'react';
import { DashboardHeader } from './DashboardHeader';
import { UserProfile } from './UserProfile';

import { Navigation } from './Navigation';



export function Sidebar({ config, activeFeature, onFeatureSelect, className = '' }) {
  const features = config.features || [];
  return (  
     
     
    <aside className={`hidden lg:flex w-64 bg-white/90 backdrop-blur-sm border-r border-stone-200/80 text-slate-900 flex-col shadow-lg shadow-stone-900/10 ${className}`}>
      <DashboardHeader config={config} />
      
      <UserProfile user={config.user} variant={config.variant} />
     

      {features.length > 0 && (
        <Navigation
          features={features}
          activeFeature={activeFeature}
          onFeatureSelect={onFeatureSelect}
          variant={config.variant}
        />
      )}
    </aside>
  );
}