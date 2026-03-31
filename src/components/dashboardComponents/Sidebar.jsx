import React from 'react';
import { DashboardHeader } from './DashboardHeader';
import { UserProfile } from './UserProfile';

import { Navigation } from './Navigation';



export function Sidebar({ config, activeFeature, onFeatureSelect, className = '' }) {
  const features = config.features || [];
  return (  
    <aside className={`hidden lg:flex w-64 bg-amber-50/90 backdrop-blur-md border-r border-amber-200/80 text-amber-950 flex-col shadow-[4px_0_24px_rgba(146,64,14,0.15)] z-30 ${className}`}>
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