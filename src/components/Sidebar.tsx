import React from 'react';
import { MessageCircle, Search, Workflow, Settings, Info, Shield, TrendingUp, Users, GitBranch } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'chat', label: 'KYC Assistant', icon: MessageCircle, tourTarget: 'chat-tab' },
    { id: 'analysis', label: 'Customer Analysis', icon: Search },
    { id: 'workflow', label: 'Agent Workflow', icon: Workflow, tourTarget: 'workflow-tab' },
    { id: 'inter-agent', label: 'Agent Communication', icon: GitBranch, tourTarget: 'inter-agent' },
    { id: 'journey', label: 'Customer Journey', icon: Users, tourTarget: 'journey' },
    { id: 'admin', label: 'Admin & HITL', icon: Settings, tourTarget: 'admin-tab' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, tourTarget: 'analytics-tab' },
    { id: 'responsible-ai', label: 'Responsible AI', icon: Shield, tourTarget: 'responsible-ai-tab' },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen">
      <nav className="p-4">
        <ul className="space-y-2">
          {tabs.map(({ id, label, icon: Icon, tourTarget }) => (
            <li key={id}>
              <button
                onClick={() => onTabChange(id)}
                data-tour={tourTarget}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                  activeTab === id
                    ? 'bg-gray-100 text-black font-medium'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};