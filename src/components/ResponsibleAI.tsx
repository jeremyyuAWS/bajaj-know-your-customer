import React from 'react';
import { Shield, Lock, Eye, BookOpen, CheckCircle, AlertTriangle, Users, FileText } from 'lucide-react';

export const ResponsibleAI: React.FC = () => {
  const principles = [
    {
      icon: Shield,
      title: 'AI Guardrails',
      description: 'Built-in safety mechanisms prevent biased decisions and ensure fair underwriting practices',
      features: ['Bias detection algorithms', 'Fair lending compliance', 'Automated redlining checks']
    },
    {
      icon: Eye,
      title: 'Transparency & Explainability',
      description: 'Every AI decision includes clear reasoning and can be audited by human underwriters',
      features: ['Decision reasoning provided', 'Factor importance scoring', 'Counterfactual explanations']
    },
    {
      icon: Lock,
      title: 'Data Privacy & Security',
      description: 'All personal information is protected with enterprise-grade security and privacy controls',
      features: ['Zero PII retention', 'End-to-end encryption', 'GDPR compliance ready']
    },
    {
      icon: Users,
      title: 'Human Oversight',
      description: 'Human-in-the-loop design ensures AI recommendations support, not replace, human judgment',
      features: ['Override capabilities', 'Review workflows', 'Escalation protocols']
    }
  ];

  const metrics = [
    { label: 'Bias Detection Accuracy', value: '99.2%', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Explainability Score', value: '94%', icon: Eye, color: 'text-blue-600' },
    { label: 'Privacy Compliance', value: '100%', icon: Lock, color: 'text-green-600' },
    { label: 'Human Override Rate', value: '12%', icon: Users, color: 'text-purple-600' }
  ];

  const complianceFrameworks = [
    'Fair Credit Reporting Act (FCRA)',
    'Equal Credit Opportunity Act (ECOA)', 
    'Home Mortgage Disclosure Act (HMDA)',
    'EU GDPR Data Protection',
    'NAIC Model AI Governance Framework',
    'ISO 27001 Security Standards'
  ];

  return (
    <div className="p-6 max-w-6xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-black mb-2">Responsible AI</h2>
        <p className="text-gray-600">Lyzr's comprehensive approach to ethical and compliant AI in underwriting</p>
      </div>

      {/* Key Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {principles.map(({ icon: Icon, title, description, features }) => (
          <div key={title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-gray-100 rounded-xl">
                <Icon className="h-6 w-6 stroke-black" />
              </div>
              <h3 className="text-lg font-semibold text-black">{title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{description}</p>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Metrics Dashboard */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
        <h3 className="text-lg font-semibold text-black mb-6 flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Responsible AI Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="text-center">
              <div className="flex items-center justify-center mb-3">
                <Icon className={`h-8 w-8 ${color}`} />
              </div>
              <div className={`text-2xl font-bold mb-1 ${color}`}>{value}</div>
              <div className="text-sm text-gray-600">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance & Standards */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
        <h3 className="text-lg font-semibold text-black mb-6 flex items-center">
          <BookOpen className="h-5 w-5 mr-2" />
          Compliance & Standards
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {complianceFrameworks.map((framework, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span className="text-gray-700 text-sm">{framework}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Mitigation */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-black mb-6 flex items-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          AI Risk Mitigation
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-black mb-3">Automated Safeguards</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-black rounded-full flex-shrink-0 mt-2"></span>
                <span>Real-time bias detection during risk assessment</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-black rounded-full flex-shrink-0 mt-2"></span>
                <span>Automated flagging of potential discriminatory patterns</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-black rounded-full flex-shrink-0 mt-2"></span>
                <span>Continuous model monitoring and performance tracking</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-black rounded-full flex-shrink-0 mt-2"></span>
                <span>Data quality validation and anomaly detection</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-black mb-3">Human Controls</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-black rounded-full flex-shrink-0 mt-2"></span>
                <span>Mandatory human review for high-risk assessments</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-black rounded-full flex-shrink-0 mt-2"></span>
                <span>Override capabilities for all AI recommendations</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-black rounded-full flex-shrink-0 mt-2"></span>
                <span>Regular audit reviews and model retraining</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-2 h-2 bg-black rounded-full flex-shrink-0 mt-2"></span>
                <span>Escalation workflows for edge cases</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <div className="flex items-start space-x-3">
            <BookOpen className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-black mb-1">Learn More</h4>
              <p className="text-sm text-gray-600 mb-3">
                Explore our comprehensive documentation on responsible AI practices and implementation guidelines.
              </p>
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                View Documentation →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};