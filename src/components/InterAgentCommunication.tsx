import React, { useState, useEffect } from 'react';
import { MessageSquare, ArrowRight, Clock, CheckCircle, Brain, Zap } from 'lucide-react';
import agentCommsData from '../data/agent-communications.json';

interface InterAgentCommunicationProps {
  isProcessing: boolean;
}

export const InterAgentCommunication: React.FC<InterAgentCommunicationProps> = ({ isProcessing }) => {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [showAllMessages, setShowAllMessages] = useState(false);

  useEffect(() => {
    if (isProcessing && !showAllMessages) {
      let messageIndex = 0;
      const interval = setInterval(() => {
        if (messageIndex < agentCommsData.agent_messages.length) {
          setVisibleMessages(messageIndex + 1);
          messageIndex++;
        } else {
          clearInterval(interval);
        }
      }, 800);

      return () => clearInterval(interval);
    } else if (!isProcessing) {
      setShowAllMessages(true);
      setVisibleMessages(agentCommsData.agent_messages.length);
    }
  }, [isProcessing, showAllMessages]);

  const getAgentName = (agentId: string) => {
    const names: { [key: string]: string } = {
      'communication-analysis': 'Communication Agent',
      'behavior-profiling': 'Behavior Agent', 
      'risk-scoring': 'Risk Scoring Agent',
      'personalization': 'Personalization Agent'
    };
    return names[agentId] || agentId;
  };

  const getAgentColor = (agentId: string) => {
    const colors: { [key: string]: string } = {
      'communication-analysis': 'bg-blue-50 border-blue-200 text-blue-800',
      'behavior-profiling': 'bg-green-50 border-green-200 text-green-800',
      'risk-scoring': 'bg-yellow-50 border-yellow-200 text-yellow-800',
      'personalization': 'bg-purple-50 border-purple-200 text-purple-800'
    };
    return colors[agentId] || 'bg-gray-50 border-gray-200 text-gray-800';
  };

  return (
    <div className="p-6 max-w-5xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-2">Inter-Agent Communication</h2>
        <p className="text-gray-600">Real-time message exchange between AI agents during customer analysis</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-black flex items-center">
            <Zap className="h-5 w-5 mr-2" />
            Session: {agentCommsData.session_id}
          </h3>
          <span className="text-sm text-gray-600">Customer: {agentCommsData.customer_id}</span>
        </div>

        <div className="space-y-4">
          {agentCommsData.agent_messages.slice(0, visibleMessages).map((message, index) => (
            <div key={index} className="relative">
              <div className="flex items-start space-x-4">
                <div className={`px-3 py-2 rounded-xl border text-sm font-medium ${getAgentColor(message.from_agent)}`}>
                  {getAgentName(message.from_agent)}
                </div>
                
                <ArrowRight className="h-5 w-5 text-gray-400 mt-2 flex-shrink-0" />
                
                <div className={`px-3 py-2 rounded-xl border text-sm font-medium ${getAgentColor(message.to_agent)}`}>
                  {getAgentName(message.to_agent)}
                </div>

                <div className="flex-1 bg-gray-50 rounded-xl p-4 ml-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                      {message.message_type.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-700 space-y-2">
                    {typeof message.content === 'object' && (
                      <div className="space-y-1">
                        {Object.entries(message.content).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-center">
                            <span className="font-medium capitalize">{key.replace('_', ' ')}:</span>
                            <span className={`${
                              typeof value === 'number' ? 'font-mono bg-white px-2 py-1 rounded' : ''
                            }`}>
                              {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {message.content.confidence && (
                    <div className="mt-2 flex items-center space-x-2">
                      <span className="text-xs text-gray-600">Confidence:</span>
                      <div className="bg-white rounded-full h-2 flex-1 max-w-24">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${message.content.confidence * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium">{(message.content.confidence * 100).toFixed(0)}%</span>
                    </div>
                  )}
                </div>
              </div>

              {isProcessing && index === visibleMessages - 1 && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-full shadow border">
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                    <span className="text-xs text-blue-600">Processing...</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {!isProcessing && visibleMessages === agentCommsData.agent_messages.length && (
          <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-800 font-medium">Agent communication complete</span>
            </div>
            <p className="text-green-700 text-sm mt-1">
              All agents have successfully communicated and reached consensus on customer risk assessment.
            </p>
          </div>
        )}
      </div>

      {/* Communication Insights */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
          <Brain className="h-5 w-5 mr-2" />
          Communication Insights
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-black mb-2">Coordination Benefits</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Shared context across all agents</li>
              <li>• Real-time confidence validation</li>
              <li>• Consensus-based decision making</li>
              <li>• Reduced processing redundancy</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-black mb-2">Quality Assurance</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Cross-validation between agents</li>
              <li>• Confidence score aggregation</li>
              <li>• Automatic conflict resolution</li>
              <li>• Audit trail for all decisions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};