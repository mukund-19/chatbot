import React from 'react';

interface ExploreViewProps {
  onUsePrompt: (promptText: string) => void;
  onBackToChat: () => void;
}

export const ExploreView: React.FC<ExploreViewProps> = ({ onUsePrompt, onBackToChat }) => {
  const categories = [
    {
      title: 'Executive & Strategy',
      icon: 'ph-trend-up',
      items: [
        {
          name: 'Quarterly OKR Formulator',
          desc: 'Transforms ambiguous team goals into measurable Key Results with leading indicators.',
          prompt: 'Draft 3 ambitious OKRs for our engineering team focusing on reliability and velocity.',
        },
        {
          name: 'Pre-Mortem Failure Analysis',
          desc: 'Simulates hypothetical launch catastrophes to preemptively identify blind spots.',
          prompt: 'Conduct a pre-mortem analysis for launching a new fintech product in Europe.',
        },
      ],
    },
    {
      title: 'Product & Design',
      icon: 'ph-paint-brush-broad',
      items: [
        {
          name: 'PRD Slice Generator',
          desc: 'Generates user stories, acceptance criteria, and analytics requirements.',
          prompt: 'Write a comprehensive PRD slice for a new social bookmarking feature.',
        },
        {
          name: 'Friction Point Audit',
          desc: 'Pinpoints UX drops in onboarding flows based on user behavior logs.',
          prompt: 'Identify the top 5 friction points in a standard B2B SaaS signup funnel.',
        },
      ],
    },
    {
      title: 'Engineering & Architecture',
      icon: 'ph-cpu',
      items: [
        {
          name: 'API Contract Designer',
          desc: 'Designs RESTful/gRPC interfaces adhering to strict idempotent standards.',
          prompt: 'Design a clean OpenAPI 3.0 specification for an enterprise billing webhook service.',
        },
        {
          name: 'Post-Mortem Incident Report',
          desc: 'Synthesizes incident timelines into blameless post-mortem reviews.',
          prompt: 'Generate a blameless post-mortem template for a 45-minute Redis replica failover.',
        },
      ],
    },
  ];

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar p-2 max-w-4xl mx-auto w-full animate-in fade-in duration-200">
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Explore Cortex Capabilities</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Curated cognitive workflows, autonomous templates, and specialized frameworks.
          </p>
        </div>
        <button
          onClick={onBackToChat}
          className="text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-gray-200 transition-colors"
        >
          <i className="ph ph-chat-circle"></i>
          <span>Return to Chat</span>
        </button>
      </div>

      <div className="space-y-6">
        {categories.map((cat) => (
          <div key={cat.title}>
            <div className="flex items-center gap-2 mb-3">
              <i className={`ph ${cat.icon} text-violet-600 text-lg`}></i>
              <h3 className="text-sm font-semibold text-gray-800">{cat.title}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {cat.items.map((item) => (
                <div
                  key={item.name}
                  onClick={() => onUsePrompt(item.prompt)}
                  className="p-4 rounded-xl border border-gray-200/80 bg-white hover:border-violet-300 hover:shadow-xs transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-gray-900 group-hover:text-violet-600 transition-colors">
                      {item.name}
                    </span>
                    <i className="ph ph-arrow-up-right text-xs text-gray-400 group-hover:text-violet-600 transition-colors"></i>
                  </div>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
