import React, { useState } from 'react';
import Hero from './components/Hero';
import ConceptCard from './components/ConceptCard';
import RoadmapTimeline from './components/RoadmapTimeline';
import AiAssistant from './components/AiAssistant';
import { Icons } from './components/Icons';
import { CloudConcept, RoadmapItem } from './types';
import { generateDynamicContent } from './services/geminiService';

const initialConcepts: CloudConcept[] = [
  {
    id: 'iaas',
    title: 'IaaS',
    description: 'Infrastructure as a Service. Renting bare-bones computing power (virtual machines, storage, networks). Think AWS EC2 or Google Compute Engine.',
    iconName: 'Server'
  },
  {
    id: 'paas',
    title: 'PaaS',
    description: 'Platform as a Service. Tools and runtime to build and deploy applications without managing the OS. Think Heroku or Google App Engine.',
    iconName: 'Layers'
  },
  {
    id: 'saas',
    title: 'SaaS',
    description: 'Software as a Service. Ready-to-use software accessed via browser. No maintenance required. Think Gmail, Salesforce, or Slack.',
    iconName: 'Box'
  },
  {
    id: 'serverless',
    title: 'Serverless',
    description: 'Function as a Service. Run code without provisioning servers. You only pay when code runs. Think AWS Lambda or Cloud Functions.',
    iconName: 'Zap'
  },
  {
    id: 'edge',
    title: 'Edge Computing',
    description: 'Processing data closer to where it is created (like IoT devices) rather than sending it across the world to a data center.',
    iconName: 'Globe'
  }
];

const initialRoadmap: RoadmapItem[] = [
  {
    quarter: 'Q1 2025',
    title: 'AI-Native Operations (AIOps)',
    description: 'Cloud providers will integrate Generative AI directly into management consoles. Expect "Text-to-Infrastructure" to become mainstream.',
    tags: ['AI', 'Automation']
  },
  {
    quarter: 'Q2 2025',
    title: 'GreenOps Standardization',
    description: 'New regulations will force carbon reporting for all workloads. Cloud dashboards will prioritize "Low Carbon" regions by default.',
    tags: ['Sustainability', 'Compliance']
  },
  {
    quarter: 'Q3 2025',
    title: 'WebAssembly (Wasm) Maturity',
    description: 'Serverless 2.0 arrives. Wasm containers will replace Docker for microservices, offering millisecond cold starts.',
    tags: ['Performance', 'Compute']
  },
  {
    quarter: 'Q4 2025',
    title: 'Sovereign Cloud 2.0',
    description: 'Complete data residency solutions for regulated industries globally. "Disconnected Cloud" options become accessible.',
    tags: ['Security', 'Privacy']
  },
];

const App: React.FC = () => {
  const [concepts, setConcepts] = useState<CloudConcept[]>(initialConcepts);
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>(initialRoadmap);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateContent = async () => {
    setIsGenerating(true);
    try {
      // Scroll to concepts to show activity
      const conceptsSection = document.getElementById('concepts');
      if (conceptsSection) conceptsSection.scrollIntoView({ behavior: 'smooth' });

      const data = await generateDynamicContent();
      setConcepts(data.concepts);
      setRoadmapItems(data.roadmapItems);
    } catch (error) {
      console.error("Failed to generate content:", error);
      alert("Failed to contact the AI cloud. Please check your connection or API Key.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 selection:bg-blue-500/30">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
           <div className="flex items-center gap-2 font-bold text-xl">
              <Icons.Globe className="w-6 h-6 text-blue-500" />
              <span>CloudHorizon<span className="text-blue-500">2025</span></span>
           </div>
           <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
              <a href="#concepts" className="hover:text-blue-400 transition-colors">Concepts</a>
              <a href="#roadmap" className="hover:text-blue-400 transition-colors">Roadmap</a>
              <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
           </div>
        </div>
      </nav>

      <main>
        <Hero onGenerate={handleGenerateContent} isGenerating={isGenerating} />

        {/* Concepts Section */}
        <section id="concepts" className="py-24 bg-slate-900 relative transition-all">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                {isGenerating ? <span className="animate-pulse">Generating Concepts...</span> : "Core Concepts"}
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                Master the fundamental layers that make up the modern cloud ecosystem.
              </p>
            </div>
            
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isGenerating ? 'opacity-50 blur-sm' : 'opacity-100'}`}>
              {concepts.map(concept => (
                <ConceptCard key={concept.id} concept={concept} />
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section id="roadmap" className="py-24 bg-slate-900/50 relative overflow-hidden transition-all">
           {/* Decorative Background */}
           <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-900 to-slate-900 -z-10" />

           <div className="max-w-7xl mx-auto px-6">
             <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-bold mb-4">
                 {isGenerating ? <span className="animate-pulse">Forecasting Roadmap...</span> : "The 2025 Roadmap"}
               </h2>
               <p className="text-slate-300 max-w-2xl mx-auto">
                 Strategic predictions for the next fiscal year.
               </p>
             </div>

             <div className={isGenerating ? 'opacity-50 blur-sm pointer-events-none' : ''}>
                <RoadmapTimeline items={roadmapItems} />
             </div>
           </div>
        </section>

        {/* Call to Action / Footer */}
        <footer id="about" className="py-24 border-t border-slate-800 bg-slate-950">
           <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold mb-6">Ready for the Future?</h2>
              <p className="text-slate-300 mb-8">
                The cloud is evolving faster than ever. Stay ahead of the curve by adopting AI-native workflows and sustainable practices today.
              </p>
              <div className="text-slate-500 text-sm">
                © 2024-2025 CloudHorizon. Built with React, Tailwind & Gemini API.
              </div>
           </div>
        </footer>

      </main>

      <AiAssistant />
    </div>
  );
};

export default App;