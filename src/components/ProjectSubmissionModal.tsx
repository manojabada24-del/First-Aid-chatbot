/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * CSE276 Artificial Intelligence Foundations - First Aid Guardian
 * College Project Demonstration & Codebase Submission Guide
 */

import React, { useState } from 'react';
import {
  GraduationCap,
  X,
  Copy,
  Check,
  FolderArchive,
  Terminal,
  ShieldCheck,
  FileText,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface ProjectSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectSubmissionModal: React.FC<ProjectSubmissionModalProps> = ({ isOpen, onClose }) => {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const terminalExportCommands = `# 1. Extract or clone the project repository
cd first-aid-guardian

# 2. Install dependencies
npm install

# 3. Create .env file with your Gemini API key (optional for LLM mode)
# AI Studio automatically injects this at runtime
echo "GEMINI_API_KEY=your_key_here" > .env

# 4. Launch full-stack development server on port 3000
npm run dev

# 5. Build for production submission
npm run build

# 6. Create clean college submission zip (excludes heavy node_modules)
zip -r FirstAidGuardian_CSE276_Submission.zip . -x "node_modules/*" -x "dist/*" -x ".git/*"`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <GraduationCap className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
                  CSE276 Course Submission
                </span>
                <span className="text-xs text-slate-400 font-mono">B.Tech 2nd Year Demo</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Project Demonstration & Export Guide
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

        {/* Academic Project Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-semibold uppercase">Course & Project</span>
            <p className="text-sm font-bold text-white">CSE276: AI Foundations</p>
            <p className="text-xs text-slate-300">First Aid Guardian</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-semibold uppercase">Primary Paradigm</span>
            <p className="text-sm font-bold text-emerald-400">Grounded Safe LLM + Rules</p>
            <p className="text-xs text-slate-300">Dual-layer guardrail architecture</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-semibold uppercase">Accredited Sources</span>
            <p className="text-sm font-bold text-sky-400">WHO, Red Cross, AHA, ABA</p>
            <p className="text-xs text-slate-300">Zero invented/fabricated citations</p>
          </div>
        </div>

        {/* System Architecture Flow */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <Layers className="w-4 h-4 text-red-500" />
            AI Safety Architecture Pipeline
          </h3>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-3 font-mono">
            <div className="flex items-center gap-2 text-slate-200">
              <span className="px-2 py-0.5 bg-red-950 text-red-300 rounded border border-red-800">Stage 1</span>
              <span>User Query Ingestion & Emergency Triage Filter (112/911 Urgency Flagging)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <span className="px-2 py-0.5 bg-amber-950 text-amber-300 rounded border border-amber-800">Stage 2</span>
              <span>Deterministic Pre-LLM Guardrail (Regex + Semantic Classification for Drugs, Diagnosis, Folk Hazards)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <span className="px-2 py-0.5 bg-sky-950 text-sky-300 rounded border border-sky-800">Stage 3</span>
              <span>Accredited Knowledge Base Retrieval (WHO, Red Cross, AHA, ABA, CDC, NHS)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <span className="px-2 py-0.5 bg-purple-950 text-purple-300 rounded border border-purple-800">Stage 4</span>
              <span>Server-Side Gemini 3.8 Flash Generation with Strict Negative Constraints & Zero-Temperature Bias</span>
            </div>
            <div className="flex items-center gap-2 text-slate-200">
              <span className="px-2 py-0.5 bg-emerald-950 text-emerald-300 rounded border border-emerald-800">Stage 5</span>
              <span>Post-Execution Audit, Live Benchmark Validation, and Hands-Free Voice Synthesis</span>
            </div>
          </div>
        </div>

        {/* How to Export for College Evaluation */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              <FolderArchive className="w-4 h-4 text-amber-400" />
              Submission Instructions & Local Execution
            </h3>
            <button
              onClick={() => handleCopy(terminalExportCommands, 'terminal')}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700 transition-colors"
            >
              {copiedSection === 'terminal' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Commands Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Shell Commands</span>
                </>
              )}
            </button>
          </div>

          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
            <pre>{terminalExportCommands}</pre>
          </div>
        </div>

        {/* Evaluation Checklist */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <h4 className="font-bold text-slate-200 uppercase tracking-wide">
            College Viva / Demo Walkthrough Checklist:
          </h4>
          <ul className="space-y-1.5 text-slate-300">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span><strong>Feature 1-4:</strong> Demonstrate emergency banner (112/911 quick dials) and prompt queries for burns, choking, severe bleeding, fractures, snakebites, and heat stroke.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span><strong>Feature 5-7:</strong> Show prompt refusals for medication ("What dose of tramadol?"), diagnosis ("Do I have cancer?"), and dangerous folk remedies ("Cut snakebite?").</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span><strong>Feature 8:</strong> Navigate to the Safety Benchmark page, click "Run Full Benchmark Suite", and showcase live calculated refusal rate & zero fake passes.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span><strong>Feature 9:</strong> Show "Verified Information Unavailable" for ambiguous/fictional prompts ("alien bite").</span>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-all shadow-md shadow-red-600/30"
          >
            Return to Application
          </button>
        </div>
      </div>
    </div>
  );
};
