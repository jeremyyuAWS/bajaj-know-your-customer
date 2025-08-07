import React from 'react';
import { Shield, Target, Zap, Users, TrendingUp, Award } from 'lucide-react';

export const About: React.FC = () => {
  const useCases = [
    {
      icon: Target,
      title: 'Behavior-based Underwriting',
      description: 'Make informed decisions based on comprehensive customer behavior analysis'
    },
    {
      icon: TrendingUp,
      title: 'Personalized Pricing',
      description: 'Adjust premiums based on individual customer communication and behavior patterns'
    },
    {
      icon: Shield,
      title: 'Fair Treatment Monitoring',
      description: 'Automated bias detection and fair treatment practice validation'
    }
  ];

  const benefits = [
    'Reduce manual customer assessment time from hours to minutes',
    'Ensure fair, behavior-based underwriting decisions',
    'Maintain compliance with anti-discrimination regulations',
    'Improve customer risk assessment accuracy by 35%',
    'Scale underwriting operations efficiently'
  ];

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="h-8 w-8 stroke-black" />
          <h2 className="text-2xl font-bold text-black">About Know Your Customer</h2>
        </div>
        <p className="text-gray-600 text-lg leading-relaxed">
          An intelligent underwriting platform that leverages agentic AI to analyze customer behavior 
          and communication patterns for personalized insurance underwriting decisions.
        </p>
      </div>

      {/* Mission Statement */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
        <h3 className="text-lg font-semibold text-black mb-4">Our Mission</h3>
        <p className="text-gray-700 leading-relaxed">
          To revolutionize insurance underwriting by providing instant, accurate, and fair customer behavior 
          analysis. We combine cutting-edge AI technology with responsible practices to help underwriters 
          personalize decisions based on communication patterns while maintaining the highest standards of 
          compliance and fairness.
        </p>
      </div>

      {/* Key Use Cases */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-black mb-6">Key Use Cases</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {useCases.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-3 bg-gray-100 rounded-xl">
                  <Icon className="h-6 w-6 stroke-black" />
                </div>
                <h4 className="font-semibold text-black">{title}</h4>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Business Benefits */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
        <h3 className="text-lg font-semibold text-black mb-6 flex items-center">
          <Award className="h-5 w-5 mr-2" />
          Business Benefits
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-black rounded-full flex-shrink-0 mt-2"></div>
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Technology Stack */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
        <h3 className="text-lg font-semibold text-black mb-6 flex items-center">
          <Zap className="h-5 w-5 mr-2" />
          Technology Stack
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-black mb-3">Frontend</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• React with TypeScript</li>
              <li>• Tailwind CSS for styling</li>
              <li>• Lucide React for icons</li>
              <li>• Responsive design patterns</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-black mb-3">AI & Backend</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Lyzr Agentic AI Platform</li>
              <li>• Supabase Edge Functions</li>
              <li>• Real-time data processing</li>
              <li>• Secure API integrations</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Contact & Support */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-black mb-6 flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Demo Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-black mb-3">How to Use</h4>
            <ol className="space-y-2 text-sm text-gray-600">
              <li>1. Enter a customer ID or name (e.g., CUSTOMER_001)</li>
              <li>2. Watch the AI agents analyze behavior and communication</li>
              <li>3. Review the personalized risk assessment and premium recommendation</li>
              <li>4. Use admin tools to review, modify, or audit results</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium text-black mb-3">Sample Customers</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• <code className="bg-gray-100 px-2 py-1 rounded">CUSTOMER_001</code> (Low Risk Customer)</li>
              <li>• <code className="bg-gray-100 px-2 py-1 rounded">CUSTOMER_002</code> (High Risk Customer)</li>
              <li>• Try any customer ID or name</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};