/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * CSE276 Artificial Intelligence Foundations - First Aid Guardian
 * Emergency Hotlines Directory Modal
 */

import React from 'react';
import { PhoneCall, X, AlertTriangle, ShieldCheck, ExternalLink } from 'lucide-react';

interface EmergencyHotlineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyHotlineModal: React.FC<EmergencyHotlineModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const hotlines = [
    { country: 'India & European Union', name: 'Single National Emergency Number', number: '112', type: 'All Emergencies (Police, Fire, Ambulance)', priority: true },
    { country: 'India', name: 'Emergency Medical Services (Ambulance)', number: '108', type: 'Trained Paramedic & Trauma Dispatch', priority: true },
    { country: 'India', name: 'National Poison Information Centre (AIIMS)', number: '1800-116-117', type: 'Toxicology & Antivenom Consult', priority: false },
    { country: 'India', name: 'National Health Portal Toll-Free', number: '1800-180-1104', type: 'Govt. Healthcare Triage Helpline', priority: false },
    { country: 'United States & Canada', name: 'Emergency Dispatch (911)', number: '911', type: 'Life-Threatening Emergency Services', priority: true },
    { country: 'United States', name: 'American Association of Poison Control Centers', number: '1-800-222-1222', type: 'Immediate Toxic Ingestion Guidance', priority: false },
    { country: 'United Kingdom', name: 'Emergency Dispatch', number: '999', type: 'Police, Fire, Ambulance, Coastguard', priority: true },
    { country: 'United Kingdom', name: 'NHS Non-Emergency Health Advice', number: '111', type: 'Clinical Assessment & Triage', priority: false },
    { country: 'Australia', name: 'Emergency Dispatch', number: '000', type: 'Triple Zero Emergency Services', priority: false },
    { country: 'International', name: 'Crisis & Suicide Lifeline', number: '988', type: '24/7 Mental Health Crisis Counseling', priority: false }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-red-600/20 text-red-400 border border-red-500/30">
              <PhoneCall className="w-6 h-6 text-red-500 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider bg-red-950 text-red-300 px-2 py-0.5 rounded border border-red-800">
                Life-Threatening Protocols
              </span>
              <h2 className="text-xl font-extrabold text-white mt-1">
                Emergency Medical Hotlines Directory
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/80 text-xs text-red-200 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
          <span>
            In an emergency, every second counts. Tap any number below to dial directly on your phone. Dispatchers can guide CPR and pre-arrival treatment while paramedics respond.
          </span>
        </div>

        {/* Hotlines List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {hotlines.map((hl, idx) => (
            <a
              key={idx}
              href={`tel:${hl.number.replace(/[^0-9]/g, '')}`}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between group ${
                hl.priority
                  ? 'bg-slate-950 border-red-800/80 hover:border-red-500 hover:bg-red-950/30'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-300 group-hover:text-white">
                    {hl.country}
                  </span>
                  {hl.priority && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-red-900 text-red-200 font-semibold">
                      Primary
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-tight">{hl.name}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{hl.type}</p>
              </div>

              <div className="text-right flex-shrink-0 ml-3">
                <span className="text-base sm:text-lg font-mono font-extrabold text-red-400 group-hover:text-red-300">
                  {hl.number}
                </span>
                <span className="block text-[10px] text-slate-400 group-hover:text-slate-200">
                  Tap to Dial →
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="flex justify-end pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-colors"
          >
            Close Directory
          </button>
        </div>
      </div>
    </div>
  );
};
