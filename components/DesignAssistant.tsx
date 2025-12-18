
import React from 'react';
import { Sparkles, Loader2, Palette, Type as FontIcon, Lightbulb } from 'lucide-react';
import { getDesignSuggestion } from '../services/geminiService';
import { DesignSuggestion } from '../types';

const DesignAssistant: React.FC = () => {
  const [prompt, setPrompt] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [suggestion, setSuggestion] = React.useState<DesignSuggestion | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setLoading(true);
    try {
      const result = await getDesignSuggestion(prompt);
      setSuggestion(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-assistant" className="py-24 bg-emerald-950 text-white rounded-[3rem] my-12 mx-4 md:mx-8 relative overflow-hidden">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-lime-400/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-800/30 border border-emerald-700/50 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-lime-400" />
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-200">AI Design Lab</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6">Bring Your Vision <span className="text-lime-400">to Life</span></h2>
          <p className="text-emerald-200/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Unleash the power of our AI Creative Director. Input your industry or project idea, and get instant color, font, and conceptual inspiration.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="relative max-w-2xl mx-auto mb-16 group">
          <div className="absolute inset-0 bg-emerald-500/20 blur-2xl group-hover:bg-emerald-500/30 transition-all rounded-2xl -z-10"></div>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., A luxury skincare brand focused on herbal extracts"
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-8 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-lg backdrop-blur-md"
          />
          <button
            disabled={loading}
            className="absolute right-3 top-3 bottom-3 bg-emerald-500 text-white px-8 rounded-xl font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-900/40 disabled:opacity-50 flex items-center gap-2 active:scale-95"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Spark Magic'}
          </button>
        </form>

        {suggestion && (
          <div className="grid md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-lime-300">
                  <Lightbulb className="w-6 h-6" />
                  {suggestion.title}
                </h3>
                <p className="text-emerald-50 leading-relaxed mb-6">
                  {suggestion.description}
                </p>
                <div className="space-y-4 pt-6 border-t border-white/5">
                  <h4 className="text-sm font-bold uppercase text-emerald-400 tracking-wider">The Concept</h4>
                  <p className="text-sm italic text-emerald-200/90">{suggestion.concept}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                <div className="mb-8">
                  <h4 className="text-sm font-bold uppercase text-emerald-400 mb-4 flex items-center gap-2 tracking-wider">
                    <Palette className="w-4 h-4" /> Recommended Palette
                  </h4>
                  <div className="flex gap-3">
                    {suggestion.colorPalette.map((color, idx) => (
                      <div key={idx} className="group relative">
                        <div 
                          className="w-12 h-12 rounded-full border border-white/20 shadow-lg cursor-help transition-transform hover:scale-110" 
                          style={{ backgroundColor: color }}
                        />
                        <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 px-2 py-1 rounded text-white whitespace-nowrap z-50">
                          {color}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase text-emerald-400 mb-4 flex items-center gap-2 tracking-wider">
                    <FontIcon className="w-4 h-4" /> Suggested Typography
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {suggestion.fonts.map((font, idx) => (
                      <span key={idx} className="bg-white/10 border border-white/10 px-4 py-2 rounded-xl text-sm font-medium text-emerald-50">
                        {font}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full bg-emerald-500 hover:bg-emerald-400 py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-emerald-950/40 active:scale-95"
              >
                Let's Print This Idea
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DesignAssistant;
