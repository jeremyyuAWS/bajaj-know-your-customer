import React, { useEffect, useState } from 'react';
import { CheckCircle, Clock, ArrowRight, MessageSquare, User, Calculator, Brain, Circle } from 'lucide-react';
import agentsData from '../data/agents.json';

// Icon mapping for dynamic icon loading
const iconMap = {
  MessageSquare,
  User,
  Calculator,
  Brain,
  Circle
};

interface AgentWorkflowProps {
  isProcessing: boolean;
}

export const AgentWorkflow: React.FC<AgentWorkflowProps> = ({ isProcessing }) => {
  const [activeAgentIndex, setActiveAgentIndex] = useState(-1);

  useEffect(() => {
    if (isProcessing) {
      let index = 0;
      const interval = setInterval(() => {
        if (index < agentsData.length) {
          setActiveAgentIndex(index);
          index++;
        } else {
          clearInterval(interval);
          setActiveAgentIndex(-1);
        }
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-2">Agent Workflow</h2>
        <p className="text-gray-600">Visualizing the multi-agent orchestration for risk assessment</p>
      </div>

      <div className="space-y-6">
        {agentsData.map((agent, index) => {
          const IconComponent = iconMap[agent.icon as keyof typeof iconMap] || Circle;
          
          const isActive = isProcessing && activeAgentIndex === index;
          const isCompleted = isProcessing && activeAgentIndex > index;
          const isPending = !isProcessing || activeAgentIndex < index;

          return (
            <div key={agent.id} className="relative">
              <div className={`bg-white rounded-2xl p-6 shadow-sm border-2 transition-all duration-500 ${
                isActive ? 'border-blue-500 bg-blue-50' : 
                isCompleted ? 'border-green-500 bg-green-50' : 
                'border-gray-200'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl transition-colors ${
                    isActive ? 'bg-blue-500 text-white' :
                    isCompleted ? 'bg-green-500 text-white' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : isActive ? (
                      <Clock className="h-6 w-6 animate-pulse" />
                    ) : (
                      <IconComponent className="h-6 w-6" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-black mb-2">{agent.name}</h3>
                    <p className="text-gray-600 mb-2">{agent.description}</p>
                    
                    {(isActive || isCompleted) && (
                      <div className="flex items-center space-x-4 text-sm">
                        <span className={`px-2 py-1 rounded-full font-medium ${
                          isCompleted ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {isCompleted ? 'Completed' : 'Processing'}
                        </span>
                        <span className="text-gray-500">
                          Processing time: {agent.processing_time}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {isActive && (
                  <div className="mt-4 bg-white bg-opacity-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 text-blue-600">
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-blue-600"></div>
                      <span className="text-sm">Agent is processing...</span>
                    </div>
                  </div>
                )}
              </div>

              {index < agentsData.length - 1 && (
                <div className="flex justify-center my-4">
                  <ArrowRight className={`h-6 w-6 transition-colors ${
                    isCompleted ? 'text-green-500' : 'text-gray-300'
                  }`} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!isProcessing && (
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-black mb-3">Workflow Summary</h3>
          <p className="text-gray-600 mb-4">
            This orchestrated workflow ensures comprehensive risk assessment by leveraging specialized agents for different aspects of the analysis.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-black mb-2">Benefits:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Parallel processing for faster results</li>
                <li>• Specialized expertise per domain</li>
                <li>• Consistent scoring methodology</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-black mb-2">Quality Assurance:</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Each agent validates its outputs</li>
                <li>• Cross-validation between agents</li>
                <li>• Human oversight and override capability</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};