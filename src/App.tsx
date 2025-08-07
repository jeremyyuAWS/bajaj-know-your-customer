import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { WelcomeModal } from './components/WelcomeModal';
import { ChatInterface } from './components/ChatInterface';
import { RiskAnalysis } from './components/RiskAnalysis';
import { AgentWorkflow } from './components/AgentWorkflow';
import { AdminPanel } from './components/AdminPanel';
import { Analytics } from './components/Analytics';
import { ResponsibleAI } from './components/ResponsibleAI';
import { About } from './components/About';
import { InterAgentCommunication } from './components/InterAgentCommunication';
import { CustomerJourney } from './components/CustomerJourney';
import { ProductTour } from './components/ProductTour';

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tourRunning, setTourRunning] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<any>(null);

  const handleAnalysisRequest = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      // In a real app, this would contain the actual analysis result
      setLastAnalysis({
        customer_name: "Sample Customer",
        recommendation: "This customer presents moderate behavioral risk factors requiring standard underwriting protocols.",
        // ... other analysis data would be here
      });
    }, 2000);
  };

  const handleTourStart = () => {
    setShowWelcomeModal(false);
    setTourRunning(true);
    setActiveTab('analysis');
  };

  const handleTourFinish = () => {
    setTourRunning(false);
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'chat':
        return (
          <div data-tour="chat-content">
            <ChatInterface />
          </div>
        );
      case 'analysis':
        return (
          <div data-tour="analysis-content">
            <RiskAnalysis
              isProcessing={isProcessing}
              onAnalysisRequest={handleAnalysisRequest}
            />
          </div>
        );
      case 'workflow':
        return <AgentWorkflow isProcessing={isProcessing} />;
      case 'inter-agent':
        return <InterAgentCommunication isProcessing={isProcessing} />;
      case 'journey':
        return <CustomerJourney />;
      case 'admin':
        return <AdminPanel lastAnalysis={lastAnalysis} />;
      case 'analytics':
        return <Analytics />;
      case 'responsible-ai':
        return <ResponsibleAI />;
      case 'about':
        return <About />;
      default:
        return (
          <RiskAnalysis
            isProcessing={isProcessing}
            onAnalysisRequest={handleAnalysisRequest}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onWelcomeModal={() => setShowWelcomeModal(true)}
        onTourStart={handleTourStart}
      />
      
      <div className="flex">
        <div data-tour="sidebar">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        
        <main className="flex-1 overflow-auto">
          {renderActiveTab()}
        </main>
      </div>

      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        onStartTour={handleTourStart}
      />

      <ProductTour
        isRunning={tourRunning}
        onFinish={handleTourFinish}
      />

      {/* Tour targets for elements that need specific data attributes */}
      <style jsx global>{`
        [data-tour="location-input"] {
          position: relative;
        }
        [data-tour="analyze-button"] {
          position: relative;
        }
        [data-tour="workflow-tab"] {
          position: relative;
        }
        [data-tour="admin-tab"] {
          position: relative;
        }
        [data-tour="responsible-ai-tab"] {
          position: relative;
        }
      `}</style>
    </div>
  );
}

export default App;