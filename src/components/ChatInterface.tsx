import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MessageCircle, Shield, AlertTriangle, CheckCircle, FileText, Tag } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  analysis?: any;
}

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your KYC (Know Your Customer) AI assistant for Bajaj Allianz. I can help you analyze customer behavior, communication patterns, and personalize underwriting decisions. Ask me about specific customers, communication analysis, or behavioral risk profiling. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Customer behavior analysis data
  const customerData = {
    "CUSTOMER_001": {
      "customer_id": "CUSTOMER_001",
      "customer_name": "Sarah Johnson",
      "communication_score": 9,
      "behavior_score": 8,
      "policy_awareness_score": 9,
      "overall_risk_level": "Low",
      "premium_adjustment": "-15%",
      "recommendation": "This customer demonstrates excellent communication skills, high policy awareness, and cooperative behavior. Recommended for preferential rates.",
      "explanations": {
        "communication_score": "Polite, clear communication with professional tone in all interactions.",
        "behavior_score": "Consistently provides accurate information and responds promptly to requests.",
        "policy_awareness_score": "Demonstrates thorough understanding of policy terms and coverage options.",
        "premium_adjustment": "Customer qualifies for good driver/customer discount due to low risk profile."
      }
    },
    "CUSTOMER_002": {
      "customer_id": "CUSTOMER_002",
      "customer_name": "Mike Rodriguez", 
      "communication_score": 4,
      "behavior_score": 3,
      "policy_awareness_score": 2,
      "overall_risk_level": "High",
      "premium_adjustment": "+25%",
      "recommendation": "Customer shows concerning communication patterns and behavior. Recommend manual review and higher premium due to elevated risk factors.",
      "explanations": {
        "communication_score": "Frequently aggressive tone, uses evasive language when questioned about details.",
        "behavior_score": "Multiple instances of providing inconsistent information across interactions.",
        "policy_awareness_score": "Limited understanding of policy implications, asks few clarifying questions.",
        "premium_adjustment": "Risk-based pricing adjustment applied due to communication and behavior concerns."
      }
    },
    "DEFAULT": {
      "customer_id": "SAMPLE_CUSTOMER",
      "customer_name": "Sample Customer",
      "communication_score": 6,
      "behavior_score": 6, 
      "policy_awareness_score": 5,
      "overall_risk_level": "Medium",
      "premium_adjustment": "Standard Rate",
      "recommendation": "Customer shows typical communication and behavior patterns. Standard underwriting protocols apply.",
      "explanations": {
        "communication_score": "Average communication style with no significant red flags.",
        "behavior_score": "Standard customer behavior patterns observed.",
        "policy_awareness_score": "Basic understanding of policy terms and coverage needs.",
        "premium_adjustment": "No adjustment needed - standard rates apply."
      }
    }
  };
  const exampleQuestions = [
    "What's the risk profile for CUSTOMER_001?",
    "Analyze communication patterns for Sarah Johnson",
    "How do you assess customer behavior?",
    "What communication red flags should I watch for?",
    "How do you calculate customer risk scores?",
    "What makes a customer high risk for claims?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const extractCustomerFromText = (text: string) => {
    // Check for customer IDs
    const customerMatch = text.match(/CUSTOMER_\d+/i);
    if (customerMatch) return customerMatch[0].toUpperCase();

    // Check for specific customers mentioned
    if (text.toLowerCase().includes('sarah johnson') || text.toLowerCase().includes('customer_001')) {
      return 'CUSTOMER_001';
    }
    if (text.toLowerCase().includes('mike rodriguez') || text.toLowerCase().includes('customer_002')) {
      return 'CUSTOMER_002';
    }

    return null;
  };

  const generateResponse = (userMessage: string) => {
    const customerId = extractCustomerFromText(userMessage);
    
    if (customerId) {
      const analysis = customerData[customerId] || customerData.DEFAULT;
      
      return {
        content: `I've analyzed customer **${analysis.customer_name}** (${analysis.customer_id}) for you. Here's the comprehensive behavioral risk assessment:\n\n**Risk Level: ${analysis.overall_risk_level}**\n**Premium Adjustment: ${analysis.premium_adjustment}**\n\n**Behavioral Analysis Scores:**\n• Communication Score: ${analysis.communication_score}/10\n• Behavior Score: ${analysis.behavior_score}/10\n• Policy Awareness Score: ${analysis.policy_awareness_score}/10\n\n**Underwriting Recommendation:**\n${analysis.recommendation}\n\nWould you like me to explain any specific behavioral factor in detail?`,
        analysis
      };
    }

    // Handle different types of questions
    if (userMessage.toLowerCase().includes('customer') || userMessage.toLowerCase().includes('account')) {
      return {
        content: "I can help you assess behavioral risk for any customer. Please provide:\n\n• **Customer ID or name** (e.g., CUSTOMER_001, CUSTOMER_002)\n• **Specific behavioral concerns** you've noticed\n• **Communication patterns** you've observed\n\nFor example, you could ask:\n• \"What's the risk profile for CUSTOMER_001?\"\n• \"Analyze the communication patterns for Sarah Johnson\"\n• \"What behavioral red flags should I look for?\"",
        analysis: null
      };
    }

    if (userMessage.toLowerCase().includes('communication') || userMessage.toLowerCase().includes('behavior')) {
      return {
        content: "Customer behavior analysis includes:\n\n• **Communication Assessment** - Tone analysis, language patterns, and responsiveness\n• **Behavioral Profiling** - Consistency, cooperation, and information accuracy\n• **Policy Awareness** - Understanding of terms and coverage requirements\n• **Risk Indicators** - Red flags detection and positive behavioral signals\n\n**Sample Analysis Available:**\n• CUSTOMER_001 - Low risk profile with excellent communication\n• CUSTOMER_002 - High risk profile with concerning behavior patterns\n\nProvide a specific customer ID for detailed behavioral analysis.",
        analysis: null
      };
    }

    if (userMessage.toLowerCase().includes('risk') || userMessage.toLowerCase().includes('scoring')) {
      return {
        content: "Our behavioral risk scoring methodology evaluates:\n\n• **Communication Assessment** (1-10 scale)\n  - Voice tone and language patterns\n  - Politeness and clarity metrics\n  - Responsiveness and cooperation\n\n• **Behavioral Profiling** (1-10 scale)\n  - Information consistency and accuracy\n  - Interaction cooperation levels\n  - Response to policy questions\n\n• **Policy Awareness** (1-10 scale)\n  - Understanding of coverage terms\n  - Engagement with policy details\n  - Quality of questions asked\n\n**Premium Impact:** Low risk customers can receive up to 15% discount, while high risk may see 25% increase.\n\nTry asking about CUSTOMER_001 or CUSTOMER_002 to see this in action!",
        analysis: null
      };
    }

    if (userMessage.toLowerCase().includes('help') || userMessage.toLowerCase().includes('how')) {
      return {
        content: "I can help Bajaj Allianz underwriters with:\n\n👤 **Customer Profiling** - Comprehensive behavioral risk assessment\n💬 **Communication Analysis** - Tone, language, and interaction evaluation\n🧠 **Policy Awareness** - Understanding and engagement metrics\n🎯 **Personalization** - Premium adjustment recommendations based on behavior\n⚠️ **Risk Flagging** - Red flag identification and positive behavior signals\n📊 **Behavioral Scoring** - 1-10 scale assessment across multiple dimensions\n\n**Quick Start:** Try asking about CUSTOMER_001 (low risk) or CUSTOMER_002 (high risk) to see the system in action!",
        analysis: null
      };
    }

    // Default response
    return {
      content: "I'd be happy to help you with customer behavioral analysis. Please provide a customer ID or name, and I'll analyze:\n\n• **Communication patterns and tone** - Language quality, politeness, clarity\n• **Behavioral consistency and cooperation** - Information accuracy, responsiveness\n• **Policy awareness and engagement** - Understanding of terms and coverage\n• **Risk assessment and premium recommendations** - Personalized underwriting decisions\n\n**Available Sample Customers:**\n• `CUSTOMER_001` - Sarah Johnson (Low Risk Profile)\n• `CUSTOMER_002` - Mike Rodriguez (High Risk Profile)\n\nThis helps you make data-driven, personalized underwriting decisions for Bajaj Allianz.",
      analysis: null
    };
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const response = generateResponse(inputText);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        analysis: response.analysis
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleExampleClick = (question: string) => {
    setInputText(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getRiskColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-180px)] max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-black mb-2">KYG Assistant Chat</h2>
        <p className="text-gray-600">Ask about location risks for your customers and accounts</p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3xl ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                <div className="flex items-start space-x-3">
                  {message.role === 'assistant' && (
                    <div className="p-2 bg-gray-100 rounded-xl">
                      <Bot className="h-5 w-5 text-gray-600" />
                    </div>
                  )}
                  
                  <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block p-4 rounded-2xl max-w-full ${
                      message.role === 'user' 
                        ? 'bg-black text-white' 
                        : 'bg-gray-50 text-gray-900'
                    }`}>
                      <div className="whitespace-pre-line text-sm leading-relaxed">
                        {message.content}
                      </div>
                    </div>

                    {message.analysis && (
                      <div className="mt-3 p-4 bg-white border border-gray-200 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-black flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            Behavioral Risk Analysis Summary
                          </h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(message.analysis.overall_risk_level)}`}>
                            {message.analysis.overall_risk_level} Risk
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <MessageCircle className="h-4 w-4 mx-auto mb-1 text-gray-600" />
                            <div className="font-medium text-black">{message.analysis.communication_score}/10</div>
                            <div className="text-gray-600 text-xs">Communication</div>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <User className="h-4 w-4 mx-auto mb-1 text-gray-600" />
                            <div className="font-medium text-black">{message.analysis.behavior_score}/10</div>
                            <div className="text-gray-600 text-xs">Behavior</div>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <Shield className="h-4 w-4 mx-auto mb-1 text-gray-600" />
                            <div className="font-medium text-black">{message.analysis.policy_awareness_score}/10</div>
                            <div className="text-gray-600 text-xs">Policy Awareness</div>
                          </div>
                          <div className="text-center p-2 bg-gray-50 rounded-lg">
                            <CheckCircle className="h-4 w-4 mx-auto mb-1 text-gray-600" />
                            <div className="font-medium text-black">{message.analysis.premium_adjustment}</div>
                            <div className="text-gray-600 text-xs">Premium Adjust</div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="text-xs text-gray-500 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>

                  {message.role === 'user' && (
                    <div className="p-2 bg-black rounded-xl">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-gray-100 rounded-xl">
                  <Bot className="h-5 w-5 text-gray-600" />
                </div>
                <div className="bg-gray-50 text-gray-900 p-4 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-4">
            <textarea
              data-tour="customer-chat-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about customer behavior and risk... (e.g., 'What's the risk for CUSTOMER_001?')"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={2}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 disabled:bg-gray-400 transition-colors font-medium flex items-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
          
          {/* Example Questions Tags */}
          <div className="mt-4">
            <div className="flex items-center space-x-2 mb-3">
              <Tag className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600 font-medium">Example questions:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {exampleQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleExampleClick(question)}
                  className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors border border-gray-200 hover:border-gray-300"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};