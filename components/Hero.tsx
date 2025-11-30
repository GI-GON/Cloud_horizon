import React from 'react';
import { Icons } from './Icons';

interface HeroProps {
  onGenerate: () => void;
  isGenerating: boolean;
}

const Hero: React.FC<HeroProps> = ({ onGenerate, isGenerating }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] bg-purple-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-8 animate-fade-in-up">
          <Icons.Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium tracking-wide">Future of Infrastructure</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
          <span className="block">Cloud Computing</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Roadmap 2025
          </span>
        </h1>
        
        <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Discover the core concepts powering the internet and explore the trends 
          shaping the future of digital infrastructure.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={onGenerate}
            disabled={isGenerating}
            className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-wait text-white rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-600/25 flex items-center gap-2"
          >
             {isGenerating ? (
               <>
                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                 <span>Generating Insights...</span>
               </>
             ) : (
               <>
                 <Icons.Sparkles className="w-5 h-5" />
                 <span>Generate Live Insights</span>
               </>
             )}
          </button>
          <a href="#concepts" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg font-semibold transition-all hover:scale-105">
            Explore Basics
          </a>
        </div>
        
        {isGenerating && (
          <p className="mt-4 text-sm text-blue-400 animate-pulse">
            Consulting the AI Oracle for latest trends...
          </p>
        )}
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
        <Icons.ArrowDown className="w-6 h-6" />
      </div>
    </section>
  );
};

export default Hero;