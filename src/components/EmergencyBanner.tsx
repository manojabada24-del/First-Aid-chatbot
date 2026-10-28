/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * CSE276 Artificial Intelligence Foundations - First Aid Guardian
 * Emergency Notification & Quick Dial Banner
 */

import React, { useState } from 'react';
import { AlertTriangle, Phone, ExternalLink, ShieldCheck, X } from 'lucide-react';

interface EmergencyBannerProps {
  onSelectEmergencyProtocol: (protocolKey: string) => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ onSelectEmergencyProtocol }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) {
    return (
      <div className="bg-red-950/40 border-b border-red-900/60 px-4 py-1.5 text-xs text-red-300 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>Priority #1 Rule: For life-threatening emergencies, immediately call <strong>112 / 911 / 108 / 999</strong>.</span>
        </div>
        <button
          onClick={() => setIsDismissed(false)}
          className="text-red-400 hover:text-white underline text-[11px]"
        >
          Show Emergency Bar
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-red-950 via-slate-900 to-red-950 border-b border-red-800/80 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Warning text */}
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 flex-shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-800">
                  Life-Threatening Warning
                </span>
                <span className="text-xs text-slate-300 font-medium hidden sm:inline">
                  CSE276 Medical Safety Protocol
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 mt-0.5 leading-snug">
                For unconsciousness, severe hemorrhage, choking, or breathing cessation,{' '}
                <strong className="text-red-300 underline font-semibold">CALL EMERGENCY SERVICES FIRST</strong>.
                AI first aid guidance is only for immediate bystander stabilization while help is en route.
              </p>
            </div>
          </div>

          {/* Quick Dials & Dismiss */}
          <div className="flex items-center flex-wrap gap-2">
            <a
              href="tel:112"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md shadow-red-600/30 transition-all hover:scale-105"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>Call 112 (India/EU)</span>
            </a>

            <a
              href="tel:911"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span>Call 911 (US)</span>
            </a>

            <a
              href="tel:108"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Call 108 (EMS)</span>
            </a>

            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
              title="Minimize emergency bar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Protocol Quick Jump Bar */}
        <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 text-[11px] whitespace-nowrap font-medium flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-red-400" />
            Verified Protocols:
          </span>
          <button
            onClick={() => onSelectEmergencyProtocol('burns')}
            className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-red-950/60 hover:text-red-200 text-slate-300 border border-slate-700/60 whitespace-nowrap transition-colors"
          >
            🔥 Burns & Scalds
          </button>
          <button
            onClick={() => onSelectEmergencyProtocol('choking')}
            className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-red-950/60 hover:text-red-200 text-slate-300 border border-slate-700/60 whitespace-nowrap transition-colors"
          >
            🫁 Choking (Heimlich)
          </button>
          <button
            onClick={() => onSelectEmergencyProtocol('severe_bleeding')}
            className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-red-950/60 hover:text-red-200 text-slate-300 border border-slate-700/60 whitespace-nowrap transition-colors"
          >
            🩸 Severe Bleeding
          </button>
          <button
            onClick={() => onSelectEmergencyProtocol('fractures')}
            className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-red-950/60 hover:text-red-200 text-slate-300 border border-slate-700/60 whitespace-nowrap transition-colors"
          >
            🦴 Fractures & Splinting
          </button>
          <button
            onClick={() => onSelectEmergencyProtocol('snake_bites')}
            className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-red-950/60 hover:text-red-200 text-slate-300 border border-slate-700/60 whitespace-nowrap transition-colors"
          >
            🐍 Snake Bites
          </button>
          <button
            onClick={() => onSelectEmergencyProtocol('heat_stroke')}
            className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-red-950/60 hover:text-red-200 text-slate-300 border border-slate-700/60 whitespace-nowrap transition-colors"
          >
            ☀️ Heat Stroke
          </button>
        </div>
      </div>
    </div>
  );
};
