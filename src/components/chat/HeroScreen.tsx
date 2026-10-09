import React, { useRef, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { Sparkles, ArrowUp, Smartphone, Shirt, Laptop, RefreshCw, PackageSearch, HelpCircle } from 'lucide-react';

interface HeroScreenProps {
  inputPrompt: string;
  setInputPrompt: (val: string) => void;
  onSubmitPrompt: (text?: string) => void;
  isLoading: boolean;
}

export const HeroScreen: React.FC<HeroScreenProps> = ({
  inputPrompt,
  setInputPrompt,
  onSubmitPrompt,
  isLoading,
}) => {
  const { userProfile } = useApp();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputPrompt.trim() && !isLoading) {
        onSubmitPrompt();
      }
    }
  };

  const samplePrompts = [
    {
      title: 'Phones under ₹30,000',
      desc: 'Good camera & big battery',
      icon: Smartphone,
      prompt: 'I need a phone under ₹30,000 with a good camera and battery.',
    },
    {
      title: 'Red Sarees under ₹2,000',
      desc: 'Festive Diwali delivery',
      icon: Shirt,
      prompt: 'Mujhe 2000 ke andar red saree chahiye aur Diwali se pehle delivery honi chahiye.',
    },
    {
      title: 'Compare Laptops',
      desc: 'MacBook Air vs Vivobook',
      icon: Laptop,
      prompt: 'Compare the best laptops for students under ₹60,000.',
    },
    {
      title: 'Track Order',
      desc: 'Check live status of ORD-10025',
      icon: PackageSearch,
      prompt: 'ORD-10025 ka status batao.',
    },
    {
      title: 'Store Policies',
      desc: 'Return & refund window',
      icon: RefreshCw,
      prompt: 'Return policy kya hai?',
    },
    {
      title: 'Customer Support',
      desc: 'Talk to an agent',
      icon: HelpCircle,
      prompt: 'Customer support se baat karni hai.',
    },
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-2xl w-full mx-auto my-auto p-4 sm:py-8 animate-in fade-in duration-300">
      {/* Glowing 3D Orb */}
      <div className="relative w-24 h-24 mb-4 flex items-center justify-center select-none">
        <div className="absolute w-28 h-28 rounded-full bg-violet-400/20 blur-2xl animate-pulse-subtle"></div>
        <div
          className="w-20 h-20 rounded-full orb-glow animate-orb-float shadow-xl flex items-center justify-center cursor-pointer"
          title="BharatShop AI Core"
        >
          <div className="w-5 h-5 rounded-full bg-white/50 blur-[2px] ml-4 mt-3"></div>
        </div>
      </div>

      {/* Greeting Heading */}
      <div className="text-center mb-6 select-none">
        <p className="text-violet-600 text-sm font-semibold tracking-wide uppercase mb-1">
          Namaste, {userProfile.full_name.split(' ')[0]} 🙏
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950 tracking-tight">
          How can I assist your shopping today?
        </h2>
        <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
          Ask in English, Hindi, Hinglish, or Indian languages with natural budgets & requirements.
        </p>
      </div>

      {/* Input Composer Box */}
      <div className="w-full bg-white border border-gray-200 rounded-2xl p-3 shadow-md focus-within:ring-2 focus-within:ring-violet-300 focus-within:border-violet-400 transition-all mb-6">
        <textarea
          ref={textareaRef}
          rows={2}
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything... e.g. 'Show me a phone under 30k with good battery' or 'ORD-10025 ka status'"
          className="w-full text-sm bg-transparent border-none outline-hidden resize-none placeholder-gray-400 text-gray-800"
        />

        <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-1">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <span className="font-medium text-violet-700 bg-violet-50 px-2 py-0.5 rounded-md">
              ⚡ Grounded in 200+ Products
            </span>
          </div>

          <button
            type="button"
            onClick={() => onSubmitPrompt()}
            disabled={!inputPrompt.trim() || isLoading}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              inputPrompt.trim() && !isLoading
                ? 'bg-violet-600 hover:bg-violet-700 text-white shadow-md'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            title="Send prompt (Enter)"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <ArrowUp className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Suggested Prompt Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {samplePrompts.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              onClick={() => onSubmitPrompt(card.prompt)}
              className="p-3 bg-white/80 hover:bg-white border border-gray-200/80 hover:border-violet-300 rounded-xl cursor-pointer transition-all shadow-2xs hover:shadow-sm flex items-start gap-3 group text-left"
            >
              <div className="p-2 rounded-lg bg-violet-50 text-violet-700 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-gray-900 group-hover:text-violet-700 transition-colors truncate">
                  {card.title}
                </h4>
                <p className="text-[11px] text-gray-500 truncate">{card.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
