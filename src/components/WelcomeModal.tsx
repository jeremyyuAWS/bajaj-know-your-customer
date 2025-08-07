import React from 'react';
import { X, Shield, MessageSquare, User, Calculator, Brain, Users } from 'lucide-react';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTour: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose, onStartTour }) => {
  if (!isOpen) return null;

  const agents = [
    { icon: MessageSquare, name: 'Communication Analysis Agent', description: 'Analyzes voice tone, language patterns, and communication style' },
    { icon: User, name: 'Behavior Profiling Agent', description: 'Evaluates customer behavior patterns and interaction history' },
    { icon: Calculator, name: 'Customer Risk Scoring Agent', description: 'Combines communication and behavior data for risk assessment' },
    { icon: Brain, name: 'Personalization & Recommendation Agent', description: 'Generates personalized premium adjustments and recommendations' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-0 hover:opacity-70 focus:outline-none"
        >
          <X className="h-4 w-4 stroke-black" />
        </button>

        <div className="mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-8 w-8 stroke-black" />
            <h2 className="text-2xl font-bold text-black">Know Your Customer</h2>
          </div>
          <p className="text-gray-600 text-base leading-relaxed">
            Welcome to our agentic AI underwriting platform. This demo showcases how multiple AI agents work together to analyze customer behavior and communication patterns for personalized insurance underwriting decisions.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Role Agents Involved
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agents.map(({ icon: Icon, name, description }) => (
              <div key={name} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                <Icon className="h-5 w-5 stroke-black flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-black text-sm">{name}</h4>
                  <p className="text-xs text-gray-600 mt-1">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-black mb-3">Business Value</h3>
          <ul className="text-gray-600 space-y-2 text-sm">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-black rounded-full flex-shrink-0 mt-2 mr-3"></span>
              <span>Chat with AI assistant to quickly assess customer behavior and risk patterns</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-black rounded-full flex-shrink-0 mt-2 mr-3"></span>
              <span>Personalize underwriting decisions based on customer communication and behavior</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-black rounded-full flex-shrink-0 mt-2 mr-3"></span>
              <span>Reduce manual customer assessment time from hours to minutes</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-black rounded-full flex-shrink-0 mt-2 mr-3"></span>
              <span>Ensure fair, behavior-based underwriting with bias detection</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-black rounded-full flex-shrink-0 mt-2 mr-3"></span>
              <span>Maintain compliance with fair treatment and anti-discrimination regulations</span>
            </li>
          </ul>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onStartTour}
            className="flex-1 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors font-medium"
          >
            Start Product Tour
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-white border border-gray-300 text-black px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            Explore Freely
          </button>
        </div>
      </div>
    </div>
  );
};