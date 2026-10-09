import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
      <div className="w-20 h-20 rounded-3xl bg-violet-100 text-violet-700 flex items-center justify-center mb-4">
        <Sparkles className="w-10 h-10 text-amber-500" />
      </div>
      <h2 className="text-4xl font-extrabold text-gray-950 mb-1">404</h2>
      <h3 className="text-base font-bold text-gray-800 mb-2">Page Not Found</h3>
      <p className="text-xs text-gray-500 max-w-sm mb-6 leading-relaxed">
        The destination you requested does not exist or has been relocated in the BharatShop AI workspace.
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-xs shadow-md transition-colors flex items-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold text-xs hover:bg-gray-50 transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
};
