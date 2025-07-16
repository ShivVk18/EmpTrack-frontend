import React from 'react';
import { User } from 'lucide-react';




export function UserProfile({ user, variant, className = '' }) {
  const getGradientColors = () => {
    switch (variant) {
      case 'employee':
        return 'from-emerald-600 via-blue-600 to-teal-600';
      case 'managerialRole':
        return 'from-orange-600 via-red-600 to-pink-600';
      default:
        return 'from-purple-600 via-indigo-600 to-blue-600';
    }
  };

  return (
    <div className={`p-4 lg:p-6 border-b border-stone-200/80 ${className}`}>
      <div className="flex items-center space-x-3">
        <div className={`w-12 h-12 bg-gradient-to-r ${getGradientColors()} rounded-2xl flex items-center justify-center shadow-lg`}>
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full rounded-2xl object-cover" />
          ) : (
            <User className="w-6 h-6 text-white" />
          )}
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-900">{user.name}</h1>
          <p className="text-slate-600 text-sm">{user.role}</p>
          <p className="text-slate-500 text-xs">ID: {user.id}</p>
        </div>
      </div>
    </div>
  );
}