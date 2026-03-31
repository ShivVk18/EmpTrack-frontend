import React from 'react';

export function BackgroundOrbs({ variant = 'default' }) {
  const getOrbColors = () => {
    switch (variant) {
      case 'employee':
        return {
          orb1: 'from-amber-300/40 to-orange-200/20',
          orb2: 'from-amber-200/40 to-yellow-100/10',
          orb3: 'from-orange-300/40 to-amber-200/20'
        };
      case 'managerialRole':
        return {
          orb1: 'from-amber-400/40 to-orange-300/20',
          orb2: 'from-amber-300/40 to-amber-200/20',
          orb3: 'from-orange-400/40 to-amber-300/20'
        };
      default:
        return {
          orb1: 'from-amber-500/35 to-orange-400/20',
          orb2: 'from-amber-400/35 to-yellow-300/15',
          orb3: 'from-orange-500/35 to-amber-400/20'
        };
    }
  };

  const colors = getOrbColors();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className={`absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br ${colors.orb1} rounded-full blur-[130px] opacity-70`}></div>
      <div className={`absolute top-1/3 -left-32 w-[400px] h-[400px] bg-gradient-to-br ${colors.orb2} rounded-full blur-[110px] opacity-60`}></div>
      <div className={`absolute bottom-20 right-1/4 w-[450px] h-[450px] bg-gradient-to-br ${colors.orb3} rounded-full blur-[110px] opacity-55`}></div>
    </div>
  );
}