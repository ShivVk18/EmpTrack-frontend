import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export function StatsGrid({ stats, className = '' }) {
  if (!stats || stats.length === 0) return null;

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8 ${className}`}>
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card
            key={index}
            className="border-stone-200/80 shadow-lg shadow-stone-900/5 bg-gradient-to-br from-white/90 to-stone-50/90 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:shadow-stone-900/10 transition-all duration-300"
          >
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-3 lg:space-y-0">
                <div className="flex-1">
                  <p className="text-slate-600 text-xs lg:text-sm font-medium">{stat.title}</p>
                  <p className="text-xl lg:text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
                </div>
                <div
                  className={`w-10 h-10 lg:w-12 lg:h-12 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg shadow-stone-900/10`}
                >
                  <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}