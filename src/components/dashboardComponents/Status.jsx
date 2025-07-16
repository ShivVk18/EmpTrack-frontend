import React from 'react';
import { DashboardConfig } from './types';


export function StatusInfo({ statusInfo, activeUsersInfo, className = '' }) {
  if (!statusInfo && !activeUsersInfo) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-emerald-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-red-500';
      default:
        return 'bg-emerald-500';
    }
  };

  return (
    <div className={`p-4 lg:p-6 border-b border-stone-200/80 bg-gradient-to-r from-stone-50/50 to-white/50 ${className}`}>
      {statusInfo && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">{statusInfo.label}:</span>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 ${getStatusColor(statusInfo.status)} rounded-full shadow-sm`}></div>
            <span className="text-emerald-600 font-medium">{statusInfo.value}</span>
          </div>
        </div>
      )}
      {activeUsersInfo && (
        <div className={`flex items-center justify-between text-sm ${statusInfo ? 'mt-3' : ''}`}>
          <span className="text-slate-600">{activeUsersInfo.label}:</span>
          <span className="text-slate-900 font-semibold">{activeUsersInfo.value}</span>
        </div>
      )}
    </div>
  );
}