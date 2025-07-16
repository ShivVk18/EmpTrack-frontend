import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

import { DashboardHeader } from './DashboardHeader';
import { UserProfile } from './UserProfile';

import { Navigation } from './Navigation';



export function MobileMenuOverlay({ 
  isOpen, 
  onClose, 
  config, 
  activeFeature, 
  onFeatureSelect 
}) {
  if (!isOpen) return null;

  const handleFeatureSelect = (title) => {
    onFeatureSelect(title);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white/95 backdrop-blur-sm shadow-2xl">
        <div className="flex flex-col h-full">
          <div className="relative">
            <DashboardHeader config={config} />
            <Button
              variant="default"
              size="sm"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors text-white hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <UserProfile user={config.user} variant={config.variant} />
          
          

          <Navigation
            features={config.features}
            activeFeature={activeFeature}
            onFeatureSelect={handleFeatureSelect}
            variant={config.variant}
          />
        </div>
      </div>
    </div>
  );
}