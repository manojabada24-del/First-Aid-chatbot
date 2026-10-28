/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * CSE276 Artificial Intelligence Foundations - First Aid Guardian
 * Navigation Bar Component
 */

import React from 'react';
import { ShieldAlert, Activity, FileCheck2, BookOpen, GraduationCap, PhoneCall } from 'lucide-react';

interface NavbarProps {
  activeTab: 'chat' | 'testing' | 'protocols' | 'project';
  setActiveTab: (tab: 'chat' | 'testing' | 'protocols' | 'project') => void;
  onOpenEmergencyModal: () => void;
  onOpenSubmissionModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenEmergencyModal,
  onOpenSubmissionModal
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Course Badge */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('chat')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 p-0.5 shadow-lg shadow-red-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                  First Aid <span className="text-red-500">Guardian</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-red-950 text-red-300 border border-red-800/60">
                  CSE276 Project
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
                AI Foundations • Safety Guardrail & Protocol System
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'chat'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Triage Chat</span>
            </button>

            <button
              onClick={() => setActiveTab('testing')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'testing'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <span>Safety Benchmark</span>
              <span className="hidden md:inline-flex px-1.5 py-0.2 rounded text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                Live Tests
              </span>
            </button>

            <button
              onClick={() => setActiveTab('protocols')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'protocols'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4 text-sky-400" />
              <span className="hidden sm:inline">Verified</span> Protocols
            </button>

            <button
              onClick={() => setActiveTab('project')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'project'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-amber-400" />
              <span>College Demo</span>
            </button>
          </nav>

          {/* Quick Emergency Dispatch Trigger & Submission Export */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenEmergencyModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-semibold transition-all hover:border-red-500/50"
              title="Quick Emergency Numbers"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-400" />
              <span className="hidden md:inline">Emergency Hotlines</span>
              <span className="md:hidden">112/911</span>
            </button>

            <button
              onClick={onOpenSubmissionModal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium transition-all"
            >
              Export Code
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
