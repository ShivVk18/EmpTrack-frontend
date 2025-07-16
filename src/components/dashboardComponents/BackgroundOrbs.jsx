import React from 'react';



export function BackgroundOrbs({ variant = 'default' }) {
  const getOrbColors = () => {
    switch (variant) {
      case 'employee':
        return {
          orb1: 'from-emerald-600/8 to-emerald-400/4',
          orb2: 'from-blue-600/12 to-blue-400/6',
          orb3: 'from-teal-600/10 to-teal-400/5'
        };
      case 'managerialRole':
        return {
          orb1: 'from-orange-600/8 to-orange-400/4',
          orb2: 'from-red-600/12 to-red-400/6',
          orb3: 'from-pink-600/10 to-pink-400/5'
        };
      default:
        return {
          orb1: 'from-purple-600/8 to-purple-400/4',
          orb2: 'from-indigo-600/12 to-indigo-400/6',
          orb3: 'from-blue-600/10 to-blue-400/5'
        };
    }
  };

  const colors = getOrbColors();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className={`absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br ${colors.orb1} rounded-full blur-3xl`}></div>
      <div className={`absolute top-1/3 -left-32 w-80 h-80 bg-gradient-to-br ${colors.orb2} rounded-full blur-3xl`}></div>
      <div className={`absolute bottom-20 right-1/4 w-72 h-72 bg-gradient-to-br ${colors.orb3} rounded-full blur-3xl`}></div>
    </div>
  );
}