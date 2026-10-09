import React, { useRef, useEffect } from 'react';

interface HeroScreenProps {
  inputPrompt: string;
  setInputPrompt: (val: string) => void;
  onSubmitPrompt: (promptText?: string) => void;
  isDeepResearch: boolean;
  setIsDeepResearch: (val: boolean | ((prev: boolean) => boolean)) => void;
  useWebSearch: boolean;
  setUseWebSearch: (val: boolean | ((prev: boolean) => boolean)) => void;
  highReasoning: boolean;
  setHighReasoning: (val: boolean | ((prev: boolean) => boolean)) => void;
  isListening: boolean;
  onToggleVoice: () => void;
  onOpenSavedPrompts: () => void;
  onOpenFileAttach: () => void;
  attachedFiles: string[];
  onRemoveAttachment: (name: string) => void;
  isLoading: boolean;
}

export const HeroScreen: React.FC<HeroScreenProps> = ({
  inputPrompt,
  setInputPrompt,
  onSubmitPrompt,
  isDeepResearch,
  setIsDeepResearch,
  useWebSearch,
  setUseWebSearch,
  highReasoning,
  setHighReasoning,
  isListening,
  onToggleVoice,
  onOpenSavedPrompts,
  onOpenFileAttach,
  attachedFiles,
  onRemoveAttachment,
  isLoading,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus textarea on hero load
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

  const handleSuggestionClick = (promptText: string) => {
    onSubmitPrompt(promptText);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-2xl w-full mx-auto my-auto py-6 animate-in fade-in duration-300">
      {/* Glowing Orb */}
      <div className="relative w-28 h-28 mb-5 flex items-center justify-center">
        {/* Soft Ambient Aura */}
        <div className="absolute w-24 h-24 rounded-full bg-violet-400/20 blur-2xl animate-pulse-subtle"></div>
        {/* The 3D Orb */}
        <div
          className={`w-20 h-20 rounded-full orb-glow animate-orb-float cursor-pointer transition-all duration-300 ${
            isDeepResearch ? 'orb-glow-active' : ''
          }`}
          title="Cortex Cognitive Core"
          onClick={() => setIsDeepResearch((prev) => !prev)}
        >
          {/* Subtle glossy 3D sphere highlight */}
          <div className="w-6 h-6 rounded-full bg-white/40 blur-[2px] ml-4 mt-3"></div>
        </div>
      </div>

      {/* Greeting Headings */}
      <div className="text-center mb-7 select-none">
        <p className="text-[#A78BFA] text-lg font-medium tracking-tight mb-1">Hello, Jackson</p>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          How can I assist you today?
        </h1>
      </div>

      {/* Input Container Area */}
      <div className="w-full bg-[#FCFBFE] border border-gray-200/90 rounded-2xl p-4 shadow-sm focus-within:ring-2 focus-within:ring-violet-200 focus-within:border-[#A78BFA] transition-all mb-4">
        {/* Attached Files Pill List if any */}
        {attachedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2.5">
            {attachedFiles.map((file) => (
              <span
                key={file}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-violet-50 text-violet-700 border border-violet-200"
              >
                <i className="ph ph-file-text"></i>
                <span className="font-medium truncate max-w-[150px]">{file}</span>
                <button
                  type="button"
                  onClick={() => onRemoveAttachment(file)}
                  className="hover:text-red-500 text-gray-400"
                >
                  <i className="ph ph-x"></i>
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything..."
          rows={2}
          disabled={isLoading}
          className="w-full bg-transparent border-0 resize-none text-sm text-gray-800 placeholder-gray-400 focus:ring-0 p-0 mb-3 outline-none"
        ></textarea>

        {/* Input Bottom Bar Controls */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-2.5 select-none">
          {/* Left Badges */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsDeepResearch((prev) => !prev)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer active:scale-95 ${
                isDeepResearch
                  ? 'border border-violet-500 bg-violet-600 text-white shadow-xs'
                  : 'border border-[#C4B5FD] bg-[#EDE9FE]/60 text-[#7C3AED] hover:bg-[#DDD6FE]/70'
              }`}
              title="Toggle Deeper Research synthesis mode"
            >
              <i className="ph ph-atom text-sm"></i>
              <span>Deeper Research</span>
              {isDeepResearch && <i className="ph-bold ph-check text-[10px]"></i>}
            </button>

            {/* Image attach button */}
            <button
              type="button"
              onClick={onOpenFileAttach}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
              title="Attach image or screenshot"
            >
              <i className="ph ph-image text-base"></i>
            </button>

            {/* Prompt tip / inspiration button */}
            <button
              type="button"
              onClick={onOpenSavedPrompts}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all cursor-pointer"
              title="Prompt templates & ideas"
            >
              <i className="ph ph-lightbulb text-base"></i>
            </button>
          </div>

          {/* Right Tools */}
          <div className="flex items-center gap-1.5">
            {/* CPU / Reasoning Level */}
            <button
              type="button"
              onClick={() => setHighReasoning((prev) => !prev)}
              className={`w-7 h-7 flex items-center justify-center rounded-lg transition-all cursor-pointer ${
                highReasoning ? 'bg-violet-100 text-violet-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
              title={highReasoning ? 'Extended reasoning active' : 'Toggle extended reasoning'}
            >
              <i className="ph ph-cpu text-base"></i>
            </button>

            {/* Web Grounding / Globe */}
            <button
              type="button"
              onClick={() => setUseWebSearch((prev) => !prev)}
              className={`w-7 h-7 flex items-center justify-center rounded-lg transition-all cursor-pointer ${
                useWebSearch ? 'bg-violet-100 text-violet-700' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
              title={useWebSearch ? 'Web grounding active' : 'Toggle web search'}
            >
              <i className="ph ph-globe text-base"></i>
            </button>

            {/* Mic / Voice recognition */}
            <button
              type="button"
              onClick={onToggleVoice}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ml-1 shadow-2xs cursor-pointer ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-[#EDE9FE] text-[#6D28D9] hover:bg-[#DDD6FE]'
              }`}
              title={isListening ? 'Listening... click to stop' : 'Voice input'}
            >
              <i className="ph-bold ph-microphone text-sm"></i>
            </button>

            {/* Send button */}
            {inputPrompt.trim() && (
              <button
                type="button"
                onClick={() => onSubmitPrompt()}
                disabled={isLoading}
                className="w-8 h-8 rounded-full bg-[#18181B] text-white flex items-center justify-center hover:bg-black transition-all ml-1 shadow-2xs cursor-pointer active:scale-95"
                title="Send message"
              >
                <i className="ph-bold ph-arrow-up text-sm"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Auxiliary Action Bar (Saved Prompts & Attach file) */}
      <div className="w-full flex items-center justify-between px-1 mb-8 text-xs font-medium text-gray-500 select-none">
        <button
          type="button"
          onClick={onOpenSavedPrompts}
          className="flex items-center gap-1.5 text-[#7C3AED] hover:text-[#6D28D9] transition-colors cursor-pointer group"
        >
          <i className="ph-bold ph-sparkle text-sm text-[#8B5CF6] group-hover:scale-110 transition-transform"></i>
          <span className="text-gray-700 font-medium">Saved prompts</span>
        </button>

        <button
          type="button"
          onClick={onOpenFileAttach}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200/80 bg-white hover:bg-gray-50 text-gray-600 shadow-2xs transition-colors cursor-pointer active:scale-95"
        >
          <i className="ph ph-paperclip text-sm"></i>
          <span>Attach file</span>
        </button>
      </div>

      {/* Suggestion Action Cards Grid (3 cards from screenshot) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
        {/* Card 1: Synthesize Data */}
        <button
          type="button"
          onClick={() =>
            handleSuggestionClick(
              'Synthesize these notes into 5 clear executive bullet points for the team: Turn my meeting notes into 5 key bullet points for the team.'
            )
          }
          className="text-left p-3.5 rounded-xl border border-gray-200/70 bg-white hover:border-[#C4B5FD] hover:shadow-xs transition-all group cursor-pointer active:scale-[0.98]"
        >
          <i className="ph ph-chart-pie-slice text-lg text-gray-600 mb-3 group-hover:text-[#7C3AED] transition-colors"></i>
          <div className="text-xs font-semibold text-gray-800 mb-1">Synthesize Data</div>
          <div className="text-[11px] text-gray-400 leading-relaxed">
            Turn my meeting notes into 5 key bullet points for the team.
          </div>
        </button>

        {/* Card 2: Creative Brainstorm */}
        <button
          type="button"
          onClick={() =>
            handleSuggestionClick(
              'Creative Brainstorm: Generate 3 taglines for a new sustainable fashion brand.'
            )
          }
          className="text-left p-3.5 rounded-xl border border-gray-200/70 bg-white hover:border-[#C4B5FD] hover:shadow-xs transition-all group cursor-pointer active:scale-[0.98]"
        >
          <i className="ph ph-lightbulb-filament text-lg text-gray-600 mb-3 group-hover:text-[#7C3AED] transition-colors"></i>
          <div className="text-xs font-semibold text-gray-800 mb-1">Creative Brainstorm</div>
          <div className="text-[11px] text-gray-400 leading-relaxed">
            Generate 3 taglines for a new sustainable fashion brand.
          </div>
        </button>

        {/* Card 3: Check Facts */}
        <button
          type="button"
          onClick={() =>
            handleSuggestionClick(
              'Check Facts: Compare key differences between GDPR and CCPA.'
            )
          }
          className="text-left p-3.5 rounded-xl border border-gray-200/70 bg-white hover:border-[#C4B5FD] hover:shadow-xs transition-all group cursor-pointer active:scale-[0.98]"
        >
          <i className="ph ph-gavel text-lg text-gray-600 mb-3 group-hover:text-[#7C3AED] transition-colors"></i>
          <div className="text-xs font-semibold text-gray-800 mb-1">Check Facts</div>
          <div className="text-[11px] text-gray-400 leading-relaxed">
            Compare key differences between GDPR and CCPA.
          </div>
        </button>
      </div>
    </div>
  );
};
