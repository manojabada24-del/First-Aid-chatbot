/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * CSE276 Artificial Intelligence Foundations - First Aid Guardian
 * Academic Project Report & Viva Demonstration Interface
 */

import React, { useState } from 'react';
import {
  GraduationCap,
  ShieldCheck,
  ShieldAlert,
  Cpu,
  BookOpen,
  Award,
  Layers,
  FileText,
  CheckCircle2,
  AlertTriangle,
  FolderArchive,
  Copy,
  Check,
  Terminal,
  ExternalLink
} from 'lucide-react';

interface CollegeProjectReportProps {
  onOpenSubmissionModal: () => void;
  onNavigateToTesting: () => void;
  onNavigateToChat: () => void;
}

export const CollegeProjectReport: React.FC<CollegeProjectReportProps> = ({
  onOpenSubmissionModal,
  onNavigateToTesting,
  onNavigateToChat
}) => {
  const [copiedZip, setCopiedZip] = useState(false);

  const zipCommand = `zip -r FirstAidGuardian_CSE276.zip . -x "node_modules/*" -x "dist/*" -x ".git/*"`;

  const handleCopyZip = () => {
    navigator.clipboard.writeText(zipCommand);
    setCopiedZip(true);
    setTimeout(() => setCopiedZip(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-amber-950 text-amber-300 border border-amber-800">
                CSE276 Course Capstone
              </span>
              <span className="text-xs text-slate-400 font-mono">
                B.Tech 2nd Year AI Foundations
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              First Aid Guardian: Ethical AI System Architecture
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
              An evidence-based conversational first-aid triage agent featuring dual-layer pre/post LLM safety guardrails,
              zero-hallucination health authority grounding, and an empirical evaluation benchmark suite.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onNavigateToTesting}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-red-600/30 transition-all hover:scale-105"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Launch Safety Benchmark</span>
            </button>
            <button
              onClick={onOpenSubmissionModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-semibold text-xs sm:text-sm transition-all"
            >
              <FolderArchive className="w-4 h-4 text-amber-400" />
              <span>Submission Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* Project Rubric Alignment Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <span>CSE276 Academic Specification & Evaluation Mapping</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-800 text-red-400 border border-slate-700">
                Criterion 1 & 2
              </span>
              <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Fulfilled
              </span>
            </div>
            <h3 className="font-bold text-sm text-slate-100">
              Clean Interface & Emergency Triage
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Provides an emergency warning banner with 112 / 911 / 108 direct dialing, rapid triage chips, and hands-free text-to-speech audio readout for rescuers in the field.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">
                Criterion 3
              </span>
              <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Fulfilled
              </span>
            </div>
            <h3 className="font-bold text-sm text-slate-100">
              Accredited Health Authority Citations
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Strictly grounded in verified documentation from WHO, American Red Cross, AHA, ABA, CDC, and NHS. Sources are genuine official publications, never hallucinated.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                Criterion 4, 5, 6 & 7
              </span>
              <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Fulfilled
              </span>
            </div>
            <h3 className="font-bold text-sm text-slate-100">
              Strict Guardrails & Zero Prescription Policy
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Deterministic pre-LLM regex and semantic safety classifier intercepts and refuses medication requests, diagnostic queries, and harmful folk practices (cutting snakebites, butter on burns).
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-800 text-purple-400 border border-slate-700">
                Criterion 8
              </span>
              <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Fulfilled
              </span>
            </div>
            <h3 className="font-bold text-sm text-slate-100">
              Empirical Safety Benchmark & Live Testing
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Features an automated benchmark page executing 16 standardized probes live against the server API. Computes real refusal rates and protocol accuracy without simulated passes.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-800 text-rose-400 border border-slate-700">
                Criterion 9
              </span>
              <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Fulfilled
              </span>
            </div>
            <h3 className="font-bold text-sm text-slate-100">
              Unavailable Protocol Notice (Anti-Hallucination)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When queries involve unsupported or speculative scenarios (e.g., alien bites, home open-chest surgery), the model refuses with a clear "Verified Information Unavailable" disclaimer.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2.5 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700">
                Criterion 10
              </span>
              <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Fulfilled
              </span>
            </div>
            <h3 className="font-bold text-sm text-slate-100">
              Full-Stack Architecture & Server-Side Security
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Built on React + TypeScript + Express full-stack framework. All Gemini API keys are isolated on the server side (`server.ts`) with zero client-side credential exposure.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Pipeline Architecture */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-red-500" />
          <span>System Pipeline & Safety Workflow</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-mono text-red-400 font-bold">01. INTAKE</div>
            <h4 className="font-bold text-slate-200">Emergency Triage</h4>
            <p className="text-slate-400 leading-snug">
              User query ingested. Life-threatening symptoms trigger immediate 112/911 call banners.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-mono text-amber-400 font-bold">02. GUARDRAIL</div>
            <h4 className="font-bold text-slate-200">Deterministic Safety Audit</h4>
            <p className="text-slate-400 leading-snug">
              Fast regex and safety classifier checks for drug prescriptions, diagnosis requests, or dangerous remedies.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-mono text-sky-400 font-bold">03. GROUNDING</div>
            <h4 className="font-bold text-slate-200">Authority Retrieval</h4>
            <p className="text-slate-400 leading-snug">
              Retrieves verified protocol from WHO / Red Cross / AHA / ABA database with verified citations.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-mono text-purple-400 font-bold">04. LLM SYNTHESIS</div>
            <h4 className="font-bold text-slate-200">Server Gemini 3.8 Flash</h4>
            <p className="text-slate-400 leading-snug">
              Synthesizes numbered immediate steps, warnings, and citations under strict temperature (0.2).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-mono text-emerald-400 font-bold">05. OUTPUT</div>
            <h4 className="font-bold text-slate-200">TTS & Citation UI</h4>
            <p className="text-slate-400 leading-snug">
              Renders actionable steps, contraindications ("What NEVER to do"), and Web Speech audio.
            </p>
          </div>
        </div>
      </div>

      {/* College Code Export Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FolderArchive className="w-5 h-5 text-amber-400" />
              <span>College Submission Code Packaging</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Command to package the codebase into a clean `.zip` archive for portal submission.
            </p>
          </div>

          <button
            onClick={handleCopyZip}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
          >
            {copiedZip ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Zip Command Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-400" />
                <span>Copy Zip Command</span>
              </>
            )}
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 font-mono text-xs text-amber-300 border border-slate-800 overflow-x-auto">
          <code>{zipCommand}</code>
        </div>
      </div>
    </div>
  );
};
