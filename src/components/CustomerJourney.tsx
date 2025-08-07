import React from 'react';
import { Phone, Mail, MessageCircle, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import customerInteractions from '../data/customer-interactions.json';

export const CustomerJourney: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = React.useState<'CUSTOMER_001' | 'CUSTOMER_002'>('CUSTOMER_001');
  
  const customer = customerInteractions[selectedCustomer];
  
  const getInteractionIcon = (type: string) => {
    switch (type) {
      case 'phone_call': return Phone;
      case 'email': return Mail;
      case 'chat': return MessageCircle;
      default: return MessageCircle;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreTrend = (current: number, previous: number) => {
    if (current > previous) return { icon: TrendingUp, color: 'text-green-600' };
    if (current < previous) return { icon: TrendingDown, color: 'text-red-600' };
    return { icon: TrendingUp, color: 'text-gray-600' };
  };

  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-2">Customer Journey Analysis</h2>
        <p className="text-gray-600">Track customer behavior and communication patterns over time</p>
      </div>

      {/* Customer Selector */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setSelectedCustomer('CUSTOMER_001')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCustomer === 'CUSTOMER_001'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            CUSTOMER_001 (Low Risk)
          </button>
          <button
            onClick={() => setSelectedCustomer('CUSTOMER_002')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCustomer === 'CUSTOMER_002'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            CUSTOMER_002 (High Risk)
          </button>
        </div>
      </div>

      {/* Interaction Timeline */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
        <h3 className="text-lg font-semibold text-black mb-6">Interaction Timeline</h3>
        
        <div className="space-y-6">
          {customer.interactions.map((interaction, index) => {
            const Icon = getInteractionIcon(interaction.type);
            
            return (
              <div key={interaction.id} className="relative">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Icon className="h-5 w-5 text-gray-600" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-black capitalize">{interaction.type.replace('_', ' ')}</h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        {new Date(interaction.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3">
                      {interaction.transcript_summary || `${interaction.message_count} messages exchanged`}
                    </p>

                    {/* Tone Analysis for phone calls */}
                    {interaction.tone_analysis && (
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div className="text-center">
                          <div className={`text-lg font-bold ${getScoreColor(interaction.tone_analysis.politeness)}`}>
                            {interaction.tone_analysis.politeness.toFixed(1)}
                          </div>
                          <div className="text-xs text-gray-600">Politeness</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-lg font-bold ${getScoreColor(interaction.tone_analysis.clarity)}`}>
                            {interaction.tone_analysis.clarity.toFixed(1)}
                          </div>
                          <div className="text-xs text-gray-600">Clarity</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-lg font-bold ${getScoreColor(interaction.tone_analysis.cooperativeness)}`}>
                            {interaction.tone_analysis.cooperativeness.toFixed(1)}
                          </div>
                          <div className="text-xs text-gray-600">Cooperation</div>
                        </div>
                      </div>
                    )}

                    {/* Language Analysis for emails/chats */}
                    {interaction.language_analysis && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                        <div className="grid grid-cols-3 gap-3 text-sm">
                          <div>
                            <span className="font-medium">Complexity:</span>
                            <span className="ml-2 text-gray-600">{interaction.language_analysis.complexity}</span>
                          </div>
                          <div>
                            <span className="font-medium">Grammar:</span>
                            <span className={`ml-2 font-medium ${getScoreColor(interaction.language_analysis.grammar_quality)}`}>
                              {interaction.language_analysis.grammar_quality}/10
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">Tech Understanding:</span>
                            <span className={`ml-2 font-medium ${getScoreColor(interaction.language_analysis.technical_understanding)}`}>
                              {interaction.language_analysis.technical_understanding}/10
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Red Flags and Positive Signals */}
                    <div className="flex flex-wrap gap-2">
                      {interaction.red_flags?.map((flag, i) => (
                        <span key={i} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-red-50 text-red-700 border border-red-200">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          {flag.replace('_', ' ')}
                        </span>
                      ))}
                      {interaction.positive_signals?.map((signal, i) => (
                        <span key={i} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-50 text-green-700 border border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {signal.replace('_', ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {index < customer.interactions.length - 1 && (
                  <div className="absolute left-5 top-10 w-px h-6 bg-gray-200"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Behavior Timeline Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-black mb-6">Behavior Trend Analysis</h3>
        
        <div className="space-y-4">
          {customer.behavior_timeline.map((entry, index) => {
            const prevEntry = index > 0 ? customer.behavior_timeline[index - 1] : entry;
            const behaviorTrend = getScoreTrend(entry.behavior_score, prevEntry.behavior_score);
            const commTrend = getScoreTrend(entry.communication_score, prevEntry.communication_score);
            
            return (
              <div key={entry.date} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-medium text-gray-600">
                    {new Date(entry.date).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Behavior:</span>
                    <span className={`font-bold ${getScoreColor(entry.behavior_score)}`}>
                      {entry.behavior_score.toFixed(1)}
                    </span>
                    <behaviorTrend.icon className={`h-4 w-4 ${behaviorTrend.color}`} />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Communication:</span>
                    <span className={`font-bold ${getScoreColor(entry.communication_score)}`}>
                      {entry.communication_score.toFixed(1)}
                    </span>
                    <commTrend.icon className={`h-4 w-4 ${commTrend.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};