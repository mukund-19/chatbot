import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { User, Sparkles, Shield, RotateCcw, Save, Trash2, CheckCircle2 } from 'lucide-react';
import { LanguageCode } from '../types/index';

export const ProfilePage: React.FC = () => {
  const { userProfile, updateProfileData, showToast, clearAllHistory } = useApp();

  const [fullName, setFullName] = useState(userProfile.full_name);
  const [preferredLang, setPreferredLang] = useState<LanguageCode>(userProfile.preferred_language);
  const [cityTier, setCityTier] = useState(userProfile.city_tier);
  const [city, setCity] = useState(userProfile.city);
  const [budgetMax, setBudgetMax] = useState(userProfile.budget_max);
  const [paymentPref, setPaymentPref] = useState(userProfile.payment_preference);
  const [personalization, setPersonalization] = useState(userProfile.personalization_enabled);
  const [analytics, setAnalytics] = useState(userProfile.analytics_consent);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await updateProfileData({
      full_name: fullName,
      preferred_language: preferredLang,
      city_tier: cityTier as any,
      city,
      budget_max: Number(budgetMax),
      payment_preference: paymentPref as any,
      personalization_enabled: personalization,
      analytics_consent: analytics,
    });
    setIsSaving(false);
  };

  const handleClearMemory = async () => {
    if (window.confirm('Clear stored conversational preferences and start with fresh memory?')) {
      await updateProfileData({
        preferred_categories: ['Mobile Phones', 'Fashion'],
        budget_max: 35000,
      });
      showToast('Assistant context memory cleared');
    }
  };

  return (
    <div className="flex-1 p-4 sm:p-8 max-w-4xl w-full mx-auto animate-in fade-in duration-200">
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-950">Shopper Profile & Consent Settings</h2>
        <p className="text-xs text-gray-500">Manage personalization memory, vernacular language, and privacy controls</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="bg-white border border-gray-200/80 rounded-3xl p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
            <img
              src={userProfile.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={userProfile.full_name}
              className="w-16 h-16 rounded-full object-cover border-2 border-violet-100"
            />
            <div>
              <h3 className="text-base font-bold text-gray-900">{userProfile.full_name}</h3>
              <p className="text-xs text-gray-500">{userProfile.email} • Role: <strong className="capitalize text-violet-700">{userProfile.role}</strong></p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-violet-400 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Preferred Language</label>
              <select
                value={preferredLang}
                onChange={(e) => setPreferredLang(e.target.value as LanguageCode)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-violet-400 focus:outline-hidden"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="hinglish">Hinglish (Romanized Hindi)</option>
                <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
                <option value="bn">বাংলা (Bengali)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="mr">मराठी (Marathi)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">City / Region</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-violet-400 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">City Tier (Indian Logistics)</label>
              <select
                value={cityTier}
                onChange={(e) => setCityTier(e.target.value as any)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-violet-400 focus:outline-hidden"
              >
                <option value="Tier-1">Tier-1 (Metros: Delhi, Mumbai, Bengaluru)</option>
                <option value="Tier-2">Tier-2 (Indore, Jaipur, Lucknow, Kochi)</option>
                <option value="Tier-3">Tier-3 (Emerging Districts & Towns)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Max Shopping Budget (₹ INR)</label>
              <input
                type="number"
                value={budgetMax}
                onChange={(e) => setBudgetMax(Number(e.target.value))}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-violet-400 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 block mb-1">Preferred Payment Mode</label>
              <select
                value={paymentPref}
                onChange={(e) => setPaymentPref(e.target.value as any)}
                className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-1 focus:ring-violet-400 focus:outline-hidden"
              >
                <option value="UPI">UPI (Google Pay / PhonePe / Paytm)</option>
                <option value="COD">Cash on Delivery (COD)</option>
                <option value="Card">RuPay / Debit / Credit Card</option>
                <option value="NetBanking">Net Banking</option>
              </select>
            </div>
          </div>
        </div>

        {/* Responsible AI & Consent Toggles */}
        <div className="bg-white border border-gray-200/80 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-violet-800 font-bold text-sm">
            <Shield className="w-5 h-5 text-violet-600" />
            <span>Responsible AI & Consent Controls</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            In compliance with our ethical AI guidelines, you maintain complete sovereignty over your conversational and shopping behavioral telemetry.
          </p>

          <div className="space-y-3 pt-2">
            <label className="flex items-center justify-between p-3 rounded-2xl border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
              <div>
                <strong className="text-xs font-bold text-gray-900 block">Personalized Recommendation Memory</strong>
                <span className="text-[11px] text-gray-500">Allow AI assistant to adapt recommendations to your past category preferences and budget.</span>
              </div>
              <input
                type="checkbox"
                checked={personalization}
                onChange={(e) => setPersonalization(e.target.checked)}
                className="w-4 h-4 text-violet-600 rounded focus:ring-violet-500"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-2xl border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
              <div>
                <strong className="text-xs font-bold text-gray-900 block">Analytics & Continuous Improvement</strong>
                <span className="text-[11px] text-gray-500">Contribute anonymized clickstream signals to fine-tune recommendation relevance models.</span>
              </div>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="w-4 h-4 text-violet-600 rounded focus:ring-violet-500"
              />
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleClearMemory}
              className="px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-100 text-gray-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Assistant Memory</span>
            </button>
            <button
              type="button"
              onClick={clearAllHistory}
              className="px-4 py-2.5 rounded-xl border border-red-200 hover:bg-red-50 text-red-600 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Chat Archives</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shadow-md transition-colors flex items-center gap-2"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
