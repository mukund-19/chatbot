import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Cpu, Activity, ShieldAlert, Sparkles, CheckCircle2, Sliders } from 'lucide-react';

export const AdminModelPage: React.FC = () => {
  const navigate = useNavigate();
  const [modelConfig, setModelConfig] = useState<any | null>(null);

  useEffect(() => {
    async function loadConfig() {
      const res = await api.getModelConfig();
      setModelConfig(res);
    }
    loadConfig();
  }, []);

  if (!modelConfig) {
    return <div className="p-8 text-center text-xs text-gray-400">Loading model telemetry...</div>;
  }

  return (
    <div className="flex-1 p-4 sm:p-8 max-w-6xl w-full mx-auto space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center gap-2">
        <button onClick={() => navigate('/admin')} className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Console</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-violet-600" />
            <span>AI Architecture & Churn Model Governance</span>
          </h2>
          <p className="text-xs text-gray-500">MLOps versioning, recommendation weights, and Assignment 3 retention model health</p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>System Status: Healthy</span>
        </div>
      </div>

      {/* Academic Prototype Notice */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-3xl flex items-start gap-3 text-amber-900 text-xs leading-relaxed">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Assignment 3 Model Prototype Notice</strong>
          <p className="mt-0.5 text-amber-800">
            The customer churn model is connected as a modular service boundary (<code className="font-mono bg-white px-1 py-0.2 rounded border">ChurnScoreService</code>). Model source is currently configured as <strong className="font-semibold">{modelConfig.churnModelSource}</strong>. In accordance with Assignment 3 guidelines, prototype thresholds (low &lt; 0.30, medium 0.30–0.60, high &gt; 0.60) are for demonstration purposes and never exposed directly to consumers.
          </p>
        </div>
      </div>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LLM Provider Card */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-600" />
              <span>Conversational AI Engine</span>
            </h4>
            <span className="font-mono text-xs font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-md uppercase">
              {modelConfig.currentProvider}
            </span>
          </div>

          <div className="space-y-2.5 text-xs text-gray-600">
            <div className="flex justify-between">
              <span className="text-gray-400">Configured Model:</span>
              <span className="font-bold text-gray-900 font-mono">{modelConfig.currentModel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">System Prompt Version:</span>
              <span className="font-mono text-gray-800">{modelConfig.promptVersion}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Fallback Resilience:</span>
              <span className="font-semibold text-emerald-600">Multi-tier RAG Fallback Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Vernacular Normalizer:</span>
              <span className="font-semibold text-gray-800">Indic 12-Language Canonicalizer</span>
            </div>
          </div>
        </div>

        {/* Churn Service Card */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-violet-600" />
              <span>Retention Intelligence (Churn Model)</span>
            </h4>
            <span className="font-mono text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md uppercase">
              {modelConfig.churnModelSource}
            </span>
          </div>

          <div className="space-y-2.5 text-xs text-gray-600">
            <div className="flex justify-between">
              <span className="text-gray-400">Model Version:</span>
              <span className="font-bold text-gray-900 font-mono">{modelConfig.churnModelVersion}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Feature Attribution:</span>
              <span className="font-semibold text-gray-800">SHAP Logistic Approximation</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Intervention Policy:</span>
              <span className="font-semibold text-violet-700">Non-discriminatory Loyalty Care</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Academic Traceability:</span>
              <span className="font-semibold text-emerald-600">Assignment 3 Champion</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation Formula & Weights */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h4 className="font-bold text-sm text-gray-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-violet-600" />
            <span>Recommendation Scoring Engine (Weights: {modelConfig.recommendationWeightsVersion})</span>
          </h4>
        </div>

        <p className="text-xs text-gray-500 font-mono bg-gray-50 p-3 rounded-2xl border border-gray-100 leading-relaxed">
          final_score = 0.30 * constraint_match + 0.20 * personalization + 0.15 * quality + 0.15 * value + 0.10 * availability + 0.10 * delivery_fit
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2 text-xs">
          {Object.entries(modelConfig.recommendationWeights || {}).map(([dim, wt]: [string, any]) => (
            <div key={dim} className="p-3 bg-gray-50 rounded-2xl border border-gray-100 text-center">
              <span className="text-gray-400 uppercase text-[10px] font-bold block truncate">{dim.replace('_', ' ')}</span>
              <strong className="text-lg font-extrabold text-violet-900">{(wt * 100).toFixed(0)}%</strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
