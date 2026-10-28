/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * CSE276 Artificial Intelligence Foundations - First Aid Guardian
 * Verified Protocols Reference Explorer
 */

import React, { useState } from 'react';
import {
  Flame,
  Wind,
  Droplet,
  Bone,
  Sun,
  ShieldAlert,
  AlertTriangle,
  ExternalLink,
  BookOpen,
  PhoneCall,
  Ban,
  CheckCircle2,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { VERIFIED_PROTOCOLS, FirstAidProtocol } from '../data/protocols.ts';

interface ProtocolLibraryProps {
  onStartProtocolChat: (protocolKey: string) => void;
}

export const ProtocolLibrary: React.FC<ProtocolLibraryProps> = ({ onStartProtocolChat }) => {
  const protocolKeys = Object.keys(VERIFIED_PROTOCOLS) as Array<keyof typeof VERIFIED_PROTOCOLS>;
  const [activeProtocolId, setActiveProtocolId] = useState<string>('burns');

  const activeProtocol: FirstAidProtocol = VERIFIED_PROTOCOLS[activeProtocolId] || VERIFIED_PROTOCOLS.burns;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'burns':
        return <Flame className="w-5 h-5 text-amber-400" />;
      case 'choking':
        return <Wind className="w-5 h-5 text-sky-400" />;
      case 'severe_bleeding':
        return <Droplet className="w-5 h-5 text-rose-500 fill-rose-500/20" />;
      case 'fractures':
        return <Bone className="w-5 h-5 text-slate-300" />;
      case 'snake_bites':
        return <ShieldAlert className="w-5 h-5 text-emerald-400" />;
      case 'heat_stroke':
        return <Sun className="w-5 h-5 text-amber-500" />;
      default:
        return <BookOpen className="w-5 h-5 text-red-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-red-950 text-red-300 border border-red-800">
                Official Clinical Knowledge Base
              </span>
              <span className="text-xs text-slate-400 font-mono">
                CSE276 Grounded Protocols
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Accredited First-Aid Protocols Directory
            </h1>
            <p className="text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
              Every protocol in First Aid Guardian is indexed exclusively from recognized health authorities
              (WHO, American Red Cross, AHA, ABA, CDC, and NHS). Sources are peer-verified and un-hallucinated.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onStartProtocolChat(activeProtocol.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-red-600/30 transition-all hover:scale-105"
            >
              <span>Practice in Triage Chat →</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Navigation: Protocol Selector Tabs */}
        <div className="lg:col-span-4 space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
            6 Core Emergency Domains:
          </h2>
          {protocolKeys.map(key => {
            const proto = VERIFIED_PROTOCOLS[key];
            const isSelected = activeProtocolId === key;

            return (
              <button
                key={key}
                onClick={() => setActiveProtocolId(key)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  isSelected
                    ? 'bg-slate-800 border-red-500/80 shadow-lg shadow-red-500/10'
                    : 'bg-slate-900/80 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex-shrink-0 mt-0.5">
                  {getCategoryIcon(proto.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className={`font-bold text-sm truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {proto.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-snug">
                    {proto.summary}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{proto.citations[0].authority.split('(')[0]}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          {/* Protocol Header */}
          <div className="border-b border-slate-800 pb-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-red-950 text-red-300 border border-red-800">
                {activeProtocol.urgencyLevel.replace(/_/g, ' ')}
              </span>
              <span className="text-xs text-slate-400 font-mono">ID: {activeProtocol.id}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {activeProtocol.name}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              {activeProtocol.summary}
            </p>
          </div>

          {/* Emergency Service Call Thresholds Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-red-950/40 border border-red-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-red-300 font-bold text-sm uppercase tracking-wide">
                <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                <span>Call Emergency Services (112 / 911 / 108) When:</span>
              </div>
              <a
                href="tel:112"
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-red-600 hover:bg-red-500 text-white text-xs font-semibold"
              >
                <PhoneCall className="w-3 h-3" />
                <span>Dial 112</span>
              </a>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200 pt-1">
              {activeProtocol.emergencyCallThreshold.map((t, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-red-400 font-bold">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Immediate Step-by-Step Action Plan */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Step-by-Step Emergency Actions</span>
            </h3>

            <div className="space-y-3">
              {activeProtocol.immediateSteps.map(step => (
                <div
                  key={step.stepNumber}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-red-600 text-white font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
                      {step.stepNumber}
                    </span>
                    <h4 className="font-bold text-sm text-slate-100">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 pl-8 leading-relaxed">
                    {step.action}
                  </p>
                  {step.warning && (
                    <div className="ml-8 mt-1.5 p-2.5 rounded-lg bg-amber-950/40 border border-amber-800/60 text-xs text-amber-200">
                      ⚠️ <strong>Warning:</strong> {step.warning}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Critical Contraindications ("What NEVER to do") */}
          <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/40 border border-rose-800/80 space-y-2.5">
            <div className="flex items-center gap-2 text-rose-300 font-bold text-sm uppercase tracking-wide">
              <Ban className="w-4 h-4 text-rose-400" />
              <span>Critical Medical Contraindications (What NEVER to Do):</span>
            </div>
            <ul className="space-y-2 text-xs text-rose-100/90">
              {activeProtocol.criticalContraindications.map((contra, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold flex-shrink-0">⛔</span>
                  <span>{contra}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Source Citations Box */}
          <div className="border-t border-slate-800 pt-5 space-y-3">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Recognized Health Authority Source Citations:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeProtocol.citations.map((cite, idx) => (
                <a
                  key={idx}
                  href={cite.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-sky-500/50 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <span className="text-xs font-bold text-sky-300 group-hover:text-sky-200">
                      {cite.authority}
                    </span>
                    <p className="text-xs text-slate-300 mt-1 font-medium">
                      "{cite.documentTitle}"
                    </p>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/60 pt-2">
                    <span>{cite.yearOrVersion}</span>
                    <span className="text-sky-400 group-hover:underline flex items-center gap-1">
                      Official Portal <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
