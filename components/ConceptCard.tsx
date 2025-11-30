import React from 'react';
import { CloudConcept } from '../types';
import { Icons } from './Icons';

interface ConceptCardProps {
  concept: CloudConcept;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ concept }) => {
  const IconComponent = Icons[concept.iconName];

  return (
    <div className="group relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-blue-500/50 rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10">
        <div className="w-14 h-14 bg-slate-700/50 rounded-xl flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors">
          <IconComponent className="w-7 h-7" />
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-3">{concept.title}</h3>
        <p className="text-slate-300 leading-relaxed">{concept.description}</p>
      </div>
    </div>
  );
};

export default ConceptCard;