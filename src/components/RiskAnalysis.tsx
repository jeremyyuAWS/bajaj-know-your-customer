import React, { useState } from 'react';
import { Search, User, MessageSquare, Brain, Award, FileText, AlertTriangle } from 'lucide-react';
import customerData from '../data/customer-analysis.json';

interface CustomerAnalysisProps {
  isProcessing: boolean;
  onAnalysisRequest: () => void;
}

export const RiskAnalysis: React.FC<CustomerAnalysisProps> = ({ isProcessing, onAnalysisRequest }) => {
  const [customerInput, setCustomerInput] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalysisRequest();
    
    // Simulate processing delay
    setTimeout(() => {
      const key = customerInput.trim() || 'DEFAULT';
      const result = customerData[key as keyof typeof customerData] || customerData.DEFAULT;
      setAnalysis(result);
    }, 2000);
  };

  const getRiskColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getScoreColor = (score: number) => {
    if (score <= 3) return 'text-green-600 bg-green-50';
    if (score <= 7) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-2">Customer Behavior Analysis</h2>
        <p className="text-gray-600">Enter customer ID or name to get personalized underwriting assessment</p>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex space-x-4">
          <div className="flex-1">
            <input
              data-tour="customer-input"
              type="text"
              value={customerInput}
              onChange={(e) => setCustomerInput(e.target.value)}
              placeholder="Enter Customer ID or name (e.g., CUSTOMER_001)"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button
            data-tour="analyze-button"
            type="submit"
            disabled={isProcessing}
            className="px-8 py-3 bg-black text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-400 transition-colors font-medium flex items-center space-x-2"
          >
            <Search className="h-4 w-4" />
            <span>{isProcessing ? 'Analyzing...' : 'Analyze'}</span>
          </button>
        </div>
      </form>

      {isProcessing && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
            <span className="text-gray-600">Agents are processing your request...</span>
          </div>
        </div>
      )}

      {analysis && !isProcessing && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <User className="h-6 w-6 stroke-black" />
              <div>
                <h3 className="text-lg font-semibold text-black">{analysis.customer_name} ({analysis.customer_id})</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(analysis.overall_risk_level)}`}>
                  {analysis.overall_risk_level} Risk
                </span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{analysis.recommendation}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <MessageSquare className="h-5 w-5 stroke-black" />
                <h4 className="font-medium text-black">Communication</h4>
              </div>
              <div className={`text-2xl font-bold mb-2 ${getScoreColor(10 - analysis.communication_score)}`}>
                {analysis.communication_score}/10
              </div>
              <p className="text-sm text-gray-600">{analysis.explanations.communication_score}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <User className="h-5 w-5 stroke-black" />
                <h4 className="font-medium text-black">Behavior</h4>
              </div>
              <div className={`text-2xl font-bold mb-2 ${getScoreColor(10 - analysis.behavior_score)}`}>
                {analysis.behavior_score}/10
              </div>
              <p className="text-sm text-gray-600">{analysis.explanations.behavior_score}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <Brain className="h-5 w-5 stroke-black" />
                <h4 className="font-medium text-black">Policy Awareness</h4>
              </div>
              <div className={`text-2xl font-bold mb-2 ${getScoreColor(10 - analysis.policy_awareness_score)}`}>
                {analysis.policy_awareness_score}/10
              </div>
              <p className="text-sm text-gray-600">{analysis.explanations.policy_awareness_score}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <Award className="h-5 w-5 stroke-black" />
                <h4 className="font-medium text-black">Premium Adjust</h4>
              </div>
              <div className={`text-2xl font-bold mb-2 ${analysis.premium_adjustment.includes('-') ? 'text-green-600' : analysis.premium_adjustment.includes('+') ? 'text-red-600' : 'text-gray-600'}`}>
                {analysis.premium_adjustment}
              </div>
              <p className="text-sm text-gray-600">{analysis.explanations.premium_adjustment}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};