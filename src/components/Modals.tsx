import React, { useState } from 'react';
import { PROMPT_TEMPLATES } from '../mockData';
import { ChatSession } from '../types';

/* ---------------- UPGRADE MODAL ---------------- */
export const UpgradeModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
        >
          <i className="ph ph-x text-lg"></i>
        </button>

        <div className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center mb-4 text-2xl shadow-sm">
          <i className="ph-bold ph-sparkle"></i>
        </div>

        <h3 className="text-xl font-bold text-gray-900">Upgrade to Cortex Pro</h3>
        <p className="text-xs text-gray-500 mt-1 mb-5">
          Unleash maximum cognitive bandwidth and priority synthesis compute.
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center shrink-0 mt-0.5 text-xs">
              <i className="ph-bold ph-check"></i>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-800">Unlimited Deeper Research</div>
              <div className="text-[11px] text-gray-400">Autonomous multi-source deep crawls with citations</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center shrink-0 mt-0.5 text-xs">
              <i className="ph-bold ph-check"></i>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-800">Extended 2M Token Context</div>
              <div className="text-[11px] text-gray-400">Upload entire codebases and 500-page quarterly reports</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center shrink-0 mt-0.5 text-xs">
              <i className="ph-bold ph-check"></i>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-800">Live Web Grounding & Real-time Reasoning</div>
              <div className="text-[11px] text-gray-400">Instant fact checking and zero hallucination guardrails</div>
            </div>
          </div>
        </div>

        <div className="p-3 bg-violet-50/60 rounded-xl border border-violet-100 flex items-center justify-between mb-5">
          <div>
            <div className="text-xs font-bold text-violet-900">$20 / month</div>
            <div className="text-[10px] text-violet-600">Billed annually ($240/yr)</div>
          </div>
          <span className="text-[10px] font-semibold bg-violet-200 text-violet-800 px-2 py-0.5 rounded-full">
            14-day trial
          </span>
        </div>

        <button
          onClick={() => {
            alert('Welcome to Cortex Pro! High-capacity tier activated for your workspace.');
            onClose();
          }}
          className="w-full bg-[#18181B] hover:bg-black text-white font-semibold py-2.5 rounded-xl text-xs transition-all shadow-md active:scale-[0.98]"
        >
          Start 14-Day Free Trial
        </button>
      </div>
    </div>
  );
};

/* ---------------- EXPORT MODAL ---------------- */
export const ExportModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  activeChat: ChatSession | null;
}> = ({ isOpen, onClose, activeChat }) => {
  if (!isOpen) return null;

  const exportAsMarkdown = () => {
    if (!activeChat) return;
    const content = `# ${activeChat.title}\nDate: ${activeChat.createdAt}\n\n` +
      activeChat.messages
        .map((m) => `### ${m.sender === 'bot' ? 'Cortex' : 'Jackson'} (${m.timestamp}):\n${m.text}\n`)
        .join('\n---\n\n');

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cortex-export-${activeChat.id}.md`;
    a.click();
    onClose();
  };

  const exportAsJSON = () => {
    if (!activeChat) return;
    const blob = new Blob([JSON.stringify(activeChat, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cortex-export-${activeChat.id}.json`;
    a.click();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
        >
          <i className="ph ph-x text-lg"></i>
        </button>

        <div className="w-10 h-10 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center mb-3 text-lg">
          <i className="ph ph-tray-arrow-down"></i>
        </div>

        <h3 className="text-lg font-bold text-gray-900">Export Conversation</h3>
        <p className="text-xs text-gray-500 mt-1 mb-5">
          Download your synthesis transcript or copy it formatted for documentation.
        </p>

        <div className="space-y-2 mb-6">
          <button
            onClick={exportAsMarkdown}
            className="w-full text-left p-3 rounded-xl border border-gray-200 hover:border-violet-300 hover:bg-violet-50/40 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-2.5">
              <i className="ph ph-file-text text-violet-600 text-base"></i>
              <div>
                <div className="text-xs font-semibold text-gray-800">Markdown (.md)</div>
                <div className="text-[10px] text-gray-400">Formatted headings, tables, and code blocks</div>
              </div>
            </div>
            <i className="ph ph-download-simple text-sm text-gray-400"></i>
          </button>

          <button
            onClick={exportAsJSON}
            className="w-full text-left p-3 rounded-xl border border-gray-200 hover:border-violet-300 hover:bg-violet-50/40 flex items-center justify-between transition-all"
          >
            <div className="flex items-center gap-2.5">
              <i className="ph ph-code text-violet-600 text-base"></i>
              <div>
                <div className="text-xs font-semibold text-gray-800">JSON Archive (.json)</div>
                <div className="text-[10px] text-gray-400">Complete raw conversation payload with timestamps</div>
              </div>
            </div>
            <i className="ph ph-download-simple text-sm text-gray-400"></i>
          </button>
        </div>

        <button
          onClick={() => {
            window.print();
            onClose();
          }}
          className="w-full text-xs font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 py-2.5 rounded-xl transition-colors"
        >
          Print / Save as PDF
        </button>
      </div>
    </div>
  );
};

/* ---------------- SAVED PROMPTS MODAL ---------------- */
export const SavedPromptsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt: (promptText: string) => void;
}> = ({ isOpen, onClose, onSelectPrompt }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 relative max-h-[85vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
        >
          <i className="ph ph-x text-lg"></i>
        </button>

        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 rounded-xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center font-bold">
            <i className="ph-bold ph-sparkle text-sm"></i>
          </div>
          <h3 className="text-lg font-bold text-gray-900">Saved Prompts Vault</h3>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Select any prompt to immediately populate into your input prompt.
        </p>

        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2.5 pr-1">
          {PROMPT_TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => {
                onSelectPrompt(tpl.prompt);
                onClose();
              }}
              className="p-3.5 rounded-xl border border-gray-200/80 hover:border-violet-300 hover:bg-violet-50/40 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <i className={`ph ${tpl.icon} text-violet-600 text-sm`}></i>
                  <span className="text-xs font-bold text-gray-800 group-hover:text-violet-700 transition-colors">
                    {tpl.title}
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                  {tpl.category}
                </span>
              </div>
              <p className="text-[11px] text-gray-500 mb-2">{tpl.description}</p>
              <div className="text-[10px] text-gray-400 font-mono bg-white p-2 rounded border border-gray-100 line-clamp-2">
                {tpl.prompt}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------------- FILE ATTACH MODAL ---------------- */
export const FileAttachModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAddAttachment: (name: string) => void;
}> = ({ isOpen, onClose, onAddAttachment }) => {
  const [customName, setCustomName] = useState('');

  if (!isOpen) return null;

  const quickSamples = [
    'Meeting_Notes_Oct_07.docx',
    'Financial_Forecast_Q4.xlsx',
    'Customer_Churn_Analysis.csv',
    'System_Architecture_Spec.pdf',
    'Brand_Moodboard_Reference.png',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
        >
          <i className="ph ph-x text-lg"></i>
        </button>

        <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center mb-3 text-lg">
          <i className="ph ph-paperclip"></i>
        </div>

        <h3 className="text-lg font-bold text-gray-900">Attach Context File</h3>
        <p className="text-xs text-gray-500 mt-1 mb-4">
          Attach reference documents or datasets for Cortex to synthesize.
        </p>

        <div className="space-y-3 mb-5">
          <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
            Quick Sample Files
          </div>
          <div className="space-y-1.5">
            {quickSamples.map((file) => (
              <button
                key={file}
                onClick={() => {
                  onAddAttachment(file);
                  onClose();
                }}
                className="w-full text-left px-3 py-2 rounded-lg border border-gray-200/80 hover:border-violet-300 hover:bg-violet-50/50 flex items-center justify-between text-xs transition-colors"
              >
                <div className="flex items-center gap-2">
                  <i className="ph ph-file-text text-violet-600"></i>
                  <span className="text-gray-700 font-medium">{file}</span>
                </div>
                <span className="text-[10px] text-violet-600 font-medium">Attach</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100 flex gap-2">
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Or type custom file name..."
            className="flex-1 px-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-400"
          />
          <button
            onClick={() => {
              if (customName.trim()) {
                onAddAttachment(customName.trim());
                setCustomName('');
                onClose();
              }
            }}
            className="px-3 py-1.5 bg-[#18181B] hover:bg-black text-white text-xs font-semibold rounded-lg"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

/* ---------------- SETTINGS MODAL ---------------- */
export const SettingsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
        >
          <i className="ph ph-x text-lg"></i>
        </button>

        <div className="flex items-center gap-3 mb-5">
          <img
            alt="Emerson Sterling"
            className="w-12 h-12 rounded-full object-cover border border-gray-200"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtOMenYConi2BiT16i6_kFfBhMgGKhCoZS-gubl3UDsVKJw59bmjDuiJY07gSUBMgcgm7uGkkwV_TAVmOsX2OqoGtc27pQyqepD2Jb-DrJG9A8VY_bpxmk1BC3fryWY5ephwGZztOdOqp8EMq2yoSOj4NCJMN7_kxraZEAmeampZZJGeMVdbaE7cSD4m-x3BGf8LR6tzLlNJ6M3-sFEiVUgARG1Y79_glRmtbOQCI"
          />
          <div>
            <h3 className="text-base font-bold text-gray-900">Emerson Sterling</h3>
            <p className="text-xs text-gray-400">sterlingr@gmail.com</p>
            <span className="inline-block mt-1 text-[10px] bg-violet-100 text-violet-700 px-2 py-0.5 rounded-full font-medium">
              Cortex Enterprise Member
            </span>
          </div>
        </div>

        <div className="space-y-3.5 mb-6 text-xs text-gray-700">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
            <div>
              <div className="font-semibold text-gray-800">Sound & Audio Synthesis</div>
              <div className="text-[11px] text-gray-400">Enable voice input confirmation chime</div>
            </div>
            <input type="checkbox" defaultChecked className="rounded text-violet-600 focus:ring-violet-400" />
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
            <div>
              <div className="font-semibold text-gray-800">Continuous Cognitive Context</div>
              <div className="text-[11px] text-gray-400">Preserve project memories across sessions</div>
            </div>
            <input type="checkbox" defaultChecked className="rounded text-violet-600 focus:ring-violet-400" />
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
            <div>
              <div className="font-semibold text-gray-800">Markdown Code Highlighting</div>
              <div className="text-[11px] text-gray-400">Syntax colors for TypeScript, SQL, Python</div>
            </div>
            <input type="checkbox" defaultChecked className="rounded text-violet-600 focus:ring-violet-400" />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold bg-[#18181B] hover:bg-black text-white rounded-xl shadow-2xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
