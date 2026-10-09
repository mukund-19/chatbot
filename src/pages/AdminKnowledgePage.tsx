import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { KnowledgeDocument } from '../types/index';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Plus, CheckCircle2, Languages } from 'lucide-react';

export const AdminKnowledgePage: React.FC = () => {
  const navigate = useNavigate();
  const [docs, setDocs] = useState<KnowledgeDocument[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [type, setType] = useState('return_policy');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('en');

  const loadDocs = async () => {
    const res = await api.getPolicies();
    setDocs(res.documents || []);
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.createPolicy({
      type: type as any,
      title,
      content,
      language,
      version: '1.0',
    });
    setIsModalOpen(false);
    setTitle('');
    setContent('');
    loadDocs();
  };

  return (
    <div className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center gap-2">
        <button onClick={() => navigate('/admin')} className="text-xs text-gray-500 hover:text-gray-900 flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Console</span>
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950">RAG Knowledge Base & Store Policies</h2>
          <p className="text-xs text-gray-500">Official grounded documents queried by AI assistant before replying</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Policy Document</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docs.map((doc) => (
          <div key={doc.id} className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <span className="font-mono text-xs font-bold text-violet-700 bg-violet-50 px-2 py-0.5 rounded-md">
                {doc.type}
              </span>
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                <span className="uppercase bg-gray-100 px-2 py-0.5 rounded">{doc.language}</span>
                <span>v{doc.version}</span>
              </div>
            </div>

            <h4 className="text-sm font-bold text-gray-900">{doc.title}</h4>
            <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-wrap max-h-40 overflow-y-auto custom-scrollbar bg-gray-50 p-3 rounded-xl border border-gray-100">
              {doc.content}
            </p>

            <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active in RAG
              </span>
              <span>Updated {new Date(doc.updated_at).toLocaleDateString('en-IN')}</span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100">
            <h3 className="text-base font-bold text-gray-950 mb-4">Add Grounded Policy Document</h3>
            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Policy Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white"
                >
                  <option value="return_policy">Return Policy</option>
                  <option value="exchange_policy">Exchange Policy</option>
                  <option value="cancellation_policy">Cancellation Policy</option>
                  <option value="delivery_policy">Delivery Policy</option>
                  <option value="payment_faq">Payment FAQ</option>
                  <option value="cod_info">COD Information</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="pa">Punjabi</option>
                  <option value="bn">Bengali</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Policy Content</label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold"
                >
                  Save Policy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
