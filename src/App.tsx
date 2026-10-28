/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * CSE276 Artificial Intelligence Foundations - First Aid Guardian
 * Main Application Root
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { EmergencyBanner } from './components/EmergencyBanner.tsx';
import { ChatInterface } from './components/ChatInterface.tsx';
import { TestingBenchmark } from './components/TestingBenchmark.tsx';
import { ProtocolLibrary } from './components/ProtocolLibrary.tsx';
import { CollegeProjectReport } from './components/CollegeProjectReport.tsx';
import { EmergencyHotlineModal } from './components/EmergencyHotlineModal.tsx';
import { ProjectSubmissionModal } from './components/ProjectSubmissionModal.tsx';

export default function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'testing' | 'protocols' | 'project'>('chat');
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState(false);
  const [initialProtocolTrigger, setInitialProtocolTrigger] = useState<string | null>(null);

  const handleSelectEmergencyProtocol = (protocolKey: string) => {
    setInitialProtocolTrigger(protocolKey);
    setActiveTab('chat');
  };

  const handleStartProtocolChat = (protocolKey: string) => {
    setInitialProtocolTrigger(protocolKey);
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-red-500/30 selection:text-red-200">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
        onOpenSubmissionModal={() => setIsSubmissionModalOpen(true)}
      />

      {/* Emergency Alert & Quick Protocol Banner */}
      <EmergencyBanner onSelectEmergencyProtocol={handleSelectEmergencyProtocol} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden">
        {activeTab === 'chat' && (
          <ChatInterface
            initialProtocolTrigger={initialProtocolTrigger}
            onClearProtocolTrigger={() => setInitialProtocolTrigger(null)}
            onNavigateToTesting={() => setActiveTab('testing')}
          />
        )}

        {activeTab === 'testing' && <TestingBenchmark />}

        {activeTab === 'protocols' && (
          <ProtocolLibrary onStartProtocolChat={handleStartProtocolChat} />
        )}

        {activeTab === 'project' && (
          <CollegeProjectReport
            onOpenSubmissionModal={() => setIsSubmissionModalOpen(true)}
            onNavigateToTesting={() => setActiveTab('testing')}
            onNavigateToChat={() => setActiveTab('chat')}
          />
        )}
      </main>

      {/* Emergency Hotlines Directory Modal */}
      <EmergencyHotlineModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />

      {/* Project Submission & Export Guide Modal */}
      <ProjectSubmissionModal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
      />
    </div>
  );
}
