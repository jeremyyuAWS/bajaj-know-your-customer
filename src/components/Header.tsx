import React from 'react';
import { HelpCircle } from 'lucide-react';

interface HeaderProps {
  onWelcomeModal: () => void;
  onTourStart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onWelcomeModal, onTourStart }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src="/Bajaj-Allianz-logo-2.jpeg" 
            alt="Bajaj Allianz" 
            className="h-8 w-auto object-contain"
          />
          <div>
            <h1 className="text-xl font-bold text-black">Know Your Customer</h1>
            <p className="text-sm text-gray-600">Personalized AI Underwriting</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={onTourStart}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-black"
          >
            Start Tour
          </button>
          
          <button
            onClick={onWelcomeModal}
            className="p-2 hover:opacity-70 focus:outline-none"
            aria-label="Help"
          >
            <HelpCircle className="h-5 w-5 stroke-black" />
          </button>
        </div>
      </div>
    </header>
  );
};