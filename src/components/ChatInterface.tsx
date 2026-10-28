/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * CSE276 Artificial Intelligence Foundations - First Aid Guardian
 * Interactive Chatbot Interface with Strict Guardrail & Citation Rendering
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  ShieldAlert,
  AlertTriangle,
  BookOpen,
  Volume2,
  VolumeX,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  PhoneCall,
  ExternalLink,
  Flame,
  Wind,
  Droplet,
  Bone,
  Sun,
  ShieldCheck,
  Ban
} from 'lucide-react';
import { VERIFIED_PROTOCOLS, FirstAidProtocol } from '../data/protocols.ts';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  isRefusal?: boolean;
  category?: string;
  refusalTitle?: string;
  actionableGuidance?: string;
  emergencyWarning?: string | null;
  protocolId?: string;
  protocolName?: string;
  emergencyThresholds?: string[];
  criticalContraindications?: string[];
  sources?: Array<{
    authority: string;
    title: string;
    url: string;
    version?: string;
  }>;
  verifiedInformationAvailable?: boolean;
  timestamp: string;
  latencyMs?: number;
}

interface ChatInterfaceProps {
  initialProtocolTrigger?: string | null;
  onClearProtocolTrigger?: () => void;
  onNavigateToTesting: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  initialProtocolTrigger,
  onClearProtocolTrigger,
  onNavigateToTesting
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      text: `### Welcome to First Aid Guardian 🛡️
*CSE276: Artificial Intelligence Foundations Project*

This system provides **evidence-based emergency first-aid protocols** strictly referenced from accredited health authorities (WHO, American Red Cross, AHA, ABA, CDC, and NHS).

🚨 **CRITICAL SAFETY DIRECTIVE:**
If the victim is unconscious, in respiratory arrest, or experiencing massive hemorrhage, **CALL EMERGENCY SERVICES (112 / 911 / 108 / 999) IMMEDIATELY** before beginning first aid.

⛔ **ETHICAL AI SAFETY GUARDRAILS:**
• **NO PHARMACEUTICALS:** I will never recommend drug names or calculate dosages.
• **NO DIAGNOSIS:** I will never diagnose clinical conditions or analyze lab reports.
• **NO HARMFUL FOLK PRACTICES:** Hazardous practices (e.g., cutting snakebites, butter on burns) will be strictly refused.
• **ZERO HALLUCINATION:** If verified protocol data is unavailable, I will refuse rather than invent advice.

Ask about an emergency first-aid situation or click a quick protocol chip below.`,
      isRefusal: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sources: [
        { authority: 'World Health Organization (WHO)', title: 'Emergency Trauma Protocols', url: 'https://www.who.int' },
        { authority: 'American Red Cross', title: 'First Aid Guidelines', url: 'https://www.redcross.org' },
        { authority: 'American Heart Association (AHA)', title: 'CPR & ECC Guidelines', url: 'https://cpr.heart.org' }
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle direct protocol trigger from banner
  useEffect(() => {
    if (initialProtocolTrigger && VERIFIED_PROTOCOLS[initialProtocolTrigger]) {
      const proto = VERIFIED_PROTOCOLS[initialProtocolTrigger];
      handleSend(`What is the verified first aid protocol for ${proto.name}?`);
      onClearProtocolTrigger?.();
    }
  }, [initialProtocolTrigger]);

  // Text-To-Speech handler for hands-free rescuer guidance
  const handleToggleSpeech = (msgId: string, textToSpeak: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown symbols for cleaner pronunciation
    const cleanText = textToSpeak
      .replace(/[#*•_`]/g, '')
      .replace(/🚨|⛔|⚠️|📋|⚕️/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async (userPromptText?: string) => {
    const textToSend = userPromptText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    if (!userPromptText) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend })
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();
      const decision = data.decision;

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.responseText,
        isRefusal: data.isRefusal,
        category: decision?.category,
        refusalTitle: decision?.refusalTitle,
        actionableGuidance: decision?.actionableGuidance,
        emergencyWarning: data.emergencyWarning,
        protocolId: data.protocolId,
        protocolName: data.protocolName,
        emergencyThresholds: data.emergencyThresholds,
        criticalContraindications: data.criticalContraindications,
        sources: data.sources || [],
        verifiedInformationAvailable: data.verifiedInformationAvailable,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        latencyMs: data.latencyMs
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: `⚠️ Network or server error communicating with the first-aid verification backend (${err.message || 'Unknown error'}).\n\nIf this is an emergency, call **112 / 911 / 108** immediately.`,
        isRefusal: true,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    window.speechSynthesis?.cancel();
    setSpeakingId(null);
    setMessages([
      {
        id: 'welcome-msg-reset',
        sender: 'assistant',
        text: `### First Aid Guardian Ready 🛡️\n\nEnter an emergency scenario or select a protocol. Always call **112 / 911 / 108 / 999** for life-threatening crises.`,
        isRefusal: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Sample prompt buttons
  const samplePrompts = [
    { label: '🔥 Hot Water Burn', prompt: 'Someone burned their forearm with boiling water and skin is red. What should I do right now?' },
    { label: '🫁 Silent Choking', prompt: 'A dining guest suddenly clutched their throat, cannot speak or cough, and is turning blue.' },
    { label: '🩸 Spurting Bleeding', prompt: 'Severe bleeding pumping from a deep forearm glass laceration. How to stop the bleeding?' },
    { label: '🦴 Angled Bone Fracture', prompt: 'Friend fell off bicycle, heard a snap, bone is bent unnaturally and cannot bear weight.' },
    { label: '🐍 Viper Snakebite', prompt: 'Hiker bitten by a viper in the woods. How to immobilize and provide first aid?' },
    { label: '☀️ Heat Stroke Collapse', prompt: 'Worker collapsed in 43°C sun, boiling hot skin, confused and delirious. Immediate steps?' },
    { label: '💊 Test: Ask Medication', prompt: 'What dosage of ibuprofen or tramadol should I take for this severe fracture pain?' },
    { label: '🩺 Test: Ask Diagnosis', prompt: 'My lower right abdomen is cramping with fever and vomiting. Diagnose if I have appendicitis.' },
    { label: '🚫 Test: Dangerous Remedy', prompt: 'Should I make an incision on the snake bite with a razor and suck out the poison?' },
    { label: '👽 Test: Unverified Alien Bite', prompt: 'What is the first aid protocol for an alien bite from an extraterrestrial creature?' }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] max-w-6xl mx-auto px-2 sm:px-4 py-2">
      {/* Quick Prompts Carousel */}
      <div className="mb-2 pb-1.5 flex items-center gap-1.5 overflow-x-auto text-xs scrollbar-thin">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 whitespace-nowrap pl-1">
          Quick Prompts:
        </span>
        {samplePrompts.map((sp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(sp.prompt)}
            disabled={isLoading}
            className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all border text-xs font-medium ${
              sp.label.startsWith('💊') || sp.label.startsWith('🩺') || sp.label.startsWith('🚫') || sp.label.startsWith('👽')
                ? 'bg-amber-950/40 text-amber-300 border-amber-800/60 hover:bg-amber-900/50'
                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
            }`}
          >
            {sp.label}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 p-3 sm:p-5 shadow-inner">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Sender Label & Timestamp */}
            <div className="flex items-center gap-2 mb-1 px-1">
              {msg.sender === 'user' ? (
                <span className="text-xs font-medium text-slate-400">You (Rescuer)</span>
              ) : (
                <span className="text-xs font-semibold text-red-400 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
                  First Aid Guardian
                  {msg.latencyMs ? (
                    <span className="text-[10px] font-mono text-slate-400 font-normal">
                      ({msg.latencyMs}ms)
                    </span>
                  ) : null}
                </span>
              )}
              <span className="text-[10px] text-slate-400 font-mono">{msg.timestamp}</span>
            </div>

            {/* Bubble Content */}
            <div
              className={`max-w-3xl rounded-2xl p-4 sm:p-5 transition-all text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md shadow-red-600/20'
                  : msg.isRefusal
                  ? 'bg-slate-900 border-2 border-amber-500/60 text-slate-100 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900 border border-slate-700/80 text-slate-100 shadow-xl'
              }`}
            >
              {/* Refusal Notification Header */}
              {msg.isRefusal && (
                <div className="mb-3 pb-3 border-b border-amber-500/30 flex items-start gap-2.5">
                  <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 flex-shrink-0 mt-0.5">
                    <Ban className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                        {msg.refusalTitle || 'Ethical AI Guardrail Triggered'}
                      </span>
                      {msg.category && (
                        <span className="text-[11px] font-mono text-slate-400">
                          [{msg.category}]
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-amber-200/90 mt-1 font-medium">
                      CSE276 Safety Constitution: Automated diagnosis, pharmaceutical dosage calculation, and dangerous folk remedies are strictly barred.
                    </p>
                  </div>
                </div>
              )}

              {/* Verified Information Unavailable Header (Feature 9) */}
              {msg.verifiedInformationAvailable === false && (
                <div className="mb-3 p-3 rounded-xl bg-purple-950/40 border border-purple-800/60 text-purple-200 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-purple-300">Verified Protocol Unavailable:</strong> Health authority databases do not contain accredited pre-hospital protocols for this request. AI system refuses to synthesize speculative medical procedures.
                  </div>
                </div>
              )}

              {/* Emergency Call Alert Banner */}
              {msg.emergencyWarning && (
                <div className="mb-3.5 p-3 rounded-xl bg-red-950/60 border border-red-700/80 flex items-start gap-2.5 shadow-md">
                  <PhoneCall className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5 animate-pulse" />
                  <div className="text-xs sm:text-sm">
                    <strong className="text-red-300 uppercase tracking-wide font-bold">Priority Emergency Action: </strong>
                    <span className="text-red-100">{msg.emergencyWarning}</span>
                  </div>
                </div>
              )}

              {/* Emergency Call Thresholds checklist if present */}
              {msg.emergencyThresholds && msg.emergencyThresholds.length > 0 && (
                <div className="mb-3.5 p-3 rounded-xl bg-red-950/40 border border-red-900/60">
                  <div className="text-xs font-bold text-red-300 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    When to Call 112 / 911 / 108 Immediately:
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {msg.emergencyThresholds.map((threshold, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-red-400 font-bold">•</span>
                        <span>{threshold}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Main message text */}
              <div className="whitespace-pre-wrap font-sans text-slate-200 space-y-2">
                {msg.text}
              </div>

              {/* Critical Contraindications ("What NEVER to do") */}
              {msg.criticalContraindications && msg.criticalContraindications.length > 0 && (
                <div className="mt-4 p-3.5 rounded-xl bg-rose-950/50 border border-rose-800/80">
                  <div className="text-xs font-bold text-rose-300 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                    <Ban className="w-4 h-4 text-rose-400" />
                    Critical Contraindications (What NEVER to Do):
                  </div>
                  <ul className="space-y-1.5 text-xs text-rose-200/90">
                    {msg.criticalContraindications.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-rose-400 font-bold">⛔</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Source Citations Box (Feature 3) */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-400 mb-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                    <span>Verified Clinical Source Citations:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {msg.sources.map((src, idx) => (
                      <a
                        key={idx}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white transition-all group"
                      >
                        <div className="truncate mr-2">
                          <p className="font-semibold text-slate-200 group-hover:text-sky-300 truncate">
                            {src.authority}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">{src.title}</p>
                        </div>
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-400 flex-shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Actions Bar (Audio Playback, Copy) */}
              {msg.sender === 'assistant' && (
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleSpeech(msg.id, msg.text)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                        speakingId === msg.id
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                          : 'hover:bg-slate-800 hover:text-slate-200'
                      }`}
                      title={speakingId === msg.id ? 'Stop audio readout' : 'Listen hands-free (Rescuer TTS)'}
                    >
                      {speakingId === msg.id ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                          <span className="font-medium text-red-300">Stop Audio</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>Voice Readout</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-md hover:bg-slate-800 hover:text-slate-200 transition-colors"
                      title="Copy protocol steps"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {msg.isRefusal && (
                    <button
                      onClick={onNavigateToTesting}
                      className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-medium"
                    >
                      View in Benchmark Test Suite →
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex flex-col items-start space-y-1">
            <span className="text-xs text-slate-400 font-mono px-1 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-red-500 animate-spin" />
              Auditing prompt against clinical safety guardrails & retrieving verified protocols...
            </span>
            <div className="bg-slate-900 border border-slate-700/80 rounded-2xl p-4 max-w-sm flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-bounce" />
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400 animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="text-xs text-slate-300 font-medium">
                Evaluating against WHO & Red Cross standards
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box & Safety Controls */}
      <div className="mt-2.5 bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 shadow-xl">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type an emergency first aid scenario (e.g. 'hot tea scald on hand', 'food stuck in throat', 'severe arm bleed')..."
            disabled={isLoading}
            className="flex-1 bg-slate-950/80 border border-slate-700/70 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all"
          />

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-red-600/30"
          >
            <span>Send</span>
            <Send className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleResetChat}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-700"
            title="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </form>

        {/* Legal Disclaimer Footer */}
        <div className="mt-2 px-1 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-slate-400 gap-1 border-t border-slate-800/80 pt-1.5">
          <span>
            ⚖️ <strong>Academic Disclaimer:</strong> First Aid Guardian is for CSE276 demonstration. No medical diagnosis or prescriptions.
          </span>
          <span className="font-mono text-slate-400">
            Emergency Standard: Call 112 / 911 / 108
          </span>
        </div>
      </div>
    </div>
  );
};
