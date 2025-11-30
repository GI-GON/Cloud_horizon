import React from 'react';
import { RoadmapItem } from '../types';

interface RoadmapTimelineProps {
  items: RoadmapItem[];
}

const RoadmapTimeline: React.FC<RoadmapTimelineProps> = ({ items }) => {
  return (
    <div className="relative max-w-4xl mx-auto py-12">
      {/* Central Line */}
      <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500/20 via-blue-500 to-purple-500/20 md:-translate-x-1/2" />

      {items.map((item, index) => {
        const isLeft = index % 2 === 0;
        return (
          <div key={index} className={`relative flex items-center md:justify-between mb-16 ${isLeft ? 'flex-row-reverse' : ''}`}>
            
            {/* Desktop Spacer */}
            <div className="hidden md:block w-5/12" />
            
            {/* Node */}
            <div className="absolute left-[20px] md:left-1/2 w-4 h-4 bg-slate-900 border-4 border-blue-500 rounded-full md:-translate-x-1/2 z-10 shadow-[0_0_15px_rgba(59,130,246,0.5)] transform -translate-x-[7px] md:translate-x-[-8px]" />

            {/* Content Card */}
            <div className="ml-12 md:ml-0 md:w-5/12 bg-slate-800/80 border border-slate-700 p-6 rounded-xl hover:border-blue-500/50 transition-colors shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-blue-400 tracking-wider uppercase">{item.quarter}</span>
                <div className="flex gap-2">
                   {item.tags.map(tag => (
                       <span key={tag} className="text-[10px] px-2 py-1 bg-slate-700 rounded-full text-slate-300">{tag}</span>
                   ))}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-300 text-sm">{item.description}</p>
            </div>

          </div>
        );
      })}
    </div>
  );
};

export default RoadmapTimeline;